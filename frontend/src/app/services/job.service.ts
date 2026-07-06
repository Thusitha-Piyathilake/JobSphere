// src/app/services/job.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../models/job.model';
import { CreateJobRequest } from '../models/create-job-request.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/jobs';

  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.apiUrl);
  }

  getJobById(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}/${id}`);
  }

  searchJobs(title: string, location: string): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/search/${title}/${location}`);
  }

  createJob(job: CreateJobRequest): Observable<Job> {
    return this.http.post<Job>(this.apiUrl, job);
  }

  // ✅ NEW: Update job
  updateJob(jobId: number, job: Partial<CreateJobRequest>): Observable<Job> {
    return this.http.put<Job>(`${this.apiUrl}/${jobId}`, job);
  }

  getJobsByEmployer(employerId: number): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/employer/${employerId}`);
  }

  deleteJob(jobId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${jobId}`, { responseType: 'text' });
  }
}