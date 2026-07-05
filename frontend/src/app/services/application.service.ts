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

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private http = inject(HttpClient);

  private apiUrl =
    'http://localhost:8080/api/applications';

  apply(
    request: ApplicationRequest
  ): Observable<any> {

    return this.http.post(
      this.apiUrl,
      request
    );
  }
}