const Salle = require('../models/salle');
const Cours = require('../models/cours');
const Professeur = require('../models/professeur');

// Récupérer toutes les salles avec leurs cours
exports.getAllSalles = async (req, res) => {
  try {
    const salles = await Salle.find().populate({
      path: 'cours',
      populate: {
        path: 'professeur'
      }
    });
    res.status(200).json(salles);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des salles', error: error.message });
  }
};

// Récupérer une salle par son ID
exports.getSalleById = async (req, res) => {
  try {
    const salle = await Salle.findById(req.params.id).populate({
      path: 'cours',
      populate: {
        path: 'professeur'
      }
    });
    
    if (!salle) {
      return res.status(404).json({ message: 'Salle non trouvée' });
    }
    
    res.status(200).json(salle);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la salle', error: error.message });
  }
};

// Créer une nouvelle salle
exports.createSalle = async (req, res) => {
  const { nom, adresse } = req.body;
  
  try {
    const nouvelleSalle = new Salle({
      nom,
      adresse,
      cours: []
    });
    
    const salleSauvegardee = await nouvelleSalle.save();
    res.status(201).json(salleSauvegardee);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création de la salle', error: error.message });
  }
};

// Mettre à jour une salle
exports.updateSalle = async (req, res) => {
  try {
    const salle = await Salle.findById(req.params.id);
    
    if (!salle) {
      return res.status(404).json({ message: 'Salle non trouvée' });
    }
    
    const { nom, adresse } = req.body;
    salle.nom = nom || salle.nom;
    salle.adresse = adresse || salle.adresse;
    
    const salleMiseAJour = await salle.save();
    res.status(200).json(salleMiseAJour);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour de la salle', error: error.message });
  }
};

// Supprimer une salle
exports.deleteSalle = async (req, res) => {
  try {
    const salle = await Salle.findById(req.params.id);
    
    if (!salle) {
      return res.status(404).json({ message: 'Salle non trouvée' });
    }
    
    // Supprimer les cours associés à cette salle
    await Cours.deleteMany({ _id: { $in: salle.cours } });
    
    await salle.remove();
    res.status(200).json({ message: 'Salle supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la salle', error: error.message });
  }
};

// Ajouter un cours à une salle
exports.ajouterCours = async (req, res) => {
  try {
    const salle = await Salle.findById(req.params.id);
    
    if (!salle) {
      return res.status(404).json({ message: 'Salle non trouvée' });
    }
    
    const { nom, jour, heureDebut, heureFin, niveau, capaciteMax, professeur } = req.body;
    
    // Créer ou récupérer le professeur
    let profInstance;
    if (professeur._id) {
      profInstance = await Professeur.findById(professeur._id);
      if (!profInstance) {
        return res.status(404).json({ message: 'Professeur non trouvé' });
      }
    } else {
      profInstance = new Professeur(professeur);
      await profInstance.save();
    }
    
    // Créer le cours
    const nouveauCours = new Cours({
      nom,
      jour,
      heureDebut,
      heureFin,
      niveau,
      capaciteMax,
      inscrits: 0,
      professeur: profInstance._id
    });
    
    const coursSauvegarde = await nouveauCours.save();
    
    // Ajouter le cours à la salle
    salle.cours.push(coursSauvegarde._id);
    await salle.save();
    
    // Renvoyer le cours avec les détails du professeur
    const coursAvecDetails = await Cours.findById(coursSauvegarde._id).populate('professeur');
    
    res.status(201).json(coursAvecDetails);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de l\'ajout du cours', error: error.message });
  }
}; 