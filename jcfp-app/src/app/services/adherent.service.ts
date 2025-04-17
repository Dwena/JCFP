import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdherentService {
  private apiUrl = `${environment.apiUrl}/adherents`;

  constructor(private http: HttpClient) { }

  // Récupérer tous les adhérents
  getAdherents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Récupérer un adhérent par son ID
  getAdherentById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Créer un nouvel adhérent
  createAdherent(adherent: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, adherent);
  }

  // Mettre à jour un adhérent
  updateAdherent(id: number, adherent: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, adherent);
  }

  // Supprimer un adhérent
  deleteAdherent(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
} 