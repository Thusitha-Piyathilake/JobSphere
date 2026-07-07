// src/app/services/employer-profile.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployerProfile } from '../models/employer-profile.model';

@Injectable({
  providedIn: 'root'
})
export class EmployerProfileService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/employer-profile';

  // ✅ This is the one we need
  getMyProfile(): Observable<EmployerProfile> {
    console.log('[EmployerProfileService] Calling /me');
    return this.http.get<EmployerProfile>(`${this.apiUrl}/me`);
  }

  getProfile(employerId: number): Observable<EmployerProfile> {
    return this.http.get<EmployerProfile>(`${this.apiUrl}/${employerId}`);
  }

  createProfile(profile: EmployerProfile): Observable<EmployerProfile> {
    return this.http.post<EmployerProfile>(this.apiUrl, profile);
  }

  updateProfile(employerId: number, profile: EmployerProfile): Observable<EmployerProfile> {
    return this.http.put<EmployerProfile>(`${this.apiUrl}/${employerId}`, profile);
  }
}