export interface Club {
  id: number;
  nom: string;
  adresse: string;
  salles: Salle[];
}

export interface Salle {
  id: number;
  nom: string;
  capacite: number;
  cours: Cours[];
}

export interface Cours {
  id: number;
  nom: string;
  jour: string;
  heureDebut: string;
  heureFin: string;
  professeur: Professeur;
  niveau: string;
  capaciteMax: number;
  inscrits: number;
}

export interface Professeur {
  id: number;
  nom: string;
  prenom: string;
  specialite: string;
  email: string;
  telephone: string;
} 