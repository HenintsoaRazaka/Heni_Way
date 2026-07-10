// src/controllers/authController.js
const authModel = require('../models/authModel'); // On importe ton modèle

const authController = {
    inscription: async (req, res) => {
        try {
            const {  Nom, Pseudo, email, Telephone , password} = req.body;

            const infosPassagers = { Nom, Pseudo, Telephone };

            const utilisateur = await authModel.inscriptionModel(email, password, infosPassagers);

            return res.status(201).json({
                succes: true,
                message: "Compte créé avec succès ! Veuillez vérifier votre boîte email pour confirmer l'inscription.",
                donnees: utilisateur
            });

        } catch (error) {
            return res.status(500).json({
                succes: false,
                message: error.message
            });
        }
    }
};

module.exports = authController;