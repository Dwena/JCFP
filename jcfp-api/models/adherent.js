const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adherentSchema = new Schema({
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  dateNaissance: {
    type: Date,
    required: true
  },
  adresse: {
    type: String,
    required: true
  },
  telephone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  dateInscription: {
    type: Date,
    default: Date.now
  },
  paiement: {
    type: String,
    enum: ['Chèque', 'Espèces', 'Carte Bancaire', 'Virement', 'Bon CAF'],
    required: true
  },
  montant: {
    type: Number,
    required: true,
    min: 0
  },
  cours: [{
    type: Schema.Types.ObjectId,
    ref: 'Cours'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Adherent', adherentSchema); 