import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Salle, Cours, Professeur } from '../../models/model';
import { SalleFormComponent } from './salle-form.component';
import { CoursFormComponent } from './cours-form.component';

@Component({
  selector: 'app-salles',
  standalone: true,
  imports: [CommonModule, SalleFormComponent, CoursFormComponent],
  templateUrl: './salles.component.html'
})
export class SallesComponent implements OnInit {
  salles: Salle[] = [];
  showModal = false;
  showCoursModal = false;
  selectedSalle: Salle | null = null;

  constructor() {}

  ngOnInit(): void {
    // Exemple de données
    this.salles = [
      {
        id: 1,
        nom: 'Salle de Danse',
        adresse: '123 Rue de la Danse, 75001 Paris',
        cours: [
          {
            id: 1,
            nom: 'Danse Classique',
            professeur: { 
              id: 1, 
              nom: 'Marie', 
              prenom: 'Dupont',
              email: 'marie.dupont@example.com',
              telephone: '0123456789'
            },
            jour: 'Lundi',
            heureDebut: '18:00',
            heureFin: '19:30',
            capaciteMax: 20,
            inscrits: 0
          }
        ]
      }
    ];
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
  openCoursModal(salle: Salle) {
    this.selectedSalle = salle;
    this.showCoursModal = true;
  }

  closeCoursModal() {
    this.showCoursModal = false;
    this.selectedSalle = null;
  }
  handleSubmit(salleData: any) {

    const newSalle: Salle = {
      id: this.salles.length + 1,
      nom: salleData.nom.trim(),
      adresse: salleData.adresse.trim(),
      cours: []
    };

    this.salles = [...this.salles, newSalle];
    this.closeModal();
  }

  handleCoursSubmit(coursData: Cours) {
    if (this.selectedSalle) {
      const updatedSalles = this.salles.map(salle => {
        if (salle.id === this.selectedSalle?.id) {
          return {
            ...salle,
            cours: [...salle.cours, coursData]
          };
        }
        return salle;
      });
      this.salles = updatedSalles;
    }
    this.closeCoursModal();
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
    this.openCoursModal(salle);
  }

  editCours(cours: Cours): void {
    console.log('Modifier cours:', cours);
    // Implémenter la logique de modification
  }
} 