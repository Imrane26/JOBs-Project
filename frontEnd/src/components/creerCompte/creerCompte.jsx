import React from 'react'
import { Link } from 'react-router-dom'
import StatutOptions from './steps/StatutOptions'
import '../../style/CreerCompte.css'

const CreerCompte = () => {
  return (
    <div className='signup_page'>
      <aside className='signup_intro'>
        <img src="logo-no-background-green.png" alt="JOB'S" />
        <span className='signup_eyebrow'>Commencez simplement</span>
        <h1>Votre prochain chapitre professionnel commence ici.</h1>
        <p>Créez un profil clair, présentez vos compétences et découvrez des opportunités adaptées à votre parcours.</p>
        <div className='signup_points'>
          <span><i className="fas fa-check-circle"></i> Un profil candidat ou recruteur</span>
          <span><i className="fas fa-check-circle"></i> Un parcours guidé étape par étape</span>
          <span><i className="fas fa-check-circle"></i> Une expérience simple et claire</span>
        </div>
      </aside>
      <main className='signup_card'>
        <Link to="/" className="signup_home_link">← Retour à l’accueil</Link>
        <div className='signup_heading'>
          <span>Créer un compte</span>
          <h2>Construisons votre espace JOB'S.</h2>
          <p>Choisissez le profil qui correspond à votre objectif.</p>
        </div>
        <StatutOptions/>
      </main>
    </div>
  )
}

export default CreerCompte
