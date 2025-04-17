const express = require('express');
const router = express.Router();
const salleController = require('../controllers/salleController');

// Routes pour les salles
router.get('/', salleController.getAllSalles);
router.get('/:id', salleController.getSalleById);
router.post('/', salleController.createSalle);
router.put('/:id', salleController.updateSalle);
router.delete('/:id', salleController.deleteSalle);

// Route pour ajouter un cours à une salle
router.post('/:id/cours', salleController.ajouterCours);

module.exports = router; 