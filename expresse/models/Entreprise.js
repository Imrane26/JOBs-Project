// models/Entreprise.js

const mongoose = require('mongoose');

const entrepriseSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  siret: {
    type: String,
    required: false
  },
  adresse: {
    type: String,
    required: true
  },
  activite: {
    type: String,
    required: true
  },
  site_web: {
    type: String,
    required: false
  },
  logo: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Entreprise', entrepriseSchema);
