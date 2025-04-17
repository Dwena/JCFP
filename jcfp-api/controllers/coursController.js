const Cours = require('../models/cours');
const Professeur = require('../models/professeur');
const Salle = require('../models/salle');
const Adherent = require('../models/adherent');

// Récupérer tous les cours
exports.getAllCours = async (req, res) => {
  try {
    const cours = await Cours.find().populate('professeur');
    res.status(200).json(cours);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des cours', error: error.message });
  }
};

// Récupérer un cours par son ID
exports.getCoursById = async (req, res) => {
  try {
    const cours = await Cours.findById(req.params.id).populate('professeur');
    
    if (!cours) {
      return res.status(404).json({ message: 'Cours non trouvé' });
    }
    
    res.status(200).json(cours);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du cours', error: error.message });
  }
};

// Créer un nouveau cours
exports.createCours = async (req, res) => {
  try {
    const { nom, jour, heureDebut, heureFin, niveau, capaciteMax, professeur } = req.body;
    
    // Vérifier que le professeur existe
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
    
    // Récupérer le cours avec les détails du professeur
    const coursComplet = await Cours.findById(coursSauvegarde._id).populate('professeur');
    
    res.status(201).json(coursComplet);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création du cours', error: error.message });
  }
};

// Mettre à jour un cours
exports.updateCours = async (req, res) => {
  try {
    const cours = await Cours.findById(req.params.id);
    
    if (!cours) {
      return res.status(404).json({ message: 'Cours non trouvé' });
    }
    
    const { nom, jour, heureDebut, heureFin, niveau, capaciteMax, professeur } = req.body;
    
    // Mettre à jour les champs simples
    cours.nom = nom || cours.nom;
    cours.jour = jour || cours.jour;
    cours.heureDebut = heureDebut || cours.heureDebut;
    cours.heureFin = heureFin || cours.heureFin;
    cours.niveau = niveau || cours.niveau;
    cours.capaciteMax = capaciteMax !== undefined ? capaciteMax : cours.capaciteMax;
    
    // Mettre à jour le professeur si nécessaire
    if (professeur) {
      if (professeur._id) {
        // Vérifier que le professeur existe
        const profExiste = await Professeur.findById(professeur._id);
        if (!profExiste) {
          return res.status(404).json({ message: 'Professeur non trouvé' });
        }
        cours.professeur = professeur._id;
      } else {
        // Créer un nouveau professeur
        const nouveauProf = new Professeur(professeur);
        const profSauvegarde = await nouveauProf.save();
        cours.professeur = profSauvegarde._id;
      }
    }
    
    const coursMisAJour = await cours.save();
    
    // Récupérer le cours avec les détails du professeur
    const coursComplet = await Cours.findById(coursMisAJour._id).populate('professeur');
    
    res.status(200).json(coursComplet);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour du cours', error: error.message });
  }
};

// Supprimer un cours
exports.deleteCours = async (req, res) => {
  try {
    const cours = await Cours.findById(req.params.id);
    
    if (!cours) {
      return res.status(404).json({ message: 'Cours non trouvé' });
    }
    
    // Vérifier si des adhérents sont inscrits à ce cours
    if (cours.inscrits > 0) {
      const adherentsInscrits = await Adherent.find({ cours: cours._id });
      
      if (adherentsInscrits.length > 0) {
        return res.status(400).json({
          message: 'Impossible de supprimer ce cours car des adhérents y sont inscrits',
          adherentsInscrits: adherentsInscrits.map(a => ({ id: a._id, nom: a.nom, prenom: a.prenom }))
        });
      }
    }
    
    // Retirer le cours des salles qui le contiennent
    await Salle.updateMany(
      { cours: cours._id },
      { $pull: { cours: cours._id } }
    );
    
    await cours.deleteOne();
    res.status(200).json({ message: 'Cours supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du cours', error: error.message });
  }
};

// Récupérer les adhérents inscrits à un cours
exports.getAdherentsCours = async (req, res) => {
  try {
    const cours = await Cours.findById(req.params.id);
    
    if (!cours) {
      return res.status(404).json({ message: 'Cours non trouvé' });
    }
    
    const adherents = await Adherent.find({ cours: cours._id });
    res.status(200).json(adherents);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des adhérents du cours', error: error.message });
  }
}; 