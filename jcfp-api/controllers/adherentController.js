const Adherent = require('../models/adherent');
const Cours = require('../models/cours');

// Récupérer tous les adhérents
exports.getAllAdherents = async (req, res) => {
  try {
    const adherents = await Adherent.find().populate('cours');
    res.status(200).json(adherents);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des adhérents', error: error.message });
  }
};

// Récupérer un adhérent par son ID
exports.getAdherentById = async (req, res) => {
  try {
    const adherent = await Adherent.findById(req.params.id).populate('cours');
    
    if (!adherent) {
      return res.status(404).json({ message: 'Adhérent non trouvé' });
    }
    
    res.status(200).json(adherent);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'adhérent', error: error.message });
  }
};

// Créer un nouvel adhérent
exports.createAdherent = async (req, res) => {
  try {
    const nouvelAdherent = new Adherent(req.body);
    const adherentSauvegarde = await nouvelAdherent.save();
    
    // Mettre à jour le nombre d'inscrits pour chaque cours
    if (req.body.cours && req.body.cours.length > 0) {
      for (const coursId of req.body.cours) {
        await Cours.findByIdAndUpdate(
          coursId,
          { $inc: { inscrits: 1 } }
        );
      }
    }
    
    res.status(201).json(adherentSauvegarde);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création de l\'adhérent', error: error.message });
  }
};

// Mettre à jour un adhérent
exports.updateAdherent = async (req, res) => {
  try {
    const adherent = await Adherent.findById(req.params.id);
    
    if (!adherent) {
      return res.status(404).json({ message: 'Adhérent non trouvé' });
    }
    
    // Vérifier si les cours ont changé
    const anciensCours = adherent.cours.map(c => c.toString());
    const nouveauxCours = req.body.cours || [];
    
    // Cours qui ont été retirés
    const coursRetires = anciensCours.filter(c => !nouveauxCours.includes(c));
    
    // Cours qui ont été ajoutés
    const coursAjoutes = nouveauxCours.filter(c => !anciensCours.includes(c));
    
    // Mettre à jour l'adhérent
    const adherentMisAJour = await Adherent.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('cours');
    
    // Mettre à jour le nombre d'inscrits pour les cours
    for (const coursId of coursRetires) {
      await Cours.findByIdAndUpdate(
        coursId,
        { $inc: { inscrits: -1 } }
      );
    }
    
    for (const coursId of coursAjoutes) {
      await Cours.findByIdAndUpdate(
        coursId,
        { $inc: { inscrits: 1 } }
      );
    }
    
    res.status(200).json(adherentMisAJour);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour de l\'adhérent', error: error.message });
  }
};

// Supprimer un adhérent
exports.deleteAdherent = async (req, res) => {
  try {
    const adherent = await Adherent.findById(req.params.id);
    
    if (!adherent) {
      return res.status(404).json({ message: 'Adhérent non trouvé' });
    }
    
    // Mettre à jour le nombre d'inscrits pour chaque cours
    for (const coursId of adherent.cours) {
      await Cours.findByIdAndUpdate(
        coursId,
        { $inc: { inscrits: -1 } }
      );
    }
    
    await adherent.remove();
    res.status(200).json({ message: 'Adhérent supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'adhérent', error: error.message });
  }
}; 