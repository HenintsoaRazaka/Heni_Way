const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifierSession = require('../middlewares/authMiddlewares');
const Insertion = require ('../controllers/Insert');
const Extract = require ('../controllers/ExtractController');

router.post('/inscription', authController.inscription);
router.post('/connexion', authController.connexion);
router.post('/Administrateur', authController.connexionAdministrateur);
router.post('/voitures', Insertion.ajouterVoiture);
router.post('/Publication', Insertion.ajouterPublication);
router.post('/Annulation', Extract.Supprime);

module.exports = router;