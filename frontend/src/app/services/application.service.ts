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
  applicantName: string;
  applicantEmail: string;
  coverLetter: string;
  cvUrl: string;
  status: string;
  appliedAt: string;
}

// ✅ NEW: extends Application and adds the full job object
export interface ApplicationWithJob extends Application {
  job: {
    id: number;
    title: string;
    company: string;
    location: string;
    jobType: string;
    salary: number;
    description: string;
    // ... add any other job fields you use
  } | null;
}

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private http = inject(HttpClient);

private apiUrl = 'https://jobsphere-production-34dc.up.railway.app/api/applications';

  apply(
    request: ApplicationRequest
  ): Observable<any> {
    return this.http.post(this.apiUrl, request);
  }

  // ✅ CHANGED: now returns ApplicationWithJob[]
  getApplicationsByJobSeeker(
    jobSeekerId: number
  ): Observable<ApplicationWithJob[]> {
    return this.http.get<ApplicationWithJob[]>(
      `${this.apiUrl}/jobseeker/${jobSeekerId}`
    );
  }

  getApplicationsForEmployer(
    employerId: number
  ): Observable<Application[]> {
    return this.http.get<Application[]>(
      `${this.apiUrl}/employer/${employerId}`
    );
  }

  acceptApplication(
    applicationId: number
  ): Observable<Application> {
    return this.http.put<Application>(
      `${this.apiUrl}/${applicationId}/accept`,
      {}
    );
  }

  getApplicationsForEmployerWithDetails(
      employerId: number
  ): Observable<ApplicationWithJob[]> {
      return this.http.get<ApplicationWithJob[]>(
          `${this.apiUrl}/employer/${employerId}`
      );
  }

  rejectApplication(
    applicationId: number
  ): Observable<Application> {
    return this.http.put<Application>(
      `${this.apiUrl}/${applicationId}/reject`,
      {}
    );
  }
}