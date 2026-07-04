import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../models/job.model';

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
    return this.http.get<Job>(
      `${this.apiUrl}/${id}`
    );
  }

  searchJobs(
    title: string,
    location: string
  ): Observable<Job[]> {

    return this.http.get<Job[]>(
      `${this.apiUrl}/search/${title}/${location}`
    );
  }
}