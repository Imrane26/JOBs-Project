const express =require('express');
const router = express.Router();
const Candidat = require('../models/Candidat');
const Recruteur = require('../models/Recruteur');
const Offre = require('../models/Offre');
const Publication = require('../models/Publication');
const authMiddleware = require('../middleware/authMiddleware')


//get all user data if the user is candidat or recruteur

router.get('/dataUser/:id',async(req,res)=>{
    const {id} = req.params;
    try{
        const recruteurData = await Recruteur.findOne({ id_user: id });
        const candidatData = await Candidat.findOne({ id_user: id});
        if (!recruteurData && !candidatData) {
            return res.status(404).json({ message: "Aucun utilisateur trouvé avec cet ID." });
        }
        const userData = candidatData?candidatData:recruteurData;
        res.status(200).json(userData); 
    }catch(error){
        res.status(500).json({error:`error lors la recuperation des donnés de user :${error.message}`});
    }
})

router.get('/allDataUser/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const recruteurData = await Recruteur.findOne({ id_user: id });
        const candidatData = await Candidat.findOne({ id_user: id });
        let allDataUser = {};

        if (candidatData) {
            const offres = await Offre.find({ candidature: candidatData._id }).populate('idEntreprises');
            const publications = await Publication.find({ auteur: id });
            allDataUser = { ...candidatData.toObject(), offres,publications };
        } else if (recruteurData) {
            const offres = await Offre.find({ idEntreprises: recruteurData.idEntreprise }).populate('idEntreprises');
            const publications = await Publication.find({ auteur: id });
            allDataUser = { ...recruteurData.toObject(), offres,publications };
        } else {
            return res.status(404).json({ message: "Aucun utilisateur trouvé avec cet ID." });
        }

        res.status(200).json(allDataUser);
    } catch (error) {
        res.status(500).json({ error: `Erreur lors de la récupération des données de l'utilisateur : ${error.message}` });
    }
});



module.exports = router;
