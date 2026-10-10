// models/Candidat.js

const mongoose = require("mongoose");
const { Schema } = mongoose;

const educationSchema = new Schema(
  {
    diplome: {
      type: String,
      required: true,
    },
    institut: {
      type: String,
      required: true,
    },
    date_debut: {
      type: Date,
      required: true,
    },
    date_fin: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const experienceSchema = new Schema(
  {
    poste: {
      type: String,
      required: true,
    },
    entreprise: {
      type: String,
      required: true,
    },
    date_debut: {
      type: Date,
      required: true,
    },
    date_fin: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);
const competenceShema = new Schema({
  competence: { type: [String], required: true },
});
const candidatSchema = new Schema(
  {
    id_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    prenom: {
      type: String,
      required: true,
    },
    nom: {
      type: String,
      required: true,
    },
    adresse: {
      type: String,
      required: true,
    },
    date_naissance: {
      type: Date,
      required: true,
    },
    profilepath: {
      type: String,
      required: false
    },
    educations: [educationSchema],
    experiences: [experienceSchema],
    competences: [competenceShema],
    telephone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Candidat", candidatSchema);
