const fs = require('fs');
const path = require('path');
const Offre = require('../models/Offre');
const Entreprise = require('../models/Entreprise');

function loadLocalEnv() {
  const file = path.join(__dirname, '..', '.env');
  if (!fs.existsSync(file)) return;
  fs.readFileSync(file, 'utf8').split(/\r?\n/).forEach((line) => {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*["']?(.*?)["']?\s*$/);
    if (match && match[1] && !process.env[match[1]]) process.env[match[1]] = match[2];
  });
}

loadLocalEnv();

const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000;
const asText = (value) => Array.isArray(value) ? value.filter(Boolean).join(', ') : (value == null ? '' : String(value));
const cleanText = (value, fallback = '') => asText(value).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() || fallback;

function normalizeContract(job) {
  const raw = [job.employment_type, job.contract_category, job.engagement, job.title, job.description].filter(Boolean).join(' ').toLowerCase();
  if (/intern|internship|stage|stagiaire/.test(raw)) return 'Stage';
  if (/freelance|vendor|contractor|independent|project_based/.test(raw)) return 'Freelance';
  if (/temporary|fixed_term|cdd|fixed[- ]term/.test(raw)) return 'CDD';
  if (/part[- ]time|part_time|temps partiel/.test(raw)) return 'Temps partiel';
  if (/permanent|full[- ]time|full_time|temps plein|cdi/.test(raw)) return 'CDI';
  return 'Autre';
}

function normalizeJoaJob(job) {
  const title = cleanText(job.title, 'Opportunité professionnelle');
  const description = cleanText(job.description, 'Consultez l’offre pour découvrir les détails du poste.');
  const companyName = cleanText(job.company, 'Entreprise externe');
  const location = cleanText(job.location || [job.city, job.country].filter(Boolean).join(', '), 'International');
  const salary = [job.salary_min, job.salary_max].filter((value) => value != null).join(' - ');
  const modeTravail = job.remote === 'remote' ? 'À distance' : job.remote === 'hybrid' ? 'Hybride' : job.remote === 'on_site' ? 'Sur site' : 'Mode non précisé';
  return {
    _id: `external:joa:${job.id}`, external: true, source: 'Job Opportunities API', externalId: String(job.id || ''),
    applicationUrl: job.apply_url || '', titre: title, description, typeContrat: normalizeContract(job),
    salaire: salary ? `${salary}${job.salary_currency ? ` ${job.salary_currency}` : ''}` : 'À préciser',
    lieu: location, modeTravail, competences: [], experiences: [], autres_informations: cleanText(job.category || job.remote, ''),
    date_publication: job.posted_at || new Date().toISOString(),
    idEntreprises: { nom: companyName, adresse: location, activite: cleanText(job.category, 'Recrutement'), site_web: job.company_domain ? `https://${job.company_domain}` : '', logo: job.company_logo || '' }
  };
}

function contractParams(contract) {
  if (contract === 'CDI') return { contract_category: 'permanent' };
  if (contract === 'CDD') return { contract_category: 'fixed_term' };
  if (contract === 'Stage') return { employment_type: 'internship' };
  if (contract === 'Freelance') return { engagement: 'vendor' };
  if (contract === 'Temps partiel') return { employment_type: 'part-time' };
  return {};
}

async function fetchJobOpportunities({ search = '', location = '', contract = '', limit = 20 } = {}) {
  const apiKey = process.env.JOA_API_KEY;
  if (!apiKey) return [];
  const cacheKey = JSON.stringify({ search, location, contract, limit });
  const cached = cache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) return cached.value;
  const params = new URLSearchParams({ limit: String(Math.min(Math.max(limit, 1), 50)), include_description: 'true' });
  if (search) params.set('q', search);
  if (location) params.set('city', location);
  Object.entries(contractParams(contract)).forEach(([key, value]) => params.set(key, value));
  try {
    const response = await fetch(`https://api.jobopportunitiesapi.org/v1/jobs?${params}`, { headers: { Authorization: `Bearer ${apiKey}`, Accept: 'application/json' }, signal: AbortSignal.timeout(8000) });
    if (!response.ok) { console.warn(`Job Opportunities API indisponible (${response.status}).`); return []; }
    const payload = await response.json();
    const result = (payload.data || []).map(normalizeJoaJob);
    cache.set(cacheKey, { value: result, expiresAt: Date.now() + CACHE_TTL });
    return result;
  } catch (error) { console.warn(`Job Opportunities API indisponible: ${error.message}`); return []; }
}

function matchesLocalOffer(offer, search = '', location = '', contract = '') {
  const searchable = [offer.titre, offer.description, offer.lieu, offer.typeContrat, ...(offer.competences || []), ...(offer.experiences || []), offer.idEntreprises?.nom, offer.idEntreprises?.activite].filter(Boolean).join(' ').toLowerCase();
  return (!search || searchable.includes(search.toLowerCase())) && (!location || String(offer.lieu || '').toLowerCase().includes(location.toLowerCase())) && (!contract || contract === 'Tous' || String(offer.typeContrat || '').toLowerCase() === contract.toLowerCase());
}

async function getOffers({ search = '', location = '', contract = '', limit = 20 } = {}) {
  const localOffers = await Offre.find().populate('idEntreprises').populate('candidature').lean();
  const local = localOffers.filter((offer) => matchesLocalOffer(offer, search, location, contract));
  const external = await fetchJobOpportunities({ search, location, contract, limit });
  return [...local, ...external].sort((a, b) => new Date(b.date_publication || 0) - new Date(a.date_publication || 0));
}

async function getCompanies() {
  const localCompanies = await Entreprise.find().lean();
  const localOffers = await Offre.find().populate('idEntreprises').lean();
  const externalOffers = await fetchJobOpportunities({ limit: 50 });
  const grouped = new Map();
  localCompanies.forEach((company) => grouped.set(String(company._id), { ...company, offers: localOffers.filter((offer) => String(offer.idEntreprises?._id) === String(company._id)).length, source: 'JOB’S' }));
  externalOffers.forEach((offer) => {
    const company = offer.idEntreprises || {};
    const key = `external:${company.nom}:${company.adresse}`;
    const current = grouped.get(key) || { _id: key, nom: company.nom, adresse: company.adresse, activite: company.activite, site_web: company.site_web, logo: company.logo, offers: 0, source: offer.source };
    current.offers += 1;
    grouped.set(key, current);
  });
  return Array.from(grouped.values());
}

module.exports = { getOffers, getCompanies };
