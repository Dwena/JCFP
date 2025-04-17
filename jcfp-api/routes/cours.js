const express = require('express');
const router = express.Router();
const coursController = require('../controllers/coursController');

// Routes pour les cours
router.get('/', coursController.getAllCours);
router.get('/:id', coursController.getCoursById);
router.post('/', coursController.createCours);
router.put('/:id', coursController.updateCours);
router.delete('/:id', coursController.deleteCours);

// Route pour récupérer les adhérents inscrits à un cours
router.get('/:id/adherents', coursController.getAdherentsCours);

module.exports = router; 