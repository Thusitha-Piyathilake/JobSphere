// src/app/pages/employer/applicants/applicants.ts

import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationService, ApplicationWithJob } from '../../../services/application.service';

// Explicit type for filter counts
interface FilterCounts {
  ALL: number;
  PENDING: number;
  ACCEPTED: number;
  REJECTED: number;
}

@Component({
  selector: 'app-applicants',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './applicants.html',
  styleUrl: './applicants.css',
})
export class Applicants implements OnInit, OnDestroy {

  private applicationService = inject(ApplicationService);
  private cdr = inject(ChangeDetectorRef);

  applications: ApplicationWithJob[] = [];
  loading = true;
  selectedFilter: 'ALL' | 'PENDING' | 'ACCEPTED' | 'REJECTED' = 'ALL';

  private isDestroyed = false;
  private loadTimer: any = null;
  private reloadTimer: any = null;

  ngOnInit(): void {
    console.log('[Applicants] ngOnInit');
    this.startLoading();
  }

  ngOnDestroy(): void {
    this.isDestroyed = true;
    if (this.loadTimer) clearTimeout(this.loadTimer);
    if (this.reloadTimer) clearTimeout(this.reloadTimer);
  }

  private startLoading(): void {
    this.loadTimer = setTimeout(() => this.attemptLoad(), 100);
  }

  private attemptLoad(): void {
    if (this.isDestroyed) return;

    const employerId = this.getEmployerId();
    console.log('[Applicants] attemptLoad - employerId:', employerId);

    if (!employerId) {
      this.loadTimer = setTimeout(() => this.attemptLoad(), 300);
      return;
    }

    this.applicationService.getApplicationsForEmployerWithDetails(employerId).subscribe({
      next: (data) => {
        if (this.isDestroyed) return;
        this.applications = (data || []).sort((a, b) => {
          const dateA = new Date(a.appliedAt).getTime();
          const dateB = new Date(b.appliedAt).getTime();
          return dateB - dateA;
        });
        this.loading = false;
        this.cdr.detectChanges();
        console.log('[Applicants] Loaded', this.applications.length, 'applications');
      },
      error: (err) => {
        console.error('[Applicants] API error:', err);
        this.loadTimer = setTimeout(() => this.attemptLoad(), 500);
      }
    });

    if (this.reloadTimer) clearTimeout(this.reloadTimer);
    this.reloadTimer = setTimeout(() => {
      if (this.loading && !this.isDestroyed) {
        console.warn('[Applicants] Timeout – reloading page...');
        window.location.reload();
      }
    }, 3000);
  }

  private getEmployerId(): number {
    const id = localStorage.getItem('userId') ||
               localStorage.getItem('employerId') ||
               localStorage.getItem('id');
    return Number(id) || 0;
  }

  refresh(): void {
    this.loading = true;
    this.applications = [];
    this.cdr.detectChanges();
    if (this.reloadTimer) clearTimeout(this.reloadTimer);
    this.startLoading();
  }

  // ---------- Filter logic ----------
  get filteredApplications(): ApplicationWithJob[] {
    if (this.selectedFilter === 'ALL') return this.applications;
    return this.applications.filter(app => app.status === this.selectedFilter);
  }

  // ✅ FIXED: explicit return type with named properties
  get filterCounts(): FilterCounts {
    const total = this.applications.length;
    const pending = this.applications.filter(a => a.status === 'PENDING').length;
    const accepted = this.applications.filter(a => a.status === 'ACCEPTED').length;
    const rejected = this.applications.filter(a => a.status === 'REJECTED').length;
    return { ALL: total, PENDING: pending, ACCEPTED: accepted, REJECTED: rejected };
  }

  setFilter(filter: 'ALL' | 'PENDING' | 'ACCEPTED' | 'REJECTED'): void {
    this.selectedFilter = filter;
    this.cdr.detectChanges();
  }

  // ---------- Accept / Reject (unchanged) ----------
  acceptApplication(applicationId: number): void {
    this.applicationService.acceptApplication(applicationId).subscribe({
      next: (updated) => {
        const index = this.applications.findIndex(a => a.id === updated.id);
        if (index !== -1) {
          this.applications[index] = { ...this.applications[index], status: updated.status } as ApplicationWithJob;
          this.cdr.detectChanges();
        }
      },
      error: (err) => console.error('[Applicants] Accept error:', err)
    });
  }

  rejectApplication(applicationId: number): void {
    this.applicationService.rejectApplication(applicationId).subscribe({
      next: (updated) => {
        const index = this.applications.findIndex(a => a.id === updated.id);
        if (index !== -1) {
          this.applications[index] = { ...this.applications[index], status: updated.status } as ApplicationWithJob;
          this.cdr.detectChanges();
        }
      },
      error: (err) => console.error('[Applicants] Reject error:', err)
    });
  }
}