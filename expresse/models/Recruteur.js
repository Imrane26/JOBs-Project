// models/Recruteur.js

const mongoose = require('mongoose');

const recruteurSchema = new mongoose.Schema({
  idEntreprise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Entreprise',
    required: true
  },
  id_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  nom: {
    type: String,
    required: true
  },
  adresse: {
    type: String,
    required: true
  },
  date_naissance: {
    type: Date,
    required: true
  },
  telephone: {
    type: String,
    required: true
  },
  profilePath: {
    type: String,
    required: false
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Recruteur', recruteurSchema);
