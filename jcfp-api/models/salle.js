const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salleSchema = new Schema({
  nom: {
    type: String,
    required: true
  },
  adresse: {
    type: String,
    required: true
  },
  cours: [{
    type: Schema.Types.ObjectId,
    ref: 'Cours'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Salle', salleSchema); 