const VoitureModel = require('../models/Insert');

const VoitureController = {
    ajouterVoiture: async (req, res) => {
        try {
            const { statut, marque, immat, chauffeurOuCouleur } = req.body;

            // Validation rapide
            if (!statut || !marque || !immat) {
                return res.status(400).json({
                    success: false,
                    message: "Veuillez remplir tous les champs obligatoires (Statut, Marque, Immatriculation)."
                });
            }

            // Préparation des colonnes Supabase
            const nouvelleVoiture = {
                Marque: marque,
                Immatriculation: immat,
                Statut: statut,
                Etats: "Disponible"
            };

            // Distribution dynamique selon la catégorie choisie
            if (statut === 'Public') {
                nouvelleVoiture.Couleur = chauffeurOuCouleur;
            } else if (statut === 'Spécial' || statut === 'Special') {
                nouvelleVoiture.Chauffeur = chauffeurOuCouleur;
            } else if (statut === 'Privé' || statut === 'Prive') {
                nouvelleVoiture.Proprietaire = chauffeurOuCouleur;
            }

            // Appel de la méthode d'insertion du modèle
            const voitureEnregistree = await VoitureModel.create(nouvelleVoiture);

            return res.status(201).json({
                success: true,
                message: "Véhicule enregistré avec succès !",
                data: voitureEnregistree
            });

        } catch (error) {
            console.error("Erreur dans VoitureController :", error.message);
            return res.status(500).json({
                success: false,
                message: "Erreur lors de l'enregistrement : " + error.message
            });
        }
    }
};

module.exports = VoitureController;