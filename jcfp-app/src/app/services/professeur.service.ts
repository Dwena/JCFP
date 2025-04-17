import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfesseurService {
  private apiUrl = `${environment.apiUrl}/professeurs`;

  constructor(private http: HttpClient) { }

  // Récupérer tous les professeurs
  getProfesseurs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Récupérer un professeur par son ID
  getProfesseurById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Créer un nouveau professeur
  createProfesseur(professeur: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, professeur);
  }

  // Mettre à jour un professeur
  updateProfesseur(id: number, professeur: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, professeur);
  }

  // Supprimer un professeur
  deleteProfesseur(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Récupérer les cours d'un professeur
  getCoursProfesseur(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/cours`);
  }
} 