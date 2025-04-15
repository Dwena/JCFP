import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Salle, Cours, Professeur } from '../../models/club.model';

@Component({
  selector: 'app-salles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clubs.component.html'
})
export class SallesComponent implements OnInit {
  salles: Salle[] = [
    {
      id: 1,
      nom: 'Salle A',
      capacite: 30,
      cours: [
        {
          id: 1,
          nom: 'Yoga Débutant',
          jour: 'Lundi',
          heureDebut: '09:00',
          heureFin: '10:30',
          professeur: {
            id: 1,
            nom: 'Dupont',
            prenom: 'Marie',
            specialite: 'Yoga',
            email: 'marie.dupont@example.com',
            telephone: '0123456789'
          },
          niveau: 'Débutant',
          capaciteMax: 20,
          inscrits: 15
        }
      ]
    },
    {
      id: 2,
      nom: 'Salle B',
      capacite: 20,
      cours: [
        {
          id: 2,
          nom: 'Pilates Intermédiaire',
          jour: 'Mardi',
          heureDebut: '14:00',
          heureFin: '15:30',
          professeur: {
            id: 2,
            nom: 'Martin',
            prenom: 'Sophie',
            specialite: 'Pilates',
            email: 'sophie.martin@example.com',
            telephone: '0987654321'
          },
          niveau: 'Intermédiaire',
          capaciteMax: 15,
          inscrits: 12
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Ici, vous pourrez charger les données depuis votre API
  }

  addSalle(): void {
    console.log('Ajouter une salle');
    // Implémenter la logique d'ajout
  }

  editSalle(salle: Salle): void {
    console.log('Modifier salle:', salle);
    // Implémenter la logique de modification
  }

  deleteSalle(salle: Salle): void {
    console.log('Supprimer salle:', salle);
    // Implémenter la logique de suppression
  }

  addCours(salle: Salle): void {
    console.log('Ajouter un cours à la salle:', salle);
    // Implémenter la logique d'ajout
  }

  editCours(cours: Cours): void {
    console.log('Modifier cours:', cours);
    // Implémenter la logique de modification
  }
} 