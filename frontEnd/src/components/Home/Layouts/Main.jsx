import React, { useState } from 'react';
import styled from 'styled-components';
import PostCard from '../Layouts/PostCard';
import PostForm from '../Layouts/PostForm'; // Import the new PostForm component
import Posts from './Posts';

export default function Main() {
  const [showForm, setShowForm] = useState(false);
  const userProfileImage = ''; // User's profile image

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <Container>
      <ShareBox>
        <div>
        {userProfileImage?<img src={userProfileImage} alt="User Profile"/>:<img src="../imgs/download.jpeg" alt="No Profile"/>}
          <button className='pub' onClick={handleShowForm}>
            Commencer une publication
          </button>
        </div>
        <div>
          <button>
            <img src="imgs/image-icon.jpg" alt="" />
            <span>Photo</span>
          </button>
          <button>
            <img src="imgs/video-icon.jpg" alt="" />
            <span>Vidéo</span>
          </button>
          <button>
            <img src="imgs/event-icon.jpg" alt="" />
            <span>Événement</span>
          </button>
          <button>
            <img src="imgs/article-icon.jpg" alt="" />
            <span>Écrire un article</span>
          </button>
        </div>
      </ShareBox>

      <Article>
        <PostCard
          profileImage=""
          profileName="Jean Dupont"
          profileTitle="Software Engineer at ABC Corp"
          postDescription="Here is a brief description of the post content. This is where the user can share their thoughts, updates, or anything they want. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit, sequi deserunt! Quaerat qui mollitia eligendi"
          postImage="https://picsum.photos/600/400?random=1"
        />
        <PostCard
          profileImage=""
          profileName="Marie Curie"
          profileTitle="Data Scientist at XYZ Inc."
          postDescription="Excited to share the latest project I've been working on. Data science is truly amazing!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit, sequi deserunt! Quaerat qui mollitia eligendi"
          postImage="=https://picsum.photos/600/400?random=2"
        />
        <Posts/>
      </Article>

      {showForm && <PostForm onClose={handleCloseForm} profileImage={userProfileImage} />}
    </Container>
  );
}

const Container = styled.main`
  grid-area: main;
  padding: 20px;
`;

const Card = styled.div`
  text-align: center;
  box-shadow: 0 0 0 1px (0 0 0 / 15%), rgb(0 0 0 / 20%);
  border: 1px solid #cbcbca;
  border-radius: 5px;
  background-color: white;
`;

const ShareBox = styled(Card)`
  color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;

  .pub {
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 35px;
    padding: 16px;
    padding-left: 30px;
    margin: 4px 0;
    flex-grow: 1;
    text-align: left;
    background: none;
    font-size: 16px;
    color: rgb(78, 78, 78);
    cursor: pointer;
    width: 100%;
    text-align: center;

    &:hover {
      background-color: rgb(240, 240, 240);
    }
  }

  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      background: transparent;
      line-height: 1.5;
      min-height: 48px;
      border: none;
      display: flex;
      align-items: center;
    }

    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;

      i {
        position: relative;
        right: 87%;
        color: rgba(0, 0, 0, 0.6);

        @media (max-width: 768px) {
          right: 80%;
        }
      }

      @media (max-width: 768px) {
        .edit {
          right: 590px;
        }
      }

      img {
        cursor: pointer;
        width: 48px;
        border-radius: 50%;
        padding-right: 5px;
      }
    }

    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;

      button {
        img {
          margin: 0 4px;
        }
        span {
          color: #6ec691;
        }
      }
    }
  }
`;

const Article = styled.article`
  margin-top: 20px;
`;
