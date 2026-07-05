// src/app/services/application.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ApplicationRequest {
  jobId: number;
  jobSeekerId: number;
  applicantName: string;
  applicantEmail: string;
  coverLetter: string;
  cvUrl: string;
  emailCopy: boolean;
}

export interface Application {
  id: number;
  jobId: number;
  jobSeekerId: number;
  status: string;
  appliedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/applications';

  apply(request: ApplicationRequest): Observable<any> {
    return this.http.post(this.apiUrl, request);
  }

  // 👇 This is the new method
  getApplicationsByJobSeeker(jobSeekerId: number): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/jobseeker/${jobSeekerId}`);
  }
}