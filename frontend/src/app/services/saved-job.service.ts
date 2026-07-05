import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SavedJobService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/saved-jobs';

  saveJob(
    jobSeekerId: number,
    jobId: number
  ): Observable<string> {

    return this.http.post(
      this.apiUrl,
      {
        jobSeekerId,
        jobId
      },
      {
        responseType: 'text'
      }
    );
  }

  getSavedJobs(
    jobSeekerId: number
  ): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.apiUrl}/${jobSeekerId}`
    );
  }

  removeSavedJob(
    jobSeekerId: number,
    jobId: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${jobSeekerId}/${jobId}`
    );
  }

  getJobDetails(
    jobId: number
  ): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}/job/${jobId}`
    );
  }
}