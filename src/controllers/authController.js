const authModel = require('../models/authModel');
const ExtractModel = require('../models/extractModel');

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

            if (emailExiste.exist === true) {
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
    },

    connexion: async (req, res) => {
        try {
            const {Pseudo, email, password } = req.body;

            const sessionData = await authModel.connexion(email, password);

            return res.status(200).json({
                succes: true,
                message: "Connexion",
                token: sessionData.session.access_token,
                utilisateur: sessionData.user
            });

        } catch (error) {
            const errorMessage = error.message;

            if (errorMessage.includes("Invalid login credentials")) {
                messageErreur = "E.M.I";
            }

            return res.status(500).json({
                succes: false,
                message: errorMessage
            });
        }
    }, 

    connexionAdministrateur: async (req, res) => {
        try {
            const { email, password } = req.body;

            const sessionData = await authModel.connexion(email, password);
            console.log("Session Data:", sessionData);

            const info = await ExtractModel.extraction("Administrateur", "id");
            console.log("Info:", info);

            const idtable = info.id;
            const iduser = sessionData.user.id;

            console.log("ID Table:", idtable, "== ID User:", iduser);

            if (idtable == iduser) {
                return res.status(200).json({
                    succes: true,
                    message: "Connexion administrateur réussie",
                    token: sessionData.session.access_token,
                    utilisateur: sessionData.user,
                    informations: info
                });
            } else {
                return res.status(403).json({
                    succes: false,
                    message: "Accès refusé. Vous n'êtes pas un administrateur."
                });
            }

        } catch (error) {
            return res.status(500).json({
                succes: false,
                message: error.message
            });
        }
    }
};

module.exports = authController;