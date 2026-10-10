// seed.js

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Publication = require("../models/Publication");
const Entreprise = require("../models/Entreprise");
const Recruteur = require("../models/Recruteur");
const Candidat = require("../models/Candidat");
const Offre = require("../models/Offre");
// Connexion à MongoDB
mongoose
  .connect("mongodb://localhost:27017/jobs01", {})
  .then(() => {
    console.log("Connexion à MongoDB établie avec succès");
    seedDatabase();
  })
  .catch((err) => {
    console.error("Erreur de connexion à MongoDB:", err);
  });

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
// Fonction de seeding
async function seedDatabase() {
  try {
    // Supprimer les anciennes données si nécessaire
    await User.deleteMany({});
    await Publication.deleteMany({});
    await Entreprise.deleteMany({});
    await Recruteur.deleteMany({});
    await Candidat.deleteMany({});
    await Offre.deleteMany({});

    // -------------------------------------------------------------------users---------------------------------------------------------------------------------------
    // Ajouter des utilisateurs
    const users = [
      {
        username: "Abdelaziz",
        email: "abdelaziz@example.com",
        password: await hashPassword("password"),
        type_user: "candidat",
      },
      {
        username: "Fatima",
        email: "fatima@example.com",
        password: await hashPassword("password"),
        type_user: "recruteur",
      },
      {
        username: "Youssef",
        email: "youssef@example.com",
        password: await hashPassword("password"),
        type_user: "candidat",
      },
      {
        username: "Khadija",
        email: "khadija@example.com",
        password: await hashPassword("password"),
        type_user: "recruteur",
      },
      {
        username: "Hassan",
        email: "hassan@example.com",
        password: await hashPassword("password"),
        type_user: "candidat",
      },
      {
        username: "Amina",
        email: "amina@example.com",
        password: await hashPassword("password"),
        type_user: "recruteur",
      },
      {
        username: "Mohammed",
        email: "mohammed@example.com",
        password: await hashPassword("password"),
        type_user: "candidat",
      },
      {
        username: "Nadia",
        email: "nadia@example.com",
        password: await hashPassword("password"),
        type_user: "recruteur",
      },
      {
        username: "Zineb",
        email: "zineb@example.com",
        password: await hashPassword("password"),
        type_user: "candidat",
      },
      {
        username: "Said",
        email: "said@example.com",
        password: await hashPassword("password"),
        type_user: "recruteur",
      },
      {
        username: "Loubna",
        email: "loubna@example.com",
        password: await hashPassword("password"),
        type_user: "candidat",
      },
      {
        username: "Mehdi",
        email: "mehdi@example.com",
        password: await hashPassword("password"),
        type_user: "recruteur",
      },
      {
        username: "Najat",
        email: "najat@example.com",
        password: await hashPassword("password"),
        type_user: "candidat",
      },
      {
        username: "Karim",
        email: "karim@example.com",
        password: await hashPassword("password"),
        type_user: "recruteur",
      },
      {
        username: "Sanaa",
        email: "sanaa@example.com",
        password: await hashPassword("password"),
        type_user: "candidat",
      },
      {
        username: "Abdellah",
        email: "abdellah@example.com",
        password: await hashPassword("password"),
        type_user: "recruteur",
      },
      {
        username: "Aicha",
        email: "aicha@example.com",
        password: await hashPassword("password"),
        type_user: "candidat",
      },
      {
        username: "Hicham",
        email: "hicham@example.com",
        password: await hashPassword("password"),
        type_user: "recruteur",
      },
      {
        username: "Samira",
        email: "samira@example.com",
        password: await hashPassword("password"),
        type_user: "candidat",
      },
      {
        username: "Fouad",
        email: "fouad@example.com",
        password: await hashPassword("password"),
        type_user: "recruteur",
      },
    ];

    const insertedUsers = await User.insertMany(users);
    console.log("Users ajoutés avec succès");

    // -----------------------------------------------------------publications-----------------------------------------------------------------------------------------------

    // Ajouter des publications
    const publications = [
      {
        titre: "Les nouvelles tendances en matière de développement web",
        contenu:
          "La technologie évolue rapidement, et avec elle, les tendances en matière de développement web. Découvrez les dernières avancées et comment elles peuvent impacter votre projet.",
        auteur: insertedUsers[0]._id,
        imagePath: "https://picsum.photos/600/400",
      },
      {
        titre:
          "L'avenir de l'intelligence artificielle dans l'industrie automobile",
        contenu:
          "L'intelligence artificielle révolutionne l'industrie automobile. De la conduite autonome à la maintenance prédictive, découvrez comment les innovations IA transforment ce secteur.",
        auteur: insertedUsers[1]._id,
        imagePath: "https://picsum.photos/600/400",
      },
      {
        titre: "Les bienfaits du yoga pour la santé mentale",
        contenu:
          "Pratiquer le yoga régulièrement peut avoir des effets bénéfiques sur la santé mentale. Découvrez comment cette pratique millénaire peut vous aider à réduire le stress et l'anxiété.",
        auteur: insertedUsers[2]._id,
        imagePath: "https://picsum.photos/600/400",
      },
      {
        titre: "Les meilleures destinations pour un voyage écologique",
        contenu:
          "Envie de voyager tout en respectant l'environnement ? Découvrez les destinations éco-responsables qui vous permettront de vivre une expérience de voyage unique tout en préservant la planète.",
        auteur: insertedUsers[3]._id,
        imagePath: "https://picsum.photos/600/400",
      },
      {
        titre: "Comment améliorer sa productivité au travail",
        contenu:
          "Être productif au travail est essentiel pour accomplir ses tâches efficacement. Découvrez des astuces et des outils pour booster votre productivité et atteindre vos objectifs professionnels.",
        auteur: insertedUsers[4]._id,
        imagePath: "https://picsum.photos/600/400",
      },
      {
        titre: "Les secrets d'une alimentation saine et équilibrée",
        contenu:
          "Une alimentation saine est la clé d'une vie en bonne santé. Découvrez les principes de base d'une alimentation équilibrée et des conseils pour adopter de bonnes habitudes alimentaires.",
        auteur: insertedUsers[5]._id,
        imagePath: "https://picsum.photos/600/400",
      },
      {
        titre: "Les dernières tendances en matière de mode pour cet été",
        contenu:
          "Envie de rafraîchir votre garde-robe pour l'été ? Découvrez les dernières tendances en matière de mode, des couleurs vives aux motifs floraux, et adoptez un look tendance cet été.",
        auteur: insertedUsers[6]._id,
        imagePath: "https://picsum.photos/600/400",
      },
      {
        titre: "Les bienfaits de la méditation pour la santé",
        contenu:
          "La méditation est une pratique ancienne qui peut avoir des effets positifs sur la santé mentale et physique. Découvrez comment la méditation peut vous aider à réduire le stress et à améliorer votre bien-être.",
        auteur: insertedUsers[7]._id,
        imagePath: "https://picsum.photos/600/400",
      },
      {
        titre:
          "Les dernières innovations technologiques dans le domaine de la santé",
        contenu:
          "La technologie transforme le domaine de la santé à une vitesse impressionnante. Découvrez les dernières innovations, des applications de suivi de la santé aux dispositifs médicaux intelligents, qui révolutionnent les soins de santé.",
        auteur: insertedUsers[8]._id,
        imagePath: "https://picsum.photos/600/400",
      },
      {
        titre:
          "Les meilleures pratiques pour améliorer votre référencement SEO",
        contenu:
          "Un bon référencement SEO est essentiel pour améliorer la visibilité de votre site web sur les moteurs de recherche. Découvrez les meilleures pratiques et les outils pour optimiser votre stratégie SEO et augmenter votre trafic organique.",
        auteur: insertedUsers[9]._id,
        imagePath: "https://picsum.photos/600/400",
      },
    ];

    await Publication.insertMany(publications);
    console.log("Publications ajoutées avec succès");

    // -------------------------------------------------------------entreprises---------------------------------------------------------------------------------------------

    const entreprises = [
      {
        nom: "Entreprise CasaTech",
        siret: "100100100",
        adresse: "123 Avenue des FAR, Casablanca, Maroc",
        activite: "Informatique",
        site_web: "http://www.casatech.ma",
        logo: "https://picsum.photos/200/200?random=1",
      },
      {
        nom: "Entreprise MarrakechBuild",
        siret: "100100101",
        adresse: "456 Rue de la Liberté, Marrakech, Maroc",
        activite: "Construction",
        site_web: "http://www.marrakechbuild.ma",
        logo: "https://picsum.photos/200/200?random=2",
      },
      {
        nom: "Entreprise RabatConsulting",
        siret: "100100102",
        adresse: "789 Boulevard Mohammed V, Rabat, Maroc",
        activite: "Consulting",
        site_web: "http://www.rabatconsulting.ma",
        logo: "https://picsum.photos/200/200?random=3",
      },
      {
        nom: "Entreprise FesAgri",
        siret: "100100103",
        adresse: "123 Rue de Fès, Fès, Maroc",
        activite: "Agriculture",
        site_web: "http://www.fesagri.ma",
        logo: "https://picsum.photos/200/200?random=4",
      },
      {
        nom: "Entreprise TangierLogistics",
        siret: "100100104",
        adresse: "456 Avenue Mohammed VI, Tanger, Maroc",
        activite: "Logistique",
        site_web: "http://www.tangierlogistics.ma",
        logo: "https://picsum.photos/200/200?random=5",
      },
      {
        nom: "Entreprise OujdaPharma",
        siret: "100100105",
        adresse: "789 Boulevard Hassan II, Oujda, Maroc",
        activite: "Pharmaceutique",
        site_web: "http://www.oujdapharma.ma",
        logo: "https://picsum.photos/200/200?random=6",
      },
      {
        nom: "Entreprise AgadirEnergy",
        siret: "100100106",
        adresse: "123 Rue de Souss, Agadir, Maroc",
        activite: "Énergie",
        site_web: "http://www.agadirenergy.ma",
        logo: "https://picsum.photos/200/200?random=7",
      },
      {
        nom: "Entreprise MeknesFood",
        siret: "100100107",
        adresse: "456 Avenue des Nations Unies, Meknès, Maroc",
        activite: "Agroalimentaire",
        site_web: "http://www.meknesfood.ma",
        logo: "https://picsum.photos/200/200?random=8",
      },
      {
        nom: "Entreprise KenitraTextiles",
        siret: "100100108",
        adresse: "789 Boulevard de la Résistance, Kénitra, Maroc",
        activite: "Textile",
        site_web: "http://www.kenitratextiles.ma",
        logo: "https://picsum.photos/200/200?random=9",
      },
      {
        nom: "Entreprise ElJadidaTourism",
        siret: "100100109",
        adresse: "123 Avenue de la Plage, El Jadida, Maroc",
        activite: "Tourisme",
        site_web: "http://www.eljadidatourism.ma",
        logo: "https://picsum.photos/200/200?random=10",
      },
    ];

    const insertedEntreprise = await Entreprise.insertMany(entreprises);
    console.log("Entreprises ajoutées avec succès");

    // -------------------------------------------------------------recruteurs---------------------------------------------------------------------------------------------

    const recruteurs = [
      {
        idEntreprise: insertedEntreprise[0]._id,
        id_user: insertedUsers[1]._id,
        prenom: "Ahmed",
        nom: "Benomar",
        adresse: "123 Avenue des FAR, Casablanca, Maroc",
        date_naissance: new Date("1980-03-12"),
        telephone: "0661234567",
        profilePath: "https://picsum.photos/200/200?random=1",
      },
      {
        idEntreprise: insertedEntreprise[1]._id,
        id_user: insertedUsers[3]._id,
        prenom: "Samira",
        nom: "El Idrissi",
        adresse: "456 Rue de la Liberté, Marrakech, Maroc",
        date_naissance: new Date("1985-07-24"),
        telephone: "0672345678",
        profilePath: "https://picsum.photos/200/200?random=2",
      },
      {
        idEntreprise: insertedEntreprise[2]._id,
        id_user: insertedUsers[5]._id,
        prenom: "Omar",
        nom: "Tazi",
        adresse: "789 Boulevard Mohammed V, Rabat, Maroc",
        date_naissance: new Date("1990-01-30"),
        telephone: "0683456789",
        profilePath: "https://picsum.photos/200/200?random=3",
      },
      {
        idEntreprise: insertedEntreprise[3]._id,
        id_user: insertedUsers[7]._id,
        prenom: "Fatima",
        nom: "Boukili",
        adresse: "123 Rue de Fès, Fès, Maroc",
        date_naissance: new Date("1975-05-14"),
        telephone: "0694567890",
        profilePath: "https://picsum.photos/200/200?random=4",
      },
      {
        idEntreprise: insertedEntreprise[4]._id,
        id_user: insertedUsers[9]._id,
        prenom: "Youssef",
        nom: "Amrani",
        adresse: "456 Avenue Mohammed VI, Tanger, Maroc",
        date_naissance: new Date("1988-09-20"),
        telephone: "0675678901",
        profilePath: "https://picsum.photos/200/200?random=5",
      },
      {
        idEntreprise: insertedEntreprise[5]._id,
        id_user: insertedUsers[11]._id,
        prenom: "Khadija",
        nom: "El Malki",
        adresse: "789 Boulevard Hassan II, Oujda, Maroc",
        date_naissance: new Date("1992-11-05"),
        telephone: "0666789012",
        profilePath: "https://picsum.photos/200/200?random=6",
      },
      {
        idEntreprise: insertedEntreprise[6]._id,
        id_user: insertedUsers[13]._id,
        prenom: "Mohammed",
        nom: "Chraibi",
        adresse: "123 Rue de Souss, Agadir, Maroc",
        date_naissance: new Date("1983-12-17"),
        telephone: "0687890123",
        profilePath: "https://picsum.photos/200/200?random=7",
      },
      {
        idEntreprise: insertedEntreprise[7]._id,
        id_user: insertedUsers[15]._id,
        prenom: "Laila",
        nom: "Jabiri",
        adresse: "456 Avenue des Nations Unies, Meknès, Maroc",
        date_naissance: new Date("1981-06-28"),
        telephone: "0698901234",
        profilePath: "https://picsum.photos/200/200?random=8",
      },
      {
        idEntreprise: insertedEntreprise[8]._id,
        id_user: insertedUsers[17]._id,
        prenom: "Rachid",
        nom: "Haddadi",
        adresse: "789 Boulevard de la Résistance, Kénitra, Maroc",
        date_naissance: new Date("1979-08-10"),
        telephone: "0669012345",
        profilePath: "https://picsum.photos/200/200?random=9",
      },
      {
        idEntreprise: insertedEntreprise[9]._id,
        id_user: insertedUsers[19]._id,
        prenom: "Salma",
        nom: "Naciri",
        adresse: "123 Avenue de la Plage, El Jadida, Maroc",
        date_naissance: new Date("1994-04-22"),
        telephone: "0670123456",
        profilePath: "https://picsum.photos/200/200?random=10",
      },
    ];
    insertedRecruteur = await Recruteur.insertMany(recruteurs);
    console.log("les recruteur ajouté avec success");


















    // -------------------------------------------------------------candidats---------------------------------------------------------------------------------------------

    const candidats = [
      {
        id_user: insertedUsers[0]._id, // Assurez-vous que ce sont des utilisateurs de type 'candidat'
        prenom: "Ahmed",
        nom: "El Khatib",
        adresse: "123 Rue de la Liberté, Casablanca, Maroc",
        date_naissance: new Date("1990-03-12"),
        telephone: "0661234567",
        profilePath: "https://picsum.photos/200/200?random=1",
        education: [
          {
            diplome: "Master en Informatique",
            institut: "Université Hassan II",
            date_debut: new Date("2010-09-01"),
            date_fin: new Date("2012-06-30"),
            description: "Spécialisation en développement web",
          },
        ],
        experiences: [
          {
            poste: "Développeur Full Stack",
            entreprise: "TechCorp",
            date_debut: new Date("2013-09-01"),
            date_fin: new Date("2018-12-31"),
            description: "Développement de solutions web et mobiles",
          },
        ],
        competences: [{ competence: ["JavaScript", "Node.js", "React"] }],
      },
      {
        id_user: insertedUsers[2]._id,
        prenom: "Fatima",
        nom: "Benjelloun",
        adresse: "456 Avenue Mohammed V, Rabat, Maroc",
        date_naissance: new Date("1985-05-15"),
        telephone: "0672345678",
        profilePath: "https://picsum.photos/200/200?random=2",
        education: [
          {
            diplome: "Licence en Mathématiques",
            institut: "Université Mohammed V",
            date_debut: new Date("2005-09-01"),
            date_fin: new Date("2008-06-30"),
            description: "Mathématiques appliquées et statistiques",
          },
        ],
        experiences: [
          {
            poste: "Analyste de données",
            entreprise: "DataCorp",
            date_debut: new Date("2008-09-01"),
            date_fin: new Date("2012-12-31"),
            description: "Analyse de données et création de rapports",
          },
        ],
        competences: [{ competence: ["Python", "R", "SQL"] }],
      },
      {
        id_user: insertedUsers[4]._id,
        prenom: "Youssef",
        nom: "El Idrissi",
        adresse: "789 Rue de Fès, Fès, Maroc",
        date_naissance: new Date("1992-01-30"),
        telephone: "0683456789",
        profilePath: "https://picsum.photos/200/200?random=3",
        education: [
          {
            diplome: "Master en Génie Logiciel",
            institut: "Université Sidi Mohamed Ben Abdellah",
            date_debut: new Date("2011-09-01"),
            date_fin: new Date("2013-06-30"),
            description: "Spécialisation en génie logiciel",
          },
        ],
        experiences: [
          {
            poste: "Ingénieur Logiciel",
            entreprise: "SoftTech",
            date_debut: new Date("2013-09-01"),
            date_fin: new Date("2017-12-31"),
            description: "Développement de logiciels",
          },
        ],
        competences: [{ competence: ["Java", "Spring", "Hibernate"] }],
      },
      {
        id_user: insertedUsers[6]._id,
        prenom: "Khadija",
        nom: "Bennani",
        adresse: "123 Boulevard Al Massira, Marrakech, Maroc",
        date_naissance: new Date("1988-07-24"),
        telephone: "0694567890",
        profilePath: "https://picsum.photos/200/200?random=4",
        education: [
          {
            diplome: "Master en Management",
            institut: "Université Cadi Ayyad",
            date_debut: new Date("2009-09-01"),
            date_fin: new Date("2011-06-30"),
            description: "Spécialisation en management des organisations",
          },
        ],
        experiences: [
          {
            poste: "Chef de Projet",
            entreprise: "ManageCorp",
            date_debut: new Date("2011-09-01"),
            date_fin: new Date("2015-12-31"),
            description: "Gestion de projets",
          },
        ],
        competences: [{ competence: ["Gestion de projet", "Agile", "Scrum"] }],
      },
      {
        id_user: insertedUsers[8]._id,
        prenom: "Rachid",
        nom: "Bouazza",
        adresse: "456 Avenue des FAR, Tanger, Maroc",
        date_naissance: new Date("1990-12-17"),
        telephone: "0675678901",
        profilePath: "https://picsum.photos/200/200?random=5",
        education: [
          {
            diplome: "Master en Réseaux",
            institut: "Université Abdelmalek Essaâdi",
            date_debut: new Date("2010-09-01"),
            date_fin: new Date("2012-06-30"),
            description: "Spécialisation en réseaux informatiques",
          },
        ],
        experiences: [
          {
            poste: "Administrateur Réseau",
            entreprise: "NetCorp",
            date_debut: new Date("2012-09-01"),
            date_fin: new Date("2016-12-31"),
            description: "Administration des réseaux",
          },
        ],
        competences: [{ competence: ["Cisco", "Firewall", "VPN"] }],
      },
      {
        id_user: insertedUsers[10]._id,
        prenom: "Laila",
        nom: "Alaoui",
        adresse: "789 Boulevard Hassan II, Agadir, Maroc",
        date_naissance: new Date("1991-06-28"),
        telephone: "0666789012",
        profilePath: "https://picsum.photos/200/200?random=6",
        education: [
          {
            diplome: "Licence en Marketing",
            institut: "Université Ibn Zohr",
            date_debut: new Date("2011-09-01"),
            date_fin: new Date("2014-06-30"),
            description: "Spécialisation en marketing digital",
          },
        ],
        experiences: [
          {
            poste: "Responsable Marketing",
            entreprise: "MarketCorp",
            date_debut: new Date("2014-09-01"),
            date_fin: new Date("2018-12-31"),
            description: "Stratégies marketing et campagnes publicitaires",
          },
        ],
        competences: [{ competence: ["SEO", "SEM", "Content Marketing"] }],
      },
      {
        id_user: insertedUsers[12]._id,
        prenom: "Mohammed",
        nom: "Oufkir",
        adresse: "123 Rue de Souss, Ouarzazate, Maroc",
        date_naissance: new Date("1987-05-14"),
        telephone: "0687890123",
        profilePath: "https://picsum.photos/200/200?random=7",
        education: [
          {
            diplome: "Master en Ingénierie Électrique",
            institut: "Université Ibn Zohr",
            date_debut: new Date("2007-09-01"),
            date_fin: new Date("2010-06-30"),
            description: "Spécialisation en systèmes électriques",
          },
        ],
        experiences: [
          {
            poste: "Ingénieur Électrique",
            entreprise: "ElecCorp",
            date_debut: new Date("2010-09-01"),
            date_fin: new Date("2015-12-31"),
            description: "Conception et maintenance de systèmes électriques",
          },
        ],
        competences: [
          { competence: ["Électricité", "Automatisme", "Électronique"] },
        ],
      },
      {
        id_user: insertedUsers[14]._id,
        prenom: "Salma",
        nom: "Rifi",
        adresse: "456 Avenue de la Plage, El Jadida, Maroc",
        date_naissance: new Date("1993-09-20"),
        telephone: "0698901234",
        profilePath: "https://picsum.photos/200/200?random=8",
        education: [
          {
            diplome: "Master en Finance",
            institut: "Université Chouaib Doukkali",
            date_debut: new Date("2011-09-01"),
            date_fin: new Date("2013-06-30"),
            description: "Spécialisation en gestion financière",
          },
        ],
        experiences: [
          {
            poste: "Analyste Financier",
            entreprise: "FinanceCorp",
            date_debut: new Date("2013-09-01"),
            date_fin: new Date("2018-12-31"),
            description: "Analyse financière et gestion de portefeuilles",
          },
        ],
        competences: [{ competence: ["Analyse Financière", "Excel", "SAP"] }],
      },
      {
        id_user: insertedUsers[16]._id,
        prenom: "Khalid",
        nom: "Ammar",
        adresse: "789 Rue de la Kasbah, Marrakech, Maroc",
        date_naissance: new Date("1989-08-10"),
        telephone: "0669012345",
        profilePath: "https://picsum.photos/200/200?random=9",
        education: [
          {
            diplome: "Licence en Commerce",
            institut: "Université Cadi Ayyad",
            date_debut: new Date("2008-09-01"),
            date_fin: new Date("2011-06-30"),
            description: "Spécialisation en commerce international",
          },
        ],
        experiences: [
          {
            poste: "Responsable Commercial",
            entreprise: "TradeCorp",
            date_debut: new Date("2011-09-01"),
            date_fin: new Date("2016-12-31"),
            description: "Développement des ventes et gestion de la clientèle",
          },
        ],
        competences: [{ competence: ["Vente", "Négociation", "CRM"] }],
      },
      {
        id_user: insertedUsers[18]._id,
        prenom: "Samira",
        nom: "Toumi",
        adresse: "123 Boulevard Zerktouni, Casablanca, Maroc",
        date_naissance: new Date("1990-04-22"),
        telephone: "0670123456",
        profilePath: "https://picsum.photos/200/200?random=10",
        education: [
          {
            diplome: "Licence en Ressources Humaines",
            institut: "Université Hassan II",
            date_debut: new Date("2009-09-01"),
            date_fin: new Date("2012-06-30"),
            description: "Spécialisation en gestion des ressources humaines",
          },
        ],
        experiences: [
          {
            poste: "Responsable RH",
            entreprise: "HRCorp",
            date_debut: new Date("2012-09-01"),
            date_fin: new Date("2017-12-31"),
            description: "Gestion du personnel et recrutement",
          },
        ],
        competences: [
          {
            competence: ["Recrutement", "Gestion de Paie", "Droit du Travail"],
          },
        ],
      },
    ];

    insertedCnadidat = await Candidat.insertMany(candidats);
    console.log("les candidat ajouté avec success");

    const entreprisess = await Entreprise.find(); // Assurez-vous d'avoir quelques entreprises dans votre collection
    if (entreprises.length === 0) {
      console.log(
        "Veuillez ajouter quelques entreprises avant d'exécuter le seeder."
      );
      return;
    }















    // -------------------------------------------------------------offres---------------------------------------------------------------------------------------------

    const offres = [
      {
          titre: "Développeur Full Stack",
          description:
            "Nous recherchons un développeur Full Stack expérimenté pour rejoindre notre équipe dynamique.",
          date_publication: new Date(),
          typeContrat: "CDI",
          salaire: "50000",
          lieu: "Casablanca",
          idEntreprises: insertedEntreprise[0]._id,
          competences: ["JavaScript", "React", "Node.js"],
          experiences: ["Minimum 3 ans d'expérience en développement web"],
          autres_informations: "Expérience avec les bases de données SQL",
          logo: "https://via.placeholder.com/150",
          date_debut: new Date(),
          date_fin: new Date(),
        },
        {
          titre: "Chef de Projet Marketing Digital",
          description:
            "Nous recherchons un chef de projet marketing digital pour diriger nos initiatives de marketing en ligne.",
          date_publication: new Date(),
          typeContrat: "CDI",
          salaire: "60000",
          lieu: "Rabat",
          idEntreprises: insertedEntreprise[1]._id,
          competences: ["Stratégie marketing", "SEO", "SEM"],
          experiences: ["Expérience antérieure dans un rôle similaire"],
          autres_informations: "Bonne compréhension des outils d'analyse web",
          logo: "https://via.placeholder.com/150",
          date_debut: new Date(),
          date_fin: new Date(),
        },
        {
          titre: "Ingénieur DevOps",
          description:
            "Nous cherchons un ingénieur DevOps pour intégrer notre équipe technique et améliorer notre processus de déploiement.",
          date_publication: new Date(),
          typeContrat: "CDI",
          salaire: "55000",
          lieu: "Marrakech",
          idEntreprises: insertedEntreprise[2]._id,
          competences: ["CI/CD", "Docker", "Kubernetes"],
          experiences: [
            "Expérience en automatisation des pipelines de déploiement",
          ],
          autres_informations: "Familiarité avec les technologies cloud",
          logo: "https://via.placeholder.com/150",
          date_debut: new Date(),
          date_fin: new Date(),
        },
        {
          titre: "Designer UI/UX",
          description:
            "Nous recherchons un designer UI/UX talentueux pour créer des expériences utilisateur exceptionnelles.",
          date_publication: new Date(),
          typeContrat: "CDI",
          salaire: "58000",
          lieu: "Agadir",
          idEntreprises: insertedEntreprise[3]._id,
          competences: [
            "Conception d'interface utilisateur",
            "Prototypage",
            "Design thinking",
          ],
          experiences: [
            "Expérience dans la conception d'applications web et mobiles",
          ],
          autres_informations:
            "Bonne compréhension des principes de conception centrée sur l'utilisateur",
          logo: "https://via.placeholder.com/150",
          date_debut: new Date(),
          date_fin: new Date(),
        },
        {
          titre: "Analyste financier",
          description:
            "Nous recherchons un analyste financier pour fournir une analyse précise et des conseils stratégiques.",
          date_publication: new Date(),
          typeContrat: "CDI",
          salaire: "65000",
          lieu: "Tanger",
          idEntreprises: insertedEntreprise[4]._id,
          competences: [
            "Analyse financière",
            "Modélisation financière",
            "Reporting financier",
          ],
          experiences: [
            "Expérience en analyse financière dans un environnement d'entreprise",
          ],
          autres_informations:
            "Connaissance approfondie des outils d'analyse financière",
          logo: "https://via.placeholder.com/150",
          date_debut: new Date(),
          date_fin: new Date(),
        },
        {
          titre: "Responsable des Ressources Humaines",
          description:
            "Nous cherchons un responsable des ressources humaines pour gérer nos initiatives de recrutement et de développement du personnel.",
          date_publication: new Date(),
          typeContrat: "CDI",
          salaire: "60000",
          lieu: "Fès",
          idEntreprises: insertedEntreprise[5]._id,
          competences: [
            "Recrutement",
            "Gestion du personnel",
            "Développement organisationnel",
          ],
          experiences: ["Expérience en gestion des ressources humaines"],
          autres_informations:
            "Compétences exceptionnelles en communication et en résolution de problèmes",
          logo: "https://via.placeholder.com/150",
          date_debut: new Date(),
          date_fin: new Date(),
        },
        {
          titre: "Développeur Mobile",
          description:
            "Nous cherchons un développeur mobile pour rejoindre notre équipe et développer des applications innovantes.",
          date_publication: new Date(),
          typeContrat: "CDI",
          salaire: "55000",
          lieu: "Meknès",
          idEntreprises: insertedEntreprise[6]._id,
          competences: [
            "Développement iOS",
            "Développement Android",
            "React Native",
          ],
          experiences: [
            "Expérience dans le développement d'applications mobiles",
          ],
          autres_informations:
            "Passion pour la création d'expériences utilisateur mobiles exceptionnelles",
          logo: "https://via.placeholder.com/150",
          date_debut: new Date(),
          date_fin: new Date(),
        },
        {
          titre: "Consultant en Stratégie",
          description:
            "Nous cherchons un consultant en stratégie pour fournir des conseils stratégiques à nos clients.",
          date_publication: new Date(),
          typeContrat: "CDI",
          salaire: "65000",
          lieu: "Tétouan",
          idEntreprises: insertedEntreprise[7]._id,
          competences: [
            "Analyse stratégique",
            "Planification stratégique",
            "Conseils en management",
          ],
          experiences: ["Expérience en consulting stratégique"],
          autres_informations:
            "Capacité à travailler sur des projets variés dans différents secteurs",
          logo: "https://via.placeholder.com/150",
          date_debut: new Date(),
          date_fin: new Date(),
        },
        {
          titre: "Ingénieur Réseaux et Télécommunications",
          description:
            "Nous recherchons un ingénieur réseaux et télécommunications pour concevoir et maintenir nos infrastructures réseau.",
          date_publication: new Date(),
          typeContrat: "CDI",
          salaire: "60000",
          lieu: "Essaouira",
          idEntreprises: insertedEntreprise[8]._id,
          competences: [
            "Réseaux informatiques",
            "Télécommunications",
            "Sécurité réseau",
          ],
          experiences: [
            "Expérience dans la conception et la gestion des réseaux",
          ],
          autres_informations:
            "Connaissance approfondie des protocoles de communication",
          logo: "https://via.placeholder.com/150",
          date_debut: new Date(),
          date_fin: new Date(),
        },
        {
          titre: "Responsable Qualité",
          description:
            "Nous cherchons un responsable qualité pour assurer la conformité de nos produits et services aux normes.",
          date_publication: new Date(),
          typeContrat: "CDI",
          salaire: "62000",
          lieu: "Témara",
          idEntreprises: insertedEntreprise[9]._id,
          competences: [
            "Gestion de la qualité",
            "Normes ISO",
            "Amélioration continue",
          ],
          experiences: ["Expérience dans le domaine de l'assurance qualité"],
          autres_informations: "Familiarité avec les outils d'analyse qualité",
          logo: "https://via.placeholder.com/150",
          date_debut: new Date(),
          date_fin: new Date(),
        }
      ]

    await Offre.insertMany(offres);
    console.log("Offres ajoutées avec succès.");

    mongoose.connection.close();
    console.log("Connexion à MongoDB fermée");
  } catch (error) {
    console.error("Erreur lors du seeding de la base de données:", error);
  }
}

//pour exucuter le seeder saisi la commande suivant :
//npm run seed