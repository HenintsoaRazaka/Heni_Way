const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifierSession = require('../middlewares/authMiddlewares');

router.post('/inscription', authController.inscription);
router.post('/connexion', authController.connexion);
router.post('/Administrateur', authController.connexionAdministrateur);
router.post('/voitures', VoitureController.ajouterVoiture);

module.exports = router;