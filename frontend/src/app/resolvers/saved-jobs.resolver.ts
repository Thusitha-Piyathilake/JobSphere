// src/app/resolvers/saved-jobs.resolver.ts

import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import {
  Observable,
  forkJoin,
  of
} from 'rxjs';

import {
  switchMap,
  catchError,
  map          // ✅ Added map
} from 'rxjs/operators';

import { SavedJobService } from '../services/saved-job.service';
import { Job } from '../models/job.model';

@Injectable({
  providedIn: 'root'
})
export class SavedJobsResolver implements Resolve<Job[]> {

  constructor(
    private savedJobService: SavedJobService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Job[]> {

    const jobSeekerId =
      Number(localStorage.getItem('userId')) || 1;

    return this.savedJobService.getSavedJobs(jobSeekerId).pipe(

      switchMap(savedJobs => {

        if (!savedJobs || savedJobs.length === 0) {
          return of([]);
        }

        // ✅ For each saved job, fetch details, but catch 404 errors and return null
        const jobRequests = savedJobs.map(savedJob =>
          this.savedJobService.getJobDetails(savedJob.jobId).pipe(
            catchError(error => {
              // If the job is not found (404), return null instead of failing
              if (error.status === 404) {
                return of(null);
              }
              // For any other error, also return null (or log it)
              console.warn('Error fetching job details:', error);
              return of(null);
            })
          )
        );

        // ✅ Wait for all requests, then filter out null jobs
        return forkJoin(jobRequests).pipe(
          map(jobs => jobs.filter(job => job !== null))
        );

      }),

      catchError(error => {

        console.error('========================');
        console.error('Resolver Error');
        console.error('Status:', error.status);
        console.error('URL:', error.url);
        console.error('Message:', error.message);
        console.error('Body:', error.error);
        console.error(error);
        console.error('========================');

        return of([]);

      })

    );
  }
}