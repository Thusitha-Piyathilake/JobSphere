import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AdminJob {

  id: number;

  title: string;

  company: string;

  location: string;

  category: string;

  salary: number;

  jobType: string;

  description: string;

  createdAt: string;

  employerId: number;

  latitude: number | null;

  longitude: number | null;

}

@Injectable({
  providedIn: 'root'
})
export class AdminJobService {

  private http = inject(HttpClient);

private apiUrl = 'https://jobsphere-production-34dc.up.railway.app/api/admin/jobs';

  getAllJobs(): Observable<AdminJob[]> {

    return this.http.get<AdminJob[]>(this.apiUrl);

  }

  getJob(id: number): Observable<AdminJob> {

    return this.http.get<AdminJob>(`${this.apiUrl}/${id}`);

  }

  deleteJob(id: number): Observable<string> {

    return this.http.delete(
      `${this.apiUrl}/${id}`,
      { responseType: 'text' }
    );

  }

}