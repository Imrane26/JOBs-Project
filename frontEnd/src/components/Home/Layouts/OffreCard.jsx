import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CompanyCard from './Offre';
import OfferDetails from './DetailOffre';
import axios from 'axios';

export default function OffreCard() {
  const [offres,setOffres] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);

  useEffect(()=>{
    const fetchOffres = async () =>{
      try{
        const token = sessionStorage.getItem('loginData');
        const responce = await axios.get("http://localhost:3000/api/offres",{headers:{
          Authorization : `Bearer ${token}`
        }});
        setOffres(responce.data)
      }catch(e){
        console.error("Error fetching ofrres : ",e)
      }
    }
    fetchOffres();
    console.log(offres);
  },[]) 
  const handleMoreInfoClick = (offer) => {
    setSelectedOffer(offer);
  };

  const handleCloseClick = () => {
    setSelectedOffer(null);
  };


  return (
    <Container>
      <OffersList> {offres.map((offer) => (<CompanyCard key={offer.id} offer={offer} onMoreInfoClick={handleMoreInfoClick}/>))}
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
  padding: 16px;
  background-color: #f3f2ef;
`;

const OffersList = styled.div`
  flex: 1;
`;