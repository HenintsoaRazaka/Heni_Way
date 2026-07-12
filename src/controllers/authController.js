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

            const emailExiste = await authModel.verification(email);

            if (dataEmail.email_deliverability.status === "undeliverable") {
                return res.status(400).json({
                    type: "INVALID_EMAIL"
                });
            }

            if (searchError) {
                throw new Error(`Erreur lors de la vérification de l'email : ${searchError.message}`);
            }

            if (emailExiste) {
                return res.status(400).json({
                    message: "E-valide"
                });
            }

            const utilisateur = await authModel.inscription(email, password, infosPassagers);

            return res.status(201).json({
                message: "Valider.",
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