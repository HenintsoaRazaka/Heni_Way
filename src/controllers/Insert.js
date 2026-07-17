const VoitureModel = require('../models/Insert');
const supabase = require ('../config/supabase');

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
    },

    ajouterPublication: async (req, res) => {
            try {
                const { statut, Date, immat, depart, destination, heure } = req.body;

                // 1. Validation rapide des données requises
                if (!statut || !immat || !depart || !destination || !heure) {
                    return res.status(400).json({
                        success: false,
                        message: "Veuillez remplir tous les champs obligatoires."
                    });
                }

                // 2. Recherche de la voiture correspondante dans la table 'Voiture' via son Immatriculation
                const { data: voiture, error: voitureError } = await supabase.supabaseService
                    .from('Voiture')
                    .select('id')
                    .eq('Immatriculation', immat)
                    .single();

                if (voitureError || !voiture) {
                    return res.status(404).json({
                        success: false,
                        message: `Aucun véhicule trouvé avec l'immatriculation : ${immat}. Veuillez d'abord l'enregistrer.`
                    });
                }

                // 3. Préparation des données pour la table 'Reservation'
                const nouvellePublication = {
                    ID_Voiture: voiture.id,
                    Depart: depart,
                    Destination: destination,
                    Heure: heure,
                    Etat: "Reserver", // Valeur par défaut
                    Date: Date // Optionnel : Date du jour au format YYYY-MM-DD
                };

                // 4. Appel du modèle pour l'insertion gggggggggggggggggggggggggggggggggggg
                //vvvvvvgggggggggggggggggggggggggggggggggggggggggggggggggg
                const publicationEnregistree = await VoitureModel.createP(nouvellePublication);

                return res.status(201).json({
                    success: true,
                    message: "Publication en ligne avec succès !",
                    data: publicationEnregistree
                });

            } catch (error) {
                console.error("Erreur dans PublicationController :", error.message);
                return res.status(500).json({
                    success: false,
                    message: "Erreur lors de la publication : " + error.message
                });
            }
        }
};

module.exports = VoitureController;