import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursService {
  private apiUrl = `${environment.apiUrl}/cours`;

  constructor(private http: HttpClient) { }

  // Récupérer tous les cours
  getCours(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Récupérer un cours par son ID
  getCoursById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Créer un nouveau cours
  createCours(cours: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, cours);
  }

  // Mettre à jour un cours
  updateCours(id: number, cours: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, cours);
  }

  // Supprimer un cours
  deleteCours(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Récupérer les adhérents inscrits à un cours
  getAdherentsCours(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/adherents`);
  }
} 