const mongoose = require('mongoose');

// Import des modèles
const Entreprise = require('./Entreprise');
const Candidat = require('./Candidat');
const Recruteur = require('./Recruteur');
const Offre = require('./Offre');
const Publication = require('./Publication');
const User = require('./User');

// // Relation entre Utilisateur (User) et Candidat
// User.hasOne(Candidat, { foreignKey: 'userId' });
// Candidat.belongsTo(User, { foreignKey: 'userId' });

// // Relation entre Utilisateur (User) et Recruteur
// User.hasOne(Recruteur, { foreignKey: 'userId' });
// Recruteur.belongsTo(User, { foreignKey: 'userId' });

// // Relation entre recruteur  et Entreprise
// Recruteur.belongsTo(Entreprise, { foreignKey: 'entrepriseId' });
// Entreprise.hasMany(Recruteur, { foreignKey: 'entrepriseId' });

// // Relation entre Recruteur et Offre
// Recruteur.hasMany(Offre, { foreignKey: 'recruteurId' });
// Offre.belongsTo(Recruteur, { foreignKey: 'recruteurId' });

// // Relation entre user et Publication
// User.hasMany(Publication, { foreignKey: 'auteurId' });
// Publication.belongsTo(User, { foreignKey: 'auteurId' });



// Export des modèles
module.exports = {
  Entreprise,
  Candidat,
  Recruteur,
  Offre,
  Publication,
  User,
};
