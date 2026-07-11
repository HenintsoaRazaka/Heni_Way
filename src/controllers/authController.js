const authModel = require('../models/authModel');

const authController = {
    inscription: async (req, res) => {
        try {
            const {  Nom, Pseudo, email, Telephone , password} = req.body;
            const infosPassagers = { Nom, Pseudo, Telephone };

            const abstractApiKey = process.env.ABSTRACT_API_KEY;
            const abstractUrl = `https://emailreputation.abstractapi.com/v1/?api_key=${abstractApiKey}&email=${email}`;
            const response = await fetch(abstractUrl);
            const dataEmail = await response.json();

            if (!dataEmail.deliverability || dataEmail.deliverability === "undeliverable") {
                return res.status(400).json({
                    succes: false,
                    type: "INVALID_EMAIL"
                });
            }

            const utilisateur = await authModel.inscription(email, password, infosPassagers);

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