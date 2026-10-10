const express = require('express');
const router = express.Router();
const Entreprise = require('../models/Entreprise');
const authMiddleware = require("../middleware/authMiddleware");




// Route pour créer une entreprise
router.post('/entreprise', async (req, res) => {
  try {
    const entreprise = new Entreprise(req.body);
    await entreprise.save();
    res.status(201).json({ message: 'Entreprise créée avec succès', entreprise });
  } catch (error) {
    res.status(400).json({ error: "Erreur lors de la création de cette entreprise", message: error.message });
  }
});

// Route pour récupérer toutes les entreprises
router.get('/entreprise',async (req, res) => {
  try {
    const entreprises = await Entreprise.find();
    res.status(200).json(entreprises);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des entreprises", message: error.message });
  }
});

// Route pour récupérer une entreprise par son ID
router.get('/entreprise/:id', authMiddleware,async (req, res) => {
  try {
    const entreprise = await Entreprise.findById(req.params.id);
    if (!entreprise) {
      return res.status(404).json({ error: "Entreprise non trouvée" });
    }
    res.status(200).json(entreprise);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération de cette entreprise", message: error.message });
  }
});

// Route pour mettre à jour une entreprise par son ID
router.put('/entreprise/:id', authMiddleware,async (req, res) => {
  try {
    const entreprise = await Entreprise.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!entreprise) {
      return res.status(404).json({ error: "Entreprise non trouvée" });
    }
    res.status(200).json({ message: 'Entreprise mise à jour avec succès', entreprise });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la mise à jour de cette entreprise", message: error.message });
  }
});

// Route pour supprimer une entreprise par son ID
router.delete('/:id', authMiddleware ,async (req, res) => {
  try {
    const entreprise = await Entreprise.findByIdAndDelete(req.params.id);
    if (!entreprise) {
      return res.status(404).json({ error: "Entreprise non trouvée" });
    }
    res.status(200).json({ message: 'Entreprise supprimée avec succès', entreprise });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression de cette entreprise", message: error.message });
  }
});

module.exports = router;
