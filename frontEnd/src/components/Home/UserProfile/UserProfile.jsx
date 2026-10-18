import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../style/UserProfile/UserProfile.css';
import UserLeftSide from './UserLeftSide';
import UserRightSide from './UserRightSide';

export default function UserProfile() {
  let storedUser = {};
  try { storedUser = JSON.parse(sessionStorage.getItem('userData') || '{}') || {}; } catch { storedUser = {}; }
  const [offres, setOffres] = useState([]);
  const [publications, setPublications] = useState([]);
  const [userData, setUserData] = useState(storedUser);
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem('loginData');
  const storedUserJson = sessionStorage.getItem('userData') || '{}';
  const userId = storedUser.id_user || storedUser._id;

  useEffect(() => {
    if (!userId) { setLoading(false); return; }
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/allDataUser/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
        setOffres(response.data.offres || []);
        setPublications(response.data.publications || []);
        setUserData({ ...JSON.parse(storedUserJson), ...(response.data.user || {}) });
      } catch (error) {
        console.error('Erreur lors du chargement du profil.', error);
      } finally { setLoading(false); }
    };
    fetchProfile();
  }, [storedUserJson, token, userId]);

  const isRecruiter = Boolean(userData.id_entreprise || userData.idEntreprise || userData.type_user === 'recruteur');
  const fullName = [userData.prenom, userData.nom].filter(Boolean).join(' ') || 'Votre profil';

  return (
    <main className="profile-page">
      <section className="profile-hero">
        <div className="profile-avatar">{fullName.charAt(0).toUpperCase()}</div>
        <div className="profile-hero-copy"><span>{isRecruiter ? 'Espace recruteur' : 'Profil candidat'}</span><h1>{fullName}</h1><p>{userData.email || 'Présentez votre parcours et vos objectifs sur JOB’S.'}</p></div>
        <div className="profile-hero-action"><span>Votre espace JOB’S</span><strong>{isRecruiter ? 'Développez votre équipe.' : 'Faites avancer votre parcours.'}</strong></div>
      </section>
      <div className="profile-layout">
        <UserLeftSide userData={userData} isRecruiter={isRecruiter} />
        <UserRightSide offres={offres} publications={publications} isRecruiter={isRecruiter} loading={loading} />
      </div>
    </main>
  );
}
