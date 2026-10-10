import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const OffreForm = () => {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const token = sessionStorage.getItem('loginData')
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    typeContrat: 'CDI',
    salaire: '',
    lieu: '',
    competences: '',
    experiences: '',
    autres_informations: '',
    date_debut: '',
    date_fin: '',
    idEntreprise :`${userData.idEntreprise}`,
    date_publication:new Date().toLocaleDateString("en-CA")
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const validate = () => {
    let formErrors = {};
    if (!formData.titre) formErrors.titre = 'Le titre est requis';
    if (!formData.description) formErrors.description = 'La description est requise';
    if (!formData.salaire) formErrors.salaire = 'Le salaire est requis';
    if (!formData.lieu) formErrors.lieu = 'Le lieu est requis';
    if (!formData.competences) formErrors.competences = 'Les compétences sont requises';
    if (!formData.experiences) formErrors.experiences = 'Les expériences sont requises';
    if (!formData.date_debut) formErrors.date_debut = 'La date de début est requise';
    if (!formData.date_fin) formErrors.date_fin = 'La date de fin est requise';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post('http://127.0.0.1:3000/api/offres', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Offre créée avec succès!', response.data);
        navigate("/emploi");
      } catch (error) {
        console.error('Erreur lors de la création de l\'offre', error);
      }
      console.log(formData);
    }
  };

  return (
    <PageContainer>
      <Header>
        <Logo src="logo-color-white-bg-green.png" alt="JOB's Logo" />
      </Header>
      <Container>
        <Title>Publier une offre d'emploi</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="titre">Titre</Label>
            <Input type="text" id="titre" name="titre" value={formData.titre} onChange={handleChange} />
            {errors.titre && <Error>{errors.titre}</Error>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} />
            {errors.description && <Error>{errors.description}</Error>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="typeContrat">Type de contrat</Label>
            <Select id="typeContrat" name="typeContrat" value={formData.typeContrat} onChange={handleChange}>
              <option value="CDI">CDI</option>
              <option value="CDD">CDD</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="salaire">Salaire</Label>
            <Input type="text" id="salaire" name="salaire" value={formData.salaire} onChange={handleChange} />
            {errors.salaire && <Error>{errors.salaire}</Error>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="lieu">Lieu</Label>
            <Input type="text" id="lieu" name="lieu" value={formData.lieu} onChange={handleChange} />
            {errors.lieu && <Error>{errors.lieu}</Error>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="competences">Compétences</Label>
            <Textarea id="competences" name="competences" value={formData.competences} onChange={handleChange} />
            {errors.competences && <Error>{errors.competences}</Error>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="experiences">Expériences</Label>
            <Textarea id="experiences" name="experiences" value={formData.experiences} onChange={handleChange} />
            {errors.experiences && <Error>{errors.experiences}</Error>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="autres_informations">Autres informations</Label>
            <Textarea id="autres_informations" name="autres_informations" value={formData.autres_informations} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="date_debut">Date de début</Label>
            <Input type="date" id="date_debut" name="date_debut" value={formData.date_debut} onChange={handleChange} />
            {errors.date_debut && <Error>{errors.date_debut}</Error>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="date_fin">Date de fin</Label>
            <Input type="date" id="date_fin" name="date_fin" value={formData.date_fin} onChange={handleChange} />
            {errors.date_fin && <Error>{errors.date_fin}</Error>}
          </FormGroup>
          <FormGroup>
            <Button type="submit">Publiez</Button>
          </FormGroup>
        </form>
      </Container>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  overflow-x:hidden;
  background-color: #f4f4f4;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  width: 100%;
  background-color: #ffffff;
  padding: 10px 20px;
  margin-bottom:15px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.img`
  width: auto;
  height: 35px;
`;


const Container = styled.div`
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  margin: 20px 0;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  border: 1.5px solid #919191;
  border-radius: 10px;
  padding: 8px;
  box-sizing: border-box;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1.5px solid #919191;
  border-radius: 10px;
  box-sizing: border-box;
  resize: vertical;
  height: 100px;
`;

const Select = styled.select`
  width: 100%;
  border: 1.5px solid #919191;
  border-radius: 10px;
  padding: 8px;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top:15px;
  background-color: #10a74d;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0e8e41;
  }
`;

const Error = styled.span`
  color: red;
  font-size: 12px;
  font-weight:bold;
`;

export default OffreForm;
