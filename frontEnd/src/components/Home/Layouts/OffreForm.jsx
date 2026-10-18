import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function OffreForm() {
  let userData = {};
  try { userData = JSON.parse(sessionStorage.getItem('userData') || '{}') || {}; } catch { userData = {}; }
  const token = sessionStorage.getItem('loginData');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ titre: '', description: '', typeContrat: 'CDI', salaire: '', lieu: '', competences: '', experiences: '', autres_informations: '', date_debut: '', date_fin: '', idEntreprise: `${userData.idEntreprise || ''}`, date_publication: new Date().toLocaleDateString('en-CA') });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const update = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });
  const validate = () => {
    const next = {};
    ['titre', 'description', 'salaire', 'lieu', 'competences', 'experiences', 'date_debut', 'date_fin'].forEach((field) => { if (!formData[field].trim()) next[field] = 'Ce champ est requis.'; });
    setErrors(next); return !Object.keys(next).length;
  };
  const submit = async (event) => {
    event.preventDefault(); setSubmitError('');
    if (!validate()) return;
    try { await axios.post('http://127.0.0.1:3000/api/offres', formData, { headers: { Authorization: `Bearer ${token}` } }); navigate('/emploi'); }
    catch (error) { setSubmitError(error.response?.data?.message || 'La publication a échoué. Vérifiez les informations puis réessayez.'); }
  };
  return (
    <Page><TopBar><Link to="/home">← Retour à l’accueil</Link><Logo src="/logo-no-background-green.png" alt="JOB’S" /></TopBar><main><Intro><span>Nouvelle opportunité</span><h1>Publiez une offre qui donne envie de vous rejoindre.</h1><p>Présentez clairement votre besoin pour attirer les bons profils.</p></Intro><FormCard><FormHeader><div><span>Votre annonce</span><h2>Les informations essentielles</h2></div><small>Les champs marqués sont obligatoires</small></FormHeader>{submitError && <SubmitError>{submitError}</SubmitError>}<form onSubmit={submit}><Fields><Field wide><Label htmlFor="titre">Titre de l’offre *</Label><Input id="titre" name="titre" value={formData.titre} onChange={update} placeholder="Ex. Développeur frontend confirmé" />{errors.titre && <Error>{errors.titre}</Error>}</Field><Field><Label htmlFor="typeContrat">Type de contrat *</Label><Select id="typeContrat" name="typeContrat" value={formData.typeContrat} onChange={update}><option>CDI</option><option>CDD</option><option>Stage</option><option>Freelance</option></Select></Field><Field><Label htmlFor="lieu">Lieu *</Label><Input id="lieu" name="lieu" value={formData.lieu} onChange={update} placeholder="Ex. Marrakech ou hybride" />{errors.lieu && <Error>{errors.lieu}</Error>}</Field><Field><Label htmlFor="salaire">Rémunération *</Label><Input id="salaire" name="salaire" value={formData.salaire} onChange={update} placeholder="Ex. 12 000 MAD / mois" />{errors.salaire && <Error>{errors.salaire}</Error>}</Field><Field><Label htmlFor="date_debut">Début des candidatures *</Label><Input type="date" id="date_debut" name="date_debut" value={formData.date_debut} onChange={update} />{errors.date_debut && <Error>{errors.date_debut}</Error>}</Field><Field><Label htmlFor="date_fin">Fin des candidatures *</Label><Input type="date" id="date_fin" name="date_fin" value={formData.date_fin} onChange={update} />{errors.date_fin && <Error>{errors.date_fin}</Error>}</Field><Field wide><Label htmlFor="description">Description du poste *</Label><Textarea id="description" name="description" value={formData.description} onChange={update} placeholder="Décrivez la mission, l’équipe et l’environnement de travail." />{errors.description && <Error>{errors.description}</Error>}</Field><Field><Label htmlFor="competences">Compétences recherchées *</Label><Textarea id="competences" name="competences" value={formData.competences} onChange={update} placeholder="Ex. React, communication, autonomie" />{errors.competences && <Error>{errors.competences}</Error>}</Field><Field><Label htmlFor="experiences">Expérience souhaitée *</Label><Textarea id="experiences" name="experiences" value={formData.experiences} onChange={update} placeholder="Ex. 2 ans sur un poste similaire" />{errors.experiences && <Error>{errors.experiences}</Error>}</Field><Field wide><Label htmlFor="autres_informations">Informations complémentaires</Label><Textarea id="autres_informations" name="autres_informations" value={formData.autres_informations} onChange={update} placeholder="Avantages, processus de recrutement, horaires…" /></Field></Fields><Actions><Cancel to="/home">Annuler</Cancel><Publish type="submit">Publier l’offre <span>→</span></Publish></Actions></form></FormCard></main></Page>);
}

const Page = styled.div`min-height: 100vh; padding: 0 20px 50px; background: #e8ece9;`;
const TopBar = styled.header`max-width: 1080px; height: 72px; margin: 0 auto 34px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #c4ccc6; a { color: var(--jobs-green-dark); font-size: .84rem; font-weight: 700; }`;
const Logo = styled.img`width: 82px; max-height: 34px; object-fit: contain;`;
const Intro = styled.div`max-width: 1080px; margin: 0 auto 22px; padding: 24px 28px; border-left: 5px solid var(--jobs-green); border-radius: 0 16px 16px 0; background: #f5f7f5; span { color: var(--jobs-green-dark); font-size: .75rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; } h1 { max-width: 720px; margin: 9px 0 7px; color: var(--jobs-ink); font-size: clamp(1.9rem, 4vw, 3rem); letter-spacing: -.04em; } p { margin: 0; color: #587365; }`;
const FormCard = styled.section`max-width: 1080px; margin: 0 auto; padding: 28px; border: 1px solid #cfe4d5; border-top: 5px solid var(--jobs-green-dark); border-radius: 18px; background: #fff; box-shadow: 0 10px 26px rgba(36, 51, 43, .07);`;
const FormHeader = styled.div`display: flex; justify-content: space-between; align-items: end; gap: 18px; margin: -8px -8px 24px; padding: 18px; border-radius: 12px; background: #f0f8f3; span { color: var(--jobs-green-dark); font-size: .75rem; font-weight: 800; text-transform: uppercase; } h2 { margin: 6px 0 0; color: var(--jobs-ink); font-size: 1.35rem; } small { color: #587365; } @media (max-width: 600px) { display: block; small { display: block; margin-top: 8px; } }`;
const Fields = styled.div`display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 17px; @media (max-width: 650px) { grid-template-columns: 1fr; }`;
const Field = styled.div`grid-column: ${({ wide }) => wide ? '1 / -1' : 'auto'};`;
const Label = styled.label`display: block; margin-bottom: 7px; color: var(--jobs-green-dark); font-size: .78rem; font-weight: 800;`;
const Input = styled.input`width: 100%; box-sizing: border-box; height: 46px; padding: 0 13px; border: 1px solid var(--jobs-border); border-radius: 9px; outline: 0; background: #fcfefd; color: var(--jobs-text); &:focus { border-color: var(--jobs-green); box-shadow: 0 0 0 3px var(--jobs-green-soft); }`;
const Textarea = styled.textarea`width: 100%; min-height: 112px; box-sizing: border-box; padding: 13px; border: 1px solid var(--jobs-border); border-radius: 9px; outline: 0; resize: vertical; background: #fcfefd; color: var(--jobs-text); font: inherit; &:focus { border-color: var(--jobs-green); box-shadow: 0 0 0 3px var(--jobs-green-soft); }`;
const Select = styled.select`width: 100%; height: 46px; padding: 0 13px; border: 1px solid var(--jobs-border); border-radius: 9px; outline: 0; background: #fcfefd; color: var(--jobs-text); &:focus { border-color: var(--jobs-green); }`;
const Error = styled.span`display: block; margin-top: 5px; color: #c53b32; font-size: .72rem;`;
const SubmitError = styled.div`margin-bottom: 18px; padding: 12px 14px; border-radius: 9px; background: #fff1f0; color: #a9312a; font-size: .84rem;`;
const Actions = styled.div`display: flex; justify-content: flex-end; gap: 10px; margin: 26px -8px -8px; padding: 20px 8px 8px; border-top: 1px solid #d7e8dc;`;
const Cancel = styled(Link)`padding: 11px 15px; border: 1px solid var(--jobs-border); border-radius: 9px; color: var(--jobs-text); font-weight: 700;`;
const Publish = styled.button`border: 0; padding: 11px 16px; border-radius: 9px; background: var(--jobs-green); color: #fff; font-weight: 800; cursor: pointer; &:hover { background: var(--jobs-green-dark); }`;
