const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const professeurSchema = new Schema({
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  telephone: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Professeur', professeurSchema); 