const express = require('express');
const router = express.Router();
const professeurController = require('../controllers/professeurController');

// Routes pour les professeurs
router.get('/', professeurController.getAllProfesseurs);
router.get('/:id', professeurController.getProfesseurById);
router.post('/', professeurController.createProfesseur);
router.put('/:id', professeurController.updateProfesseur);
router.delete('/:id', professeurController.deleteProfesseur);

// Route pour récupérer les cours d'un professeur
router.get('/:id/cours', professeurController.getCoursProfesseur);

module.exports = router; 