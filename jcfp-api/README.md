# API Backend JCFP

Cette API backend fournit un service pour gérer les salles, les cours et les adhérents d'un club de loisirs.

## Technologies utilisées

- Node.js
- Express
- MongoDB avec Mongoose
- Dotenv pour les variables d'environnement
- CORS pour la gestion des requêtes cross-origin

## Installation

1. Clonez ce dépôt
2. Installez les dépendances : `npm install`
3. Configurez le fichier `.env` avec vos variables d'environnement
4. Démarrez le serveur :
   - En développement : `npm run dev`
   - En production : `npm start`

## Structure du projet

- `models/` : Définitions des modèles Mongoose
- `controllers/` : Logique de contrôle
- `routes/` : Définitions des routes API
- `server.js` : Point d'entrée de l'application

## API Endpoints

### Salles

- `GET /api/salles` - Récupérer toutes les salles
- `GET /api/salles/:id` - Récupérer une salle par son ID
- `POST /api/salles` - Créer une nouvelle salle
- `PUT /api/salles/:id` - Mettre à jour une salle
- `DELETE /api/salles/:id` - Supprimer une salle
- `POST /api/salles/:id/cours` - Ajouter un cours à une salle

### Adhérents

- `GET /api/adherents` - Récupérer tous les adhérents
- `GET /api/adherents/:id` - Récupérer un adhérent par son ID
- `POST /api/adherents` - Créer un nouvel adhérent
- `PUT /api/adherents/:id` - Mettre à jour un adhérent
- `DELETE /api/adherents/:id` - Supprimer un adhérent

## Modèles de données

### Salle
```json
{
  "nom": "String",
  "adresse": "String",
  "cours": ["Reference to Cours"]
}
```

### Cours
```json
{
  "nom": "String",
  "jour": "String (enum)",
  "heureDebut": "String",
  "heureFin": "String",
  "niveau": "String (enum)",
  "capaciteMax": "Number",
  "inscrits": "Number",
  "professeur": "Reference to Professeur"
}
```

### Professeur
```json
{
  "nom": "String",
  "prenom": "String",
  "email": "String",
  "telephone": "String"
}
```

### Adhérent
```json
{
  "nom": "String",
  "prenom": "String",
  "dateNaissance": "Date",
  "adresse": "String",
  "telephone": "String",
  "email": "String",
  "dateInscription": "Date",
  "paiement": "String (enum)",
  "montant": "Number",
  "cours": ["Reference to Cours"]
}
``` 