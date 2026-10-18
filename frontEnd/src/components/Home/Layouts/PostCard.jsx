import React, { useState } from 'react';
import styled from 'styled-components';

export default function PostCard({ profileImage, profileName, profileTitle, postDescription, postImage }) {
  const [expanded, setExpanded] = useState(false);
  const description = postDescription || '';
  const isLong = description.length > 180;
  const visibleDescription = expanded || !isLong ? description : `${description.slice(0, 180)}…`;

  return (
    <Card>
      <PostHeader>
        <ProfileImage src={profileImage || '/imgs/download.jpeg'} alt="" />
        <div><ProfileName>{profileName}</ProfileName><ProfileTitle>{profileTitle}</ProfileTitle></div>
      </PostHeader>
      <PostDescription>{visibleDescription}{isLong && <ShowMoreButton type="button" onClick={() => setExpanded(!expanded)}>{expanded ? 'Voir moins' : 'Voir plus'}</ShowMoreButton>}</PostDescription>
      {postImage && <PostImage src={postImage} alt="Publication" />}
      <PostActions>
        <ActionButton type="button"><i className="fas fa-heart" /> J’aime</ActionButton>
        <ActionButton type="button"><i className="fas fa-comment" /> Commenter</ActionButton>
        <ActionButton type="button"><i className="fas fa-share" /> Partager</ActionButton>
      </PostActions>
    </Card>
  );
}

const Card = styled.article`padding: 18px; border: 1px solid var(--jobs-border); border-radius: 15px; background: #fff; text-align: left;`;
const PostHeader = styled.div`display: flex; align-items: center; gap: 11px; margin-bottom: 14px;`;
const ProfileImage = styled.img`width: 42px; height: 42px; object-fit: cover; border-radius: 50%;`;
const ProfileName = styled.div`color: var(--jobs-ink); font-weight: 800;`;
const ProfileTitle = styled.div`margin-top: 3px; color: var(--jobs-muted); font-size: .78rem;`;
const PostDescription = styled.p`margin: 0 0 13px; color: var(--jobs-text); line-height: 1.55;`;
const ShowMoreButton = styled.button`border: 0; padding: 0; margin-left: 5px; background: transparent; color: var(--jobs-green-dark); font-weight: 700; cursor: pointer;`;
const PostImage = styled.img`display: block; width: 100%; max-height: 340px; object-fit: cover; border-radius: 12px; margin: 12px 0;`;
const PostActions = styled.div`display: flex; gap: 8px; padding-top: 10px; border-top: 1px solid var(--jobs-border);`;
const ActionButton = styled.button`border: 0; border-radius: 8px; padding: 8px 10px; background: transparent; color: var(--jobs-muted); cursor: pointer; &:hover { background: var(--jobs-green-soft); color: var(--jobs-green-dark); } i { margin-right: 5px; }`;
