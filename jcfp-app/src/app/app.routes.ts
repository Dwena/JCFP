import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdherentsListComponent } from './components/adherents-list/adherents-list.component';
import { SallesComponent } from './components/clubs/clubs.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'adherents', component: AdherentsListComponent },
  { path: 'salles', component: SallesComponent }
  // ... existing code ...
];
