const ExtractModel = require('../models/extractModel');

const ExtractController = {
    extraction: async (req, res) => {
        try {
            const data = await ExtractModel.extraction(tableName, columns);

            return res.status(200).json({
                succes: true,
                message: "Données extraites avec succès",
                donnees: data
            });
        } catch (error) {
            return res.status(500).json({
                succes: false,
                message: error.message
            });
        }
    },

    Supprime: async (req, res) => {
        try {
            const idReservation = req.body.id;

            if (!idReservation) {
                return res.status(400).json({ success: false, message: "ID de réservation manquant." });
            }

            await ExtractModel.Supprimer(idReservation);

            return res.status(200).json({ success: true, message: "Réservation annulée avec succès." });

        } catch (err) {
            console.error("Erreur dans le contrôleur :", err.message);
            return res.status(500).json({ success: false, message: err.message });
        }
    }
};

module.exports = ExtractController;