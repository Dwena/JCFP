import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-8">Bienvenue au JCFP</h1>
          <p class="text-xl text-gray-600 mb-8">Gestion des adhérents et des salles</p>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent {} 