// src/app/pages/jobseeker/applications/applications.ts

import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApplicationService, ApplicationWithJob } from '../../../services/application.service';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './applications.html',
  styleUrl: './applications.css',
})
export class Applications implements OnInit, OnDestroy {

  private applicationService = inject(ApplicationService);
  private cdr = inject(ChangeDetectorRef);
  readonly router = inject(Router);

  applications: ApplicationWithJob[] = [];
  loading = true;

  private isDestroyed = false;
  private retryTimer: any = null;

  ngOnInit(): void {
    this.loadApplications();
  }

  ngOnDestroy(): void {
    this.isDestroyed = true;
    if (this.retryTimer) {
      clearTimeout(this.retryTimer);
      this.retryTimer = null;
    }
  }

  loadApplications(): void {
    if (this.retryTimer) {
      clearTimeout(this.retryTimer);
      this.retryTimer = null;
    }

    const jobSeekerId = this.getJobSeekerId();

    if (!jobSeekerId) {
      console.log('[Applications] Waiting for userId...');
      this.retryTimer = setTimeout(() => this.loadApplications(), 300);
      return;
    }

    this.fetchData(jobSeekerId);
  }

  private getJobSeekerId(): number {
    const id =
      localStorage.getItem('userId') ||
      localStorage.getItem('jobSeekerId') ||
      localStorage.getItem('id');
    return Number(id) || 0;
  }

  private fetchData(jobSeekerId: number): void {
    if (this.isDestroyed) return;

    // ✅ Correct method name: getApplicationsByJobSeeker
    this.applicationService
      .getApplicationsByJobSeeker(jobSeekerId)
      .subscribe({
        next: (data: ApplicationWithJob[]) => {
          if (this.isDestroyed) return;

          this.applications = (data || []).sort((a: ApplicationWithJob, b: ApplicationWithJob) => {
            const dateA = new Date(a.appliedAt).getTime();
            const dateB = new Date(b.appliedAt).getTime();
            return dateB - dateA;
          });

          this.loading = false;
          this.cdr.detectChanges();

          console.log(
            '[Applications] Loaded',
            this.applications.length,
            'applications'
          );
        },
        error: (err: any) => {
          if (this.isDestroyed) return;
          console.error('[Applications] API error:', err);
          this.retryTimer = setTimeout(() => this.loadApplications(), 1000);
        }
      });
  }

  refresh(): void {
    this.loading = true;
    this.loadApplications();
  }

  // These methods are not used by job seekers but kept for completeness.
  acceptApplication(applicationId: number): void {
    // Not used – you can remove this method if you want.
  }

  rejectApplication(applicationId: number): void {
    // Not used.
  }

  getStatusClass(status: string): string {
    switch ((status || '').toUpperCase()) {
      case 'PENDING':   return 'pending';
      case 'ACCEPTED':  return 'accepted';
      case 'REJECTED':  return 'rejected';
      default:          return '';
    }
  }

  viewJob(jobId: number): void {
    this.router.navigate(['/jobs', jobId]);
  }
}