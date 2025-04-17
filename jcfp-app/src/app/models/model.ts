export interface Salle {
  id: number;
  nom: string;
  adresse: string;
  cours: Cours[];
}

export interface Cours {
  id: number;
  nom: string;
  jour: string;
  heureDebut: string;
  heureFin: string;
  professeur: Professeur;
  capaciteMax: number;
  inscrits: number;
}

export interface Professeur {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
} 

export interface Adherent {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  codePostal: string;
  ville: string;
  dateNaissance: string;
  numeroLicence: string;
  moyenPaiement: string;
}
