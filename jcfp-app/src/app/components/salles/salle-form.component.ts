import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-salle-form-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './salle-form.component.html'
})
export class SalleFormComponent implements OnInit {
  salleForm: FormGroup;

  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.salleForm = this.fb.group({
      nom: ['', Validators.required],
      adresse: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  closeModal() {
    this.close.emit();
  }

  onSubmit() {
    if (this.salleForm.valid) {
      this.submit.emit(this.salleForm.value);
      this.closeModal();
    } else {
      Object.keys(this.salleForm.controls).forEach(key => {
        this.salleForm.get(key)?.markAsTouched();
      });
    }
  }
} 