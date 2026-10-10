import { Routes, Route, Navigate } from "react-router-dom";
import "./style/App.css";
import { useEffect, useState } from "react";
import Login from "./components/Login.jsx";
import Header from "./components/Home/Header.jsx";
import Home from "./components/Home/Home.jsx";
import Emplois from "./components/Home/Emplois.jsx";
import CreerCompte from "./components/creerCompte/creerCompte.jsx";
import LoadingScreen from "./components/Home/Layouts/LoadingScreen.jsx";
import OffreForm from "./components/Home/Layouts/OffreForm.jsx";
import UserProfile from "./components/Home/UserProfile/UserProfile.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const token = sessionStorage.getItem('loginData');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false); // Set loading to false after checking the token
  }, []);
  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
      />

      <Routes>
        <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/créer-compte" element={<CreerCompte />} />
        {isAuthenticated ? (
          <>
            <Route
              path="/home"
              element={
                <>
                  <Header />
                  <Home />
                </>
              }
            />
            <Route
              path="/emploi"
              element={
                <>
                  <Header />
                  <Emplois />
                </>
              }
            />

            <Route
              path="/profile-utilisateur"
              element={
                <>
                  <Header />
                  <UserProfile/>
                </>
              }
            />
            
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
        <Route
          path="/loading"
          element={
            <>
              <LoadingScreen />
            </>
          }
        />
        <Route
          path="/offreform"
          element={
            <>
              <OffreForm/>
            </>
          }
        />
      </Routes>
    </div>
  );
}
export default App;