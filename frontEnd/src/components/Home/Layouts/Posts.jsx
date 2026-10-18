import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PostCard from './PostCard';

export default function Posts() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const token = sessionStorage.getItem('loginData');
        const response = await axios.get('http://localhost:3000/api/publication', { headers: { Authorization: `Bearer ${token}` } });
        setPublications(Array.isArray(response.data) ? response.data : []);
      } catch (requestError) {
        console.error('Impossible de charger les publications.', requestError);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPublications();
  }, []);

  if (loading) return <StateMessage>Chargement des publications…</StateMessage>;
  if (error) return <StateMessage>Les publications seront bientôt disponibles.</StateMessage>;
  if (!publications.length) return <StateMessage>Aucune publication pour le moment. Soyez le premier à partager quelque chose.</StateMessage>;

  return <FeedList>{publications.map((pub) => {
    const publication = pub.publication || pub;
    const author = pub.auteur?.info || {};
    return (
      <PostCard
        key={publication._id}
        profileImage={author.profilepath || author.profilePath}
        profileName={[author.prenom, author.nom].filter(Boolean).join(' ') || 'Membre JOB’S'}
        profileTitle={pub.auteur?.type || 'Membre de la communauté'}
        postDescription={publication.contenu || 'Publication JOB’S'}
        postImage={publication.imagePath}
      />
    );
  })}</FeedList>;
}

const FeedList = styled.div`display: grid; gap: 14px;`;
const StateMessage = styled.div`padding: 28px 18px; border: 1px dashed #b8dcc4; border-radius: 14px; background: #fbfefc; color: var(--jobs-muted); text-align: center; line-height: 1.5;`;
