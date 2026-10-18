import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CompanyCard from './Offre';
import OfferDetails from './DetailOffre';
import axios from 'axios';

export default function OffreCard({ searchTerm = "", locationTerm = "", contractTerm = "" }) {
  const [offres,setOffres] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(()=>{
    const fetchOffres = async () =>{
      setLoading(true);
      setError("");
      try{
        const token = sessionStorage.getItem('loginData');
        const params = new URLSearchParams();
        if (searchTerm) params.set('search', searchTerm);
        if (locationTerm) params.set('location', locationTerm);
        if (contractTerm) params.set('contract', contractTerm);
        const response = await axios.get(`http://localhost:3000/api/offres?${params.toString()}`, { headers: { Authorization: `Bearer ${token}` } });
        setOffres(Array.isArray(response.data) ? response.data : []);
      } catch (e) {
        console.error("Erreur lors du chargement des offres : ", e);
        setError("Les offres ne sont pas disponibles pour le moment.");
      } finally { setLoading(false); }
    }
    fetchOffres();
  },[searchTerm, locationTerm, contractTerm]) 
  const handleMoreInfoClick = (offer) => {
    setSelectedOffer(offer);
  };

  const handleCloseClick = () => {
    setSelectedOffer(null);
  };


  return (
    <Container>
      <OffersList>
        {loading && <EmptyState>Recherche des opportunités…</EmptyState>}
        {!loading && error && <EmptyState>{error}</EmptyState>}
        {!loading && !error && offres.length ? offres.map((offer) => (<CompanyCard key={offer._id} offer={offer} onMoreInfoClick={handleMoreInfoClick}/>)) : null}
        {!loading && !error && !offres.length && <EmptyState>Aucune offre ne correspond à votre recherche.</EmptyState>}
      </OffersList>
      {selectedOffer && (
        <OfferDetails offer={selectedOffer} onClose={handleCloseClick} />
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 20px;
  padding: 0;
  background-color: transparent;
`;

const OffersList = styled.div`
  flex: 1;
`;

const EmptyState = styled.p`
  padding: 36px;
  color: var(--jobs-muted);
  background: var(--jobs-surface);
  border: 1px solid var(--jobs-border);
  border-radius: 16px;
  text-align: center;
`;
