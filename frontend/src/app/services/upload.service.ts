// src/app/services/upload.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private http = inject(HttpClient);

private apiUrl = 'https://jobsphere-production-34dc.up.railway.app/api/upload';
  // ============================
  // Upload Job Seeker CV
  // ============================

  uploadCv(file: File): Observable<any> {

    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(
      `${this.apiUrl}/cv`,
      formData
    );
  }

  // ============================
  // Upload Company Logo
  // ============================

  uploadCompanyLogo(file: File): Observable<any> {

    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(
      `${this.apiUrl}/company-logo`,
      formData
    );
  }

}