import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  adherentForm: FormGroup;
  moyensPaiement = [
    { value: 'carte', label: 'Carte Bancaire' },
    { value: 'cheque', label: 'Chèque' },
    { value: 'especes', label: 'Espèces' },
    { value: 'bon_caf', label: 'Bon CAF' }
  ];

  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<any>();

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
      numeroLicence: ['', Validators.required],
      moyenPaiement: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0];
    this.adherentForm.patchValue({
      dateAdhesion: today
    });
  }

  closeModal() {
    this.close.emit();
  }

  onSubmit() {
    if (this.adherentForm.valid) {
      this.submit.emit(this.adherentForm.value);
      this.closeModal();
    } else {
      Object.keys(this.adherentForm.controls).forEach(key => {
        this.adherentForm.get(key)?.markAsTouched();
      });
    }
  }
} 