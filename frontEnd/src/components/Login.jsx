// Login.jsx
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import axios from "axios";


const Login = ({ setIsAuthenticated }) => {
  const navRef = useRef();

  // Handle navigate
  const navigate = useNavigate();


  // Handle form input
  const [loginInputs, setLoginInputs] = useState({ email: "", password: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [notice, setNotice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInputs({ ...loginInputs, [name]: value });
  };

  // Login action
  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotice("");
    setIsSubmitting(true);
    try {
      const response = await axios.post("http://127.0.0.1:3000/api/signin", loginInputs);
      console.log("Login successful!", response.data);
      sessionStorage.setItem("loginData", response.data.token);
      setIsAuthenticated(true);
      
      const userID = response.data.id;
      const userData= await axios.get(
        `http://localhost:3000/api/dataUser/${userID}`,
        {
          headers: {
            Authorization: `Bearer ${response.data.token}`,
          },
        }
      );
      sessionStorage.setItem("userData", JSON.stringify(userData.data));
      const pendingSearch = sessionStorage.getItem("pendingJobSearch");
      if (pendingSearch) {
        sessionStorage.removeItem("pendingJobSearch");
        navigate(`/emploi?search=${encodeURIComponent(pendingSearch)}`);
      } else {
        navigate("/home");
      }
      
    } catch (error) {
      console.error("Login failed!", error);
      setNotice("Email ou mot de passe incorrect. Vérifiez vos informations.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const value = searchTerm.trim();
    if (!value) {
      setNotice("Saisissez un métier, une compétence ou une ville pour commencer.");
      return;
    }
    sessionStorage.setItem("pendingJobSearch", value);
    setNotice("Connectez-vous ou créez un compte pour consulter les offres.");
  };

  const handleUnavailableProvider = (provider) => {
    setNotice(`La connexion avec ${provider} sera disponible après la configuration de ce service.`);
  };

  const showNavrBar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <Header className="header">
      <div className="container">
        <Logo>
          <img src="logo-no-background-green.png" alt="JOB'S" />
        </Logo>
        <Nav ref={navRef} className="nav">
          <NavUl>
            <div class="closeMenu icon" onClick={showNavrBar}>
              <i className="fa fa-times"></i>
            </div>
            <li><Link to="/comment-ca-marche"><i className="fas fa-compass"></i> Comment ça marche</Link></li>
            <li><Link to="/entreprises"><i className="fas fa-building"></i> Entreprises</Link></li>
          </NavUl>
        </Nav>

        <div className="sign">
          <span className="sign-label">Nouveau sur JOB'S ?</span>
          <Link to="/créer-compte" className="create-link">Créer un compte</Link>
          <div class="openMenu icon" onClick={showNavrBar}>
            <i className="fa fa-bars"></i>
          </div>
        </div>
      </div>

      <Section>
        <SearchBar>
          <span className="eyebrow">La plateforme qui rapproche les talents et les entreprises</span>
          <h1>Trouvez une opportunité qui vous ressemble.</h1>
          <p>Recherchez un emploi, présentez votre parcours et avancez avec un profil qui vous ressemble.</p>
          <form className="box" onSubmit={handleSearch}>
            <input type="text" placeholder="Métier, compétence ou ville" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} aria-label="Métier, compétence ou ville" />
            <button type="submit">Rechercher</button>
          </form>
          <div className="trust-line"><i className="fas fa-check-circle"></i> Des offres claires · Un parcours simple · Une identité JOB'S</div>
          {notice && <div className="notice" role="status">{notice}</div>}
        </SearchBar>

        <SignInContainer>
          <div className="signin-header">
            <span className="form-eyebrow">Votre espace personnel</span>
            <h2>Bienvenue</h2>
            <p>Connectez-vous pour retrouver vos opportunités.</p>
          </div>

          <div className="signin-options">
            <button type="button" className="btn btn-google" onClick={() => handleUnavailableProvider("Google")}>
              <i className="fab fa-google"></i>
              Continuer avec Google
            </button>

            <button type="button" className="btn btn-facebook" onClick={() => handleUnavailableProvider("Facebook")}>
              <i className="fab fa-facebook"></i>
              Continuer avec Facebook
            </button>

            <div className="or-divider">
              <span>ou</span>
            </div>

            <form className="email-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Entrer l'adresse email"
                className="email-input"
                name='email'
                value={loginInputs.email}
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Entrer votre mot de passe"
                className="email-input"
                name="password"
                value={loginInputs.password}
                onChange={handleChange}
              />
              <input type="submit" className="btn btn-email" value={isSubmitting ? "Connexion..." : "Continuer avec email"} disabled={isSubmitting}/>
  
            </form>
          </div>

          <div className="terms-and-privacy">
            <p>
              En continuant, vous acceptez nos{" "}
              <a href="#conditions">Conditions d'utilisation</a> et
              <a href="#confidentialite"> Politique de confidentialité</a>.
            </p>
          </div>
          {notice && <div className="form-notice" role="status">{notice}</div>}
        </SignInContainer>
      </Section>

    </Header>
  );
};

// ------------------------------------------------Styled Components

const Header = styled.header`
  min-height: 100vh;
  background: var(--jobs-background, #f6f8f7);
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 78px;
    max-width: 1240px;
    margin: 0 auto;
    padding: 0 28px;
  }

  .sign {
    display: flex;
    align-items: center;
  }


  nav ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  li a {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 10px 14px;
    color: #667085;
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
  }
  li a:hover {
    color: #058c42;
  }
  i {
    padding: 5px;
    margin-left: 3px;
  }
  .sign-label { color: #667085; font-size: 13px; }
  .create-link { color: #056b35; font-weight: 800; font-size: 13px; margin-left: 10px; }

  .icon {
    padding: 5px;
    cursor: pointer;
    display: none;
    font-size: 1.8rem;
  }

  @media only screen and (max-width: 800px) {
    .icon {
      display: block;
    }

    .nav {
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      align-items: center;
      justify-content: center;
      transition: 1s;
      transform: translateY(-100vh);
      background: #ffffff;
    }

    nav ul {
      display: flex;
      flex-direction: column;
    }

    i { padding: 12px; }

    .responsive_nav {
      transform: none;
    }

    .closeMenu {
      position: absolute;
      top: 1.3rem;
      right: 0.8rem;
    }
  }
`;

const Logo = styled.div`
  img {
    width: 142px;
    display: block;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

const NavUl = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const SearchBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 320px;
  padding: 38px 42px 26px;
  border-radius: 24px;
  background: #eaf7ef;
  border: 1px solid #d7efdf;

  .eyebrow { color: #056b35; font-size: 12px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
  h1 { max-width: 580px; margin: 18px 0 14px; color: #24332b; font-size: clamp(2.2rem, 4vw, 4.2rem); line-height: 1.02; letter-spacing: -.05em; }
  p { max-width: 560px; color: #667085; font-size: 16px; line-height: 1.6; }

  .box {
    display: grid;
    grid-template-columns: 2fr 1fr;
    width: min(100%, 560px);
    margin-top: 28px;
  }
  input[type='text'] {
    padding: 15px 16px;
    width: 100%;
    outline: none;
    border: 1px solid #dbe7de;
    border-radius: 10px 0 0 10px;
    box-sizing: border-box;
  }

  button {
    padding: 15px 20px;
    background-color: #058c42;
    color: white;
    border-radius: 0 10px 10px 0;
    border: none;
    outline-style: none;
    cursor: pointer;
  }
  .trust-line { margin-top: 34px; color: #056b35; font-size: 13px; font-weight: 700; }
  .notice { margin-top: 14px; color: #056b35; font-size: 13px; font-weight: 700; }
`;

const Section = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(360px, .75fr);
  align-items: stretch;
  gap: 28px;
  max-width: 1240px;
  margin: 36px auto 0;
  padding: 0 28px 48px;
  @media only screen and (max-width: 800px) {
    grid-template-columns: 1fr;
    padding: 0 16px 32px;
  }
`;

const SignInContainer = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 36px;
  border: 1px solid #e4e9e5;
  border-radius: 20px;
  box-shadow: 0 14px 35px rgba(36, 51, 43, 0.08);






  overflow: hidden;
  position: relative;
  box-shadow: 0 14px 35px rgba(36, 51, 43, 0.08);
  border-radius: 20px;

  /* Styles pour l'animation rainbow */
  ${(props) =>
    props.rainbow &&
    css`
      animation: ${rotateAnimation} linear 8s infinite;

      div {
        display: block;
        width: 100%;
        height: 100%;
        position: relative;
        transform: translate(-50%, -50%);
        background: linear-gradient(
          to right,
          green,
          skyblue
        );

        &:after {
          display: block;
          content: "";
          width: 100%;
          height: 100%;
          position: absolute;
          left: 100%;
          background: linear-gradient(
            to right,
            green,
            skyblue
          );
        }
      }


    `}


  

  .signin-header {
    text-align: center;
    margin-bottom: 24px;

    .form-eyebrow { color: #058c42; font-size: 11px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
    h2 { margin: 10px 0 6px; color: #24332b; font-size: 30px; font-weight: 800; }
    p { margin: 0; color: #667085; font-size: 14px; }
  }

  .signin-options {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin: 5px;
    width: 100%;

    &.btn-google {
      background-color: #fff;
      border: 1px solid #e4e9e5;
      color: #344054;
    }

    &.btn-facebook {
      background-color: #fff;
      border: 1px solid #e4e9e5;
      color: #344054;
    }

    &:hover {
      background-color: #eee;
    }

    &.btn-google:hover {
      background-color: #eaf7ef;
      color: #056b35;
    }

    &.btn-facebook:hover {
      background-color: #eaf7ef;
      color: #056b35;
    }
  }

  .or-divider {
    margin: 10px 0;
    display: flex;
    align-items: center;

    span {
      font-size: 14px;
      color: #999;
      margin: 0 10px;
    }
  }



  .password-input { 
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
  }

  .email-form {
    display: flex;
    flex-direction: column;
    display: flex;


    .email-input {
      padding: 10px;
      border: 1px solid #dfe7e1;
      border-radius: 10px;
      margin-bottom: 10px;
    }

    .btn-email {
      background-color: #058c42;
      border: 1px solid #058c42;
      color: #fff;

      &:hover {
        background-color: #056b35;
        color: #fff;
        transition: all 0.3s ease-in;
      }
    }
  }

  .terms-and-privacy {
    text-align: center;
    margin-top: 10px;

    a {
      color: #007bff;
      text-decoration: none;
    }
  }
  .form-notice { width: 100%; margin-top: 18px; padding: 11px 12px; border-radius: 9px; background: #eaf7ef; color: #056b35; font-size: 13px; line-height: 1.4; text-align: center; }

  @media only screen and (max-width: 800px){
    .btn :not(.btn-google, .btn-facebook){
      padding:10px;
    }
  }
  
`;


const rotateAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;






export default Login;
