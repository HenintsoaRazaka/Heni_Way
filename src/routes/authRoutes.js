const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifierSession = require('../middlewares/authMiddlewares');
const Insertion = require ('../controllers/Insert');

router.post('/inscription', authController.inscription);
router.post('/connexion', authController.connexion);
router.post('/Administrateur', authController.connexionAdministrateur);
router.post('/voitures', Insertion.Insert);

module.exports = router;