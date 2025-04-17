const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Initialisation de l'application Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jcfp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connexion à MongoDB établie'))
.catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Routes
const sallesRoutes = require('./routes/salles');
const adherentsRoutes = require('./routes/adherents');
const professeurRoutes = require('./routes/professeurs');
const coursRoutes = require('./routes/cours');

app.use('/api/salles', sallesRoutes);
app.use('/api/adherents', adherentsRoutes);
app.use('/api/professeurs', professeurRoutes);
app.use('/api/cours', coursRoutes);

// Route de base
app.get('/', (req, res) => {
  res.send('API JCFP est en ligne!');
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
}); 