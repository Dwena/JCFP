import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormComponent } from '../form/form.component';

interface Adherent {
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

@Component({
  selector: 'app-adherents-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormComponent],
  templateUrl: './adherents-list.component.html'
})
export class AdherentsListComponent implements OnInit {
  showModal = false;
  adherents: Adherent[] = [
    {
      nom: 'Dupont',
      prenom: 'Jean',
      email: 'jean.dupont@example.com',
      telephone: '0123456789',
      adresse: '123 rue de la Paix',
      codePostal: '75001',
      ville: 'Paris',
      dateNaissance: '1980-01-15',
      numeroLicence: '123456',
      moyenPaiement: 'carte'
    },
    {
      nom: 'Martin',
      prenom: 'Sophie',
      email: 'sophie.martin@example.com',
      telephone: '0987654321',
      adresse: '45 avenue des Champs-Élysées',
      codePostal: '75008',
      ville: 'Paris',
      dateNaissance: '1992-05-22',
      numeroLicence: '789012',
      moyenPaiement: 'cheque'
    },
    {
      nom: 'Bernard',
      prenom: 'Pierre',
      email: 'pierre.bernard@example.com',
      telephone: '0678901234',
      adresse: '8 rue de la Liberté',
      codePostal: '69001',
      ville: 'Lyon',
      dateNaissance: '1975-11-30',
      numeroLicence: '345678',
      moyenPaiement: 'bon_caf'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Ici, vous pourrez charger les données depuis votre API
  }

  editAdherent(adherent: Adherent): void {
    console.log('Modifier adhérent:', adherent);
    // Implémenter la logique de modification
  }

  deleteAdherent(adherent: Adherent): void {
    console.log('Supprimer adhérent:', adherent);
    // Implémenter la logique de suppression
  }

  onAdherentSubmit(adherent: any) {
    console.log('Nouvel adhérent:', adherent);
    // Ici, vous pouvez ajouter la logique pour sauvegarder l'adhérent
  }
} 