// src/app/resolvers/applicants.resolver.ts

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, retryWhen, scan } from 'rxjs/operators';
import { ApplicationService, ApplicationWithJob } from '../services/application.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicantsResolver implements Resolve<ApplicationWithJob[]> {

  constructor(private applicationService: ApplicationService) {}

  resolve(): Observable<ApplicationWithJob[]> {
    const employerId = Number(localStorage.getItem('userId')) || 0;

    if (!employerId) {
      // If no ID, retry up to 5 times with 300ms delay
      return this.retryWithDelay(() => {
        const id = Number(localStorage.getItem('userId')) || 0;
        if (!id) throw new Error('No employer ID');
        return this.applicationService.getApplicationsForEmployerWithDetails(id);
      }, 5, 300);
    }

    return this.applicationService.getApplicationsForEmployerWithDetails(employerId).pipe(
      catchError((err) => {
        console.error('[ApplicantsResolver] Error fetching data:', err);
        return of([]); // Return empty array on error
      })
    );
  }

  // Helper to retry an observable with delay
  private retryWithDelay<T>(fn: () => Observable<T>, maxRetries: number, delayMs: number): Observable<T> {
    let attempts = 0;
    return new Observable<T>(subscriber => {
      const attempt = () => {
        attempts++;
        fn().subscribe({
          next: (val) => {
            subscriber.next(val);
            subscriber.complete();
          },
          error: (err) => {
            if (attempts < maxRetries) {
              console.log(`[ApplicantsResolver] Retry ${attempts}/${maxRetries} after ${delayMs}ms`);
              setTimeout(attempt, delayMs);
            } else {
              subscriber.error(err);
            }
          }
        });
      };
      attempt();
    });
  }
}