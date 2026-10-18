import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PostForm from '../Layouts/PostForm';
import Posts from './Posts';

export default function Main({ isRecruiter = false, userData = {} }) {
  const [showForm, setShowForm] = useState(false);
  const userProfileImage = userData.profilePath || userData.profilepath || '';
  return (
    <Container>
      <ShareBox>
        <div className="share-top">
          <img src={userProfileImage || '/imgs/download.jpeg'} alt="Profil" />
          {isRecruiter ? (
            <OfferLink className="pub" to="/offreform">Publier une offre</OfferLink>
          ) : (
            <button className="pub" type="button" onClick={() => setShowForm(true)}>Commencer une publication</button>
          )}
        </div>
        <div className="share-actions">
          <button type="button"><img src="/imgs/image-icon.jpg" alt="" /><span>Photo</span></button>
          <button type="button"><img src="/imgs/video-icon.jpg" alt="" /><span>Vidéo</span></button>
          <button type="button"><img src="/imgs/event-icon.jpg" alt="" /><span>Événement</span></button>
          <button type="button"><img src="/imgs/article-icon.jpg" alt="" /><span>Article</span></button>
        </div>
      </ShareBox>
      <Article><Posts /></Article>
      {showForm && <PostForm onClose={() => setShowForm(false)} profileImage={userProfileImage} />}
    </Container>
  );
}

const Container = styled.main`grid-area: main; padding: 0 4px;`;
const Card = styled.div`text-align: center; border: 1px solid var(--jobs-border); border-radius: 16px; background: #fff; box-shadow: 0 12px 28px rgba(36, 51, 43, .06);`;
const ShareBox = styled(Card)`
  color: var(--jobs-text); display: flex; flex-direction: column;
  .share-top { display: flex; align-items: center; gap: 12px; padding: 16px 18px 8px; }
  .share-top img { width: 42px; height: 42px; object-fit: cover; border-radius: 50%; }
  .pub { border: 1px solid var(--jobs-border); border-radius: 12px; padding: 13px 16px; flex: 1; text-align: left; background: var(--jobs-background); color: var(--jobs-text); font-size: .95rem; cursor: pointer; }
  .pub:hover { background: var(--jobs-green-soft); border-color: #b9dfc6; }
  .share-actions { display: flex; justify-content: space-around; padding: 8px 12px 12px; }
  .share-actions button { border: 0; background: transparent; color: var(--jobs-green-dark); display: flex; align-items: center; gap: 6px; padding: 8px; cursor: pointer; border-radius: 8px; }
  .share-actions button:hover { background: var(--jobs-green-soft); }
  .share-actions img { width: 18px; height: 18px; object-fit: contain; }
`;
const OfferLink = styled(Link)`
  display: block;
  text-decoration: none;
`;
const Article = styled.article`margin-top: 20px;`;
