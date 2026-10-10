import React, { useState } from 'react';
import styled from 'styled-components';


export default function PostCard({ profileImage, profileName, profileTitle, postDescription, postImage }) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <PostCardContainer>
      <PostHeader>
      {profileImage?<ProfileImage src={profileImage} alt="User Profile"/>:<ProfileImage src="../imgs/download.jpeg" alt="No Profile"/>}
        <div>
          <ProfileName>{profileName}</ProfileName>
          <ProfileTitle>{profileTitle}</ProfileTitle>
        </div>
      </PostHeader>
      <PostDescription>
        {showFullDescription ? postDescription : `${postDescription.slice(0, 100)}...`}
        <ShowMoreButton onClick={toggleDescription}>
          {showFullDescription ? 'Voir moins' : 'Voir plus'}
        </ShowMoreButton>
      </PostDescription>
      { postImage? <PostImage src={postImage} alt="Post Image" />:<br/>}
      <PostActions>
        <ActionButton><i className="fas fa-thumbs-up"></i> Like</ActionButton>
        <ActionButton><i className="fas fa-comment"></i> Comment</ActionButton>
        <ActionButton><i className="fas fa-share"></i> Share</ActionButton>
      </PostActions>
    </PostCardContainer>
  );
}

const PostCardContainer = styled.div`
  background: white;
  text-align: left;
  padding: 16px;
  margin-bottom: 20px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), rgb(0 0 0 / 20%);
  border: 1px solid #cbcbca;
  border-radius: 5px;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ProfileImage = styled.img`
  width: auto;
  height: 35px;
  border-radius: 50%;
  margin-right: 10px;
`;

const ProfileName = styled.div`
  font-weight: bold;
`;

const ProfileTitle = styled.div`
  color: gray;
  font-size: 14px;
`;

const PostDescription = styled.div`
  margin-bottom: 10px;
`;

const ShowMoreButton = styled.button`
  background: none;
  border: none;
  color: #0073b1;
  cursor: pointer;
  font-size: 14px;
  padding: 0;
  margin-left: 5px;

  &:hover {
    text-decoration: underline;
  }
`;

const PostImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const PostActions = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ActionButton = styled.button`
  background: transparent;
  border: none;
  color: #0073b1;
  cursor: pointer;
  font-size: 14px;

  i {
    margin-right: 5px;
  }

  &:hover {
    text-decoration: underline;
  }
`;
