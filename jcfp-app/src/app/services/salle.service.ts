import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Salle, Cours } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class SalleService {
  private apiUrl = 'http://localhost:5000/api/salles';

  constructor(private http: HttpClient) { }

  // Récupérer toutes les salles
  getSalles(): Observable<Salle[]> {
    return this.http.get<Salle[]>(this.apiUrl);
  }

  // Récupérer une salle par son ID
  getSalleById(id: number): Observable<Salle> {
    return this.http.get<Salle>(`${this.apiUrl}/${id}`);
  }

  // Créer une nouvelle salle
  createSalle(salle: Salle): Observable<Salle> {
    return this.http.post<Salle>(this.apiUrl, salle);
  }

  // Mettre à jour une salle
  updateSalle(id: number, salle: Salle): Observable<Salle> {
    return this.http.put<Salle>(`${this.apiUrl}/${id}`, salle);
  }

  // Supprimer une salle
  deleteSalle(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Ajouter un cours à une salle
  addCoursSalle(salleId: number, cours: Cours): Observable<Cours> {
    return this.http.post<Cours>(`${this.apiUrl}/${salleId}/cours`, cours);
  }
} 