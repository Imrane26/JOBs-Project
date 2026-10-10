import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function LeftSide() {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  console.log(userData)
  return (
    <Container>
      <Card>
        <UserInfo>
          <CardBackground />
          <Link to={"/profile-utilisateur"}>
            <Photo />
            <span>{`${userData.nom} ${userData.prenom}`}</span>
          </Link>
          <a>
            <AddPhotoText></AddPhotoText>
          </a>
        </UserInfo>

        <Widget>
          <a>
            <div>
              <span>Connexions</span>
              <span>Élargissez votre réseau</span>
            </div>
            <i className="fas fa-user-plus"></i>
          </a>
        </Widget>

        <Item>
          <div>
            <span>Mes éléments</span>
            <a>
              <i className="fas fa-bookmark"></i>
            </a>
          </div>
        </Item>
      </Card>

      <CommunityCard>
        <a>
          <span>Groupes</span>
        </a>
        <a>
          <span>Événements</span>
          <i className="fas fa-calendar-plus"></i>
        </a>
        <a>
          <span>Suivre les hashtags</span>
        </a>
        <a>
          <span>Découvrir plus</span>
        </a>
      </CommunityCard>
    </Container>
  );
}

const Container = styled.div`
  grid-area: leftSide;
  padding-left: 12px;
`;

const Card = styled.aside`
  background-color: #fff;
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  border-radius: 5px;
  transition: box-shadow 83ms;
  position: relative;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const UserInfo = styled.div`
  border-bottom: 1px solid rgba(0 0 0 0.15);
  padding: 12px 12px 16px;
`;

const CardBackground = styled.div`
  background: url("/imgs/card-bg.svg");
  background-position: center;
  background-size: 462px;
  height: 54px;
  margin: -12px -12px;
`;

const Photo = styled.div`
  background: url(${"../imgs/download.jpeg"});
  background-position: center;
  background-size: 100%;
  background-clip: content-box;
  box-sizing: border-box;
  width: 72px;
  height: 72px;
  background-repeat: no-repeat;
  margin: -40px auto 12px;
  border: 2px solid white;
  box-shadow: none;
  border-radius: 5px;
  cursor: pointer;
`;

const AddPhotoText = styled.div`
  color: #058c42;
  margin-top: 4px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.3;
`;

const Widget = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.15);
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 12px 0;
  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 12px;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    cursor: pointer;
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    span {
      font-size: 12px;
      line-height: 1.3;
      &:first-child {
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }
`;

const Item = styled.div`
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 18px;
  }
  div:hover {
    background-color: rgba(0, 0, 0, 0.08);
    cursor: pointer;
  }
`;

const CommunityCard = styled(Card)`
  a {
    padding: 10px 18px;
    text-align: left;
    display: flex;
    justify-content: space-between;
  }
  a:hover {
    color: #058c42;
    cursor: pointer;
  }
  a:last-child {
    color: rgba(0, 0, 0, 0.6);
    border-top: 1px solid #d6ced6;
  }
  a:last-child:hover {
    background-color: rgba(0, 0, 0, 0.08);
    color: #058c42;
  }
`;
