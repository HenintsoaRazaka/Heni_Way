const ExtractModel = require('../controllers/ExtractModel');

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
    }
};

module.exports = ExtractController;