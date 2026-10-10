const express = require("express");
const router = express.Router();
const Publication = require("../models/Publication");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");
const fs = require("fs");

const Recruteur = require("../models/Recruteur");
const Candidat = require("../models/Candidat");

// Configuration de Multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./uploads/publication";
    fs.exists(dir, (exist) => {
      if (!exist) {
        return fs.mkdir(dir, { recursive: true }, (err) => cb(err, dir));
      }
      return cb(null, dir);
    });
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Create a new publication
router.post(
  "/publication",
  authMiddleware,
  upload.single("imagePath"),
  async (req, res) => {
    const { titre, contenu, auteur } = req.body;
    const imagePath = req.file ? req.file.path : null;
    try {
      const publication = new Publication({
        titre,
        contenu,
        auteur: auteur,
        imagePath: imagePath,
      });
      await publication.save();
      res.status(201).json(publication);
    } catch (error) {
      res
        .status(400)
        .json({
          error: `Erreur lors de la création de la publication: ${error.message}`,
        });
    }
  }
);

// Get all publications
router.get("/publication", async (req, res) => {
  try {
    // Fetch all publications with populated author and comments
    const publications = await Publication.find();
    // Create a map to quickly look up user info
    const publicationsAuteur = await Promise.all(
      publications.map(async (pub) => {
        // Vérifie si l'auteur est un recruteur
        const recruteur = await Recruteur.findOne({ id_user: pub.auteur });
        if (recruteur) {
          return {
            publication: pub,
            auteur: {
              type: "recruteur",
              info: recruteur,
            },
          };
        } else {
          // Sinon, vérifie si l'auteur est un candidat
          const candidat = await Candidat.findOne({ id_user: pub.auteur });
          if (candidat) {
            return {
              publication: pub,
              auteur: {
                type: "candidat",
                info: candidat,
              },
            };
          } else {
            return {
              publication: pub,
              auteur: null,
            };
          }
        }
      })
    );

    // Send the response
    res.status(200).json(publicationsAuteur);
  } catch (error) {
    // Send error response in case of failure
    res
      .status(500)
      .json({
        error: `Erreur lors de la récupération des publications: ${error.message}`,
      });
  }
});

// Get a specific publication by ID
router.get("/publication/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const publication = await Publication.findById(id)
      .populate("auteur")
      .populate("commentaires.idCommentateur");
    if (!publication) {
      return res.status(404).json({ error: "Publication non trouvée" });
    }
    res.status(200).json(publication);
  } catch (error) {
    res
      .status(500)
      .json({
        error: `Erreur lors de la récupération de la publication: ${error.message}`,
      });
  }
});

// Update a publication
router.put(
  "/publication/:id",
  authMiddleware,
  upload.single("imagePath"),
  async (req, res) => {
    const { id } = req.params;
    const { titre, contenu } = req.body;
    const imagePath = req.file ? req.file.path : req.body.imagePath;
    try {
      const publication = await Publication.findByIdAndUpdate(
        id,
        { titre, contenu, imagePath: imagePath },
        { new: true, runValidators: true }
      );
      if (!publication) {
        return res.status(404).json({ error: "Publication non trouvée" });
      }
      res.status(200).json(publication);
    } catch (error) {
      res
        .status(400)
        .json({
          error: `Erreur lors de la mise à jour de la publication: ${error.message}`,
        });
    }
  }
);

// Delete a publication
router.delete("/publication/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const publication = await Publication.findByIdAndDelete(id);
    if (!publication) {
      return res.status(404).json({ error: "Publication non trouvée" });
    }
    res.status(200).json({ message: "Publication supprimée avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({
        error: `Erreur lors de la suppression de la publication: ${error.message}`,
      });
  }
});

// Add a comment to a publication
router.post(
  "/publication/:id/commentaires",
  authMiddleware,
  async (req, res) => {
    const { id } = req.params;
    const { idCommentateur, contenu } = req.body;
    try {
      const publication = await Publication.findById(id);
      if (!publication) {
        return res.status(404).json({ error: "Publication non trouvée" });
      }
      publication.commentaires.push({ idCommentateur, contenu });
      await publication.save();
      res.status(201).json(publication);
    } catch (error) {
      res
        .status(400)
        .json({
          error: `Erreur lors de l'ajout du commentaire: ${error.message}`,
        });
    }
  }
);

module.exports = router;
