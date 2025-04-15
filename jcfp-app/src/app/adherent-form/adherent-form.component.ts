import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adherent-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './adherent-form.component.html',
  styleUrls: ['./adherent-form.component.css']
})
export class AdherentFormComponent {
  adherentForm: FormGroup;
  moyensPaiement = [
    { value: 'cheque', label: 'Chèque' },
    { value: 'espece', label: 'Espèces' },
    { value: 'bon_caf', label: 'Bon CAF' },
    { value: 'autre', label: 'Autre' }
  ];

  constructor(private fb: FormBuilder) {
    this.adherentForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      adresse: ['', Validators.required],
      codePostal: ['', Validators.required],
      ville: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      dateAdhesion: ['', Validators.required],
      numeroLicence: ['', Validators.required],
      moyenPaiement: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.adherentForm.valid) {
      console.log(this.adherentForm.value);
      // Ici, vous pourrez ajouter la logique pour envoyer les données au backend
    }
  }
} 