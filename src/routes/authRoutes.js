const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifierSession = require('../middlewares/authMiddlewares');

router.post('/inscription', authController.inscription);

router.post('/connexion', authController.connexion);

router.post('/api/auth/Connexion/administrateur', authController.connexionAdministrateur);

module.exports = router;