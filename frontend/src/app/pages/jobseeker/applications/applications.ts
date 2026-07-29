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
  styleUrls: ['./applications.css'],
})
export class Applications implements OnInit, OnDestroy {

  private applicationService = inject(ApplicationService);
  private cdr = inject(ChangeDetectorRef);
  readonly router = inject(Router);

  applications: ApplicationWithJob[] = [];
  loading = true;

  // Filter state
  selectedFilter: 'ALL' | 'PENDING' | 'ACCEPTED' | 'REJECTED' = 'ALL';

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

  // ---------- Filter logic ----------
  setFilter(filter: 'ALL' | 'PENDING' | 'ACCEPTED' | 'REJECTED'): void {
    this.selectedFilter = filter;
  }

  get filteredApplications(): ApplicationWithJob[] {
    if (this.selectedFilter === 'ALL') {
      return this.applications;
    }
    return this.applications.filter(app => app.status === this.selectedFilter);
  }

  // ---------- Stats ----------
  get totalApplications(): number {
    return this.applications.length;
  }

  get pendingCount(): number {
    return this.applications.filter(a => a.status === 'PENDING').length;
  }

  get acceptedCount(): number {
    return this.applications.filter(a => a.status === 'ACCEPTED').length;
  }

  get rejectedCount(): number {
    return this.applications.filter(a => a.status === 'REJECTED').length;
  }

  // ---------- Helper for status class ----------
  getStatusClass(status: string): string {
    switch ((status || '').toUpperCase()) {
      case 'PENDING':   return 'pending';
      case 'ACCEPTED':  return 'accepted';
      case 'REJECTED':  return 'rejected';
      default:          return '';
    }
  }

  // ---------- Navigate to job ----------
  viewJob(jobId: number): void {
    if (!jobId) return;
    this.router.navigate(['/jobs', jobId]);
  }
}