// src/app/resolvers/saved-jobs.resolver.ts
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

import { SavedJobService } from '../services/saved-job.service';
import { JobService } from '../services/job.service';
import { Job } from '../models/job.model';

@Injectable({
  providedIn: 'root'
})
export class SavedJobsResolver implements Resolve<Job[]> {

  constructor(
    private savedJobService: SavedJobService,
    private jobService: JobService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Job[]> {

    const jobSeekerId = Number(localStorage.getItem('userId')) || 1;

    // First fetch saved job references
    return this.savedJobService.getSavedJobs(jobSeekerId).pipe(
      switchMap(savedJobs => {
        if (!savedJobs || savedJobs.length === 0) {
          return of([]);   // No saved jobs
        }

        // Fetch details for each saved job
        const jobRequests = savedJobs.map(savedJob =>
          this.jobService.getJobById(savedJob.jobId)
        );
        return forkJoin(jobRequests);
      }),
      catchError(error => {
        console.error('Resolver: Failed to load saved jobs', error);
        // Return empty array so the component still renders (empty state)
        return of([]);
      })
    );
  }
}