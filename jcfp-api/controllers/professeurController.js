const Professeur = require('../models/professeur');
const Cours = require('../models/cours');

// Récupérer tous les professeurs
exports.getAllProfesseurs = async (req, res) => {
  try {
    const professeurs = await Professeur.find();
    res.status(200).json(professeurs);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des professeurs', error: error.message });
  }
};

// Récupérer un professeur par son ID
exports.getProfesseurById = async (req, res) => {
  try {
    const professeur = await Professeur.findById(req.params.id);
    
    if (!professeur) {
      return res.status(404).json({ message: 'Professeur non trouvé' });
    }
    
    res.status(200).json(professeur);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du professeur', error: error.message });
  }
};

// Créer un nouveau professeur
exports.createProfesseur = async (req, res) => {
  try {
    const { nom, prenom, email, telephone } = req.body;
    
    const nouveauProfesseur = new Professeur({
      nom,
      prenom,
      email,
      telephone
    });
    
    const professeurSauvegarde = await nouveauProfesseur.save();
    res.status(201).json(professeurSauvegarde);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création du professeur', error: error.message });
  }
};

// Mettre à jour un professeur
exports.updateProfesseur = async (req, res) => {
  try {
    const professeur = await Professeur.findById(req.params.id);
    
    if (!professeur) {
      return res.status(404).json({ message: 'Professeur non trouvé' });
    }
    
    const { nom, prenom, email, telephone } = req.body;
    
    professeur.nom = nom || professeur.nom;
    professeur.prenom = prenom || professeur.prenom;
    professeur.email = email || professeur.email;
    professeur.telephone = telephone || professeur.telephone;
    
    const professeurMisAJour = await professeur.save();
    res.status(200).json(professeurMisAJour);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour du professeur', error: error.message });
  }
};

// Supprimer un professeur
exports.deleteProfesseur = async (req, res) => {
  try {
    const professeur = await Professeur.findById(req.params.id);
    
    if (!professeur) {
      return res.status(404).json({ message: 'Professeur non trouvé' });
    }
    
    // Vérifier si le professeur est associé à des cours
    const coursAssocies = await Cours.countDocuments({ professeur: professeur._id });
    
    if (coursAssocies > 0) {
      return res.status(400).json({ 
        message: 'Impossible de supprimer ce professeur car il est associé à des cours',
        coursAssocies 
      });
    }
    
    await professeur.deleteOne();
    res.status(200).json({ message: 'Professeur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du professeur', error: error.message });
  }
};

// Récupérer les cours d'un professeur
exports.getCoursProfesseur = async (req, res) => {
  try {
    const professeur = await Professeur.findById(req.params.id);
    
    if (!professeur) {
      return res.status(404).json({ message: 'Professeur non trouvé' });
    }
    
    const cours = await Cours.find({ professeur: professeur._id });
    res.status(200).json(cours);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des cours du professeur', error: error.message });
  }
}; 