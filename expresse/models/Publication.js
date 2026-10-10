// models/Publication.js
const mongoose = require('mongoose');

const commentaireSchema = new mongoose.Schema({
  idCommentateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  contenu: {
    type: String,
    required: true
  },
  date_creation: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const publicationSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true
  },
  contenu: {
    type: String,
    required: true
  },
  date_publication: {
    type: Date,
    required: true,
    default: Date.now
  },
  auteur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imagePath: {
    type: String,
    required: false
  },
  commentaires: [commentaireSchema]
});

module.exports = mongoose.model('Publication', publicationSchema);
