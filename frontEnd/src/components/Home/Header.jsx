import React from "react";
import { Link, useNavigate } from "react-router-dom"; 
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate(); 

  const handleLogout = () => {
    // Supprimer les cookies
    document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;' ;
    // Supprimer les jetons d'authentification du stockage local
    localStorage.removeItem('token');
    navigate("/"); 
  };

  return (
    <Container>
      <Content>
        <Logo>
          <a href="/home">
            <img src="logo-color-white-bg-green.png" alt="Logo" />
          </a>
        </Logo>
        <Search>
          <div>
            <input type="text" placeholder="Recherche" />
          </div>
          <SearchIcon>
            <i className="fas fa-search"></i>
          </SearchIcon>
        </Search>

        <Nav>
          <NavListWrap>
            <NavList className={`${location.pathname === "/home" ? "active" : ""}`}>
              <a href="/home">
                <i className="fas fa-home"></i>
                <span>Accueil</span>
              </a>
            </NavList>
            <NavList className={`${location.pathname === "/emploi" ? "active" : ""}`}>
              <a href="/emploi">
                <i className="fas fa-briefcase"></i>
                <span>Emplois</span>
              </a>
            </NavList>
            <NavList className={`${location.pathname === "/notification" ? "active" : ""}`}>
              <a>
                <i className="fas fa-bell"></i>
                <span>Notifications</span>
              </a>
            </NavList>

            <User>
              <Link to={"/profile-utilisateur"}>
                <a>
                  <i className="fas fa-user"></i>
                  <span>Moi</span>
                  <i className="fas fa-caret-down"></i>
                </a>
              </Link>

              <SignOut>
                <a onClick={handleLogout}>Déconnexion</a>
              </SignOut>
            </User>
          </NavListWrap>
        </Nav>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  // left: 0;
  padding: 0 24px;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 100;

  @media (max-width: 768px) {
    padding: 20px ;
  }

  i{
    font-size: 14px;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  min-height: 100%;
  max-width: 1128px;
  
`;



const Logo = styled.span`
  margin-right: 8px;
  font-size: 0px;
`;

const Search = styled.div`
  opacity: 1;
  flex-grow: 1;
  position: relative;
  & > div {
    max-width: 280px;
    input {
      border: none;
      box-shadow: none;
      background-color: #eef3f8;
      border-radius: 3px;
      color: rgba(0, 0, 0, 0.9);
      width: 218px;
      padding: 0 8px 0 40px;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      height: 40px;
      vertical-align: text-top;
    }
  }
`;

const SearchIcon = styled.div`
  width: 40px;
  position: absolute;
  z-index: 1;
  top:13px;
  left: 2px;
  border-radius: 0 2px 2px 0;
  margin: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Nav = styled.nav`
  margin-left: auto;
  display: block;
  height: 60px;
  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
    background: white;
    width: 100%;
  }
`;

const NavListWrap = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;

  .active {
    span:after {
      content: "";
      transform: scaleX(1.2);
      border-bottom: 2px solid ;

      bottom: 0;
      left: 0;
      position: absolute;
      transition: transform 0.2s ease-in-out;
      width: 100%;
      border-color: #058c42;
    }
  }
`; 

const NavList = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  a {
    color: rgba(0, 0, 0, 0.6);
    align-items: center;
    background: transparent;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: 400;
    justify-content: center;
    line-height: 1.5;
    min-height: 52px;
    min-width: 80px;
    position: relative;
    text-decoration: none;

    span {
      color: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
    }

    @media (max-width: 768px) {
      min-width: 70px;
    }
  }

  &:hover,
  &:active {
      a, span {
        color: #058c42;
      transition: transform 0.2s ease-in-out;


    }
  }
`;

const SignOut = styled.div`
  position: absolute;
  top: 45px;
  background: white;
  border-radius: 0 0 5px 5px;
  width: 100px;
  height: 40px;
  font-size: 16px;
  transition-duration: 167ms;
  text-align: center;
  display: none;
`;

const User = styled(NavList)`
  border-left: 1px solid rgba(0, 0, 0, 0.08);


  span {
    display: flex;
  }

  &:hover {
    ${SignOut} {
      display: flex;
    }
  }
`;

export default Header;