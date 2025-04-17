import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cours, Professeur } from '../../models/model';

@Component({
  selector: 'app-cours-form-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cours-form.component.html'
})
export class CoursFormComponent {
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<Cours>();

  coursForm: FormGroup;
  jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  niveaux = ['Débutant', 'Intermédiaire', 'Avancé'];

  constructor(private fb: FormBuilder) {
    this.coursForm = this.fb.group({
      nom: ['', Validators.required],
      jour: ['', Validators.required],
      heureDebut: ['', Validators.required],
      heureFin: ['', Validators.required],
      capaciteMax: [10, [Validators.required, Validators.min(1)]],
      professeur: this.fb.group({
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        telephone: ['', Validators.required]
      })
    });
  }

  closeModal(): void {
    this.close.emit();
  }

  onSubmit(): void {
    if (this.coursForm.valid) {
      const formData = this.coursForm.value;
      const cours: Cours = {
        id: Date.now(),
        nom: formData.nom,
        jour: formData.jour,
        heureDebut: formData.heureDebut,
        heureFin: formData.heureFin,
        capaciteMax: formData.capaciteMax,
        professeur: formData.professeur as Professeur,
        inscrits: 0
      };
      this.submit.emit(cours);
      this.coursForm.reset();
      this.closeModal();
    } else {
      Object.keys(this.coursForm.controls).forEach(key => {
        const control = this.coursForm.get(key);
        if (control instanceof FormGroup) {
          Object.keys(control.controls).forEach(subKey => {
            control.get(subKey)?.markAsTouched();
          });
        } else {
          control?.markAsTouched();
        }
      });
    }
  }
} 