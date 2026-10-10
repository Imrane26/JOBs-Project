// routes/offres.js
const express = require("express");
const router = express.Router();
const Offre = require("../models/Offre");
const authMiddleware = require("../middleware/authMiddleware");
const checkUserType = require("../middleware/checkUserType");
const mongoose=require("mongoose")

// Créer une nouvelle offre
router.post(
  "/offres",
  authMiddleware,
  checkUserType("recruteur"),
  async (req, res) => {
    try {
      const {
        titre,
        description,
        typeContrat,
        salaire,
        lieu,
        competences,
        experiences,
        autres_informations,
        date_debut,
        date_fin,
        idEntreprise,
        date_publication,
      } = req.body;
      const offre = new Offre(
      {  titre,
        description,
        typeContrat,
        salaire,
        lieu,
        competences,
        experiences,
        autres_informations,
        date_debut,
        date_fin,
        idEntreprises:idEntreprise,
        date_publication}
      );
      await offre.save();
      res.status(201).json(offre);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Récupérer toutes les offres
router.get("/offres", authMiddleware, async (req, res) => {
  try {
    const offres = await Offre.find()
      .populate("idEntreprises")
      .populate("candidature");
    res.status(200).json(offres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Récupérer une offre par son identifiant
router.get("/offres/:id", authMiddleware, async (req, res) => {
  try {
    const offre = await Offre.findById(req.params.id)
      .populate("idEntreprises")
      .populate("candidature");
    if (!offre) {
      return res.status(404).json({ error: "Offre non trouvée" });
    }
    res.status(200).json(offre);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mettre à jour une offre
router.put(
  "/offres/:id",
  authMiddleware,
  checkUserType("recruteur"),
  async (req, res) => {
    try {
      const offre = await Offre.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!offre) {
        return res.status(404).json({ error: "Offre non trouvée" });
      }
      res.status(200).json(offre);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Supprimer une offre
router.delete(
  "/offres/:id",
  authMiddleware,
  checkUserType("recruteur"),
  async (req, res) => {
    try {
      const offre = await Offre.findByIdAndDelete(req.params.id);
      if (!offre) {
        return res.status(404).json({ error: "Offre non trouvée" });
      }
      res.status(200).json({ message: "Offre supprimée avec succès" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Ajouter un commentaire à une offre
router.post("/offres/:id/commentaires", async (req, res) => {
  try {
    const offre = await Offre.findById(req.params.id);
    if (!offre) {
      return res.status(404).json({ error: "Offre non trouvée" });
    }
    offre.commentaires.push(req.body);
    await offre.save();
    res.status(201).json(offre);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ajouter une candidature à une offre
router.post("/offres/:id/candidatures", async (req, res) => {
  try {
    const offre = await Offre.findById(req.params.id);
    if (!offre) {
      return res.status(404).json({ error: "Offre non trouvée" });
    }
    offre.candidature.push(req.body.candidatId);
    await offre.save();
    res.status(201).json(offre);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
