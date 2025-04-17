const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coursSchema = new Schema({
  nom: {
    type: String,
    required: true
  },
  jour: {
    type: String,
    required: true,
    enum: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
  },
  heureDebut: {
    type: String,
    required: true
  },
  heureFin: {
    type: String,
    required: true
  },
  niveau: {
    type: String,
    enum: ['Débutant', 'Intermédiaire', 'Avancé'],
    default: 'Débutant'
  },
  capaciteMax: {
    type: Number,
    required: true,
    min: 1
  },
  inscrits: {
    type: Number,
    default: 0
  },
  professeur: {
    type: Schema.Types.ObjectId,
    ref: 'Professeur',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Cours', coursSchema); 