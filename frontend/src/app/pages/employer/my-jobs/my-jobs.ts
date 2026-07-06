// src/app/pages/employer/my-jobs/my-jobs.ts
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { JobService } from '../../../services/job.service';
import { AuthService } from '../../../services/auth.service';
import { Job } from '../../../models/job.model';

@Component({
  selector: 'app-my-jobs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-jobs.html',
  styleUrl: './my-jobs.css',
})
export class MyJobs implements OnInit {
  private jobService = inject(JobService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);  // 👈 added

  jobs: Job[] = [];
  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    let employerId = this.authService.getUserId();
    if (!employerId) {
      employerId = Number(localStorage.getItem('userId')) || 0;
    }
    console.log('[MyJobs] Employer ID:', employerId);

    if (!employerId) {
      this.loading = false;
      this.errorMessage = 'You are not logged in as an employer.';
      this.cdr.detectChanges();
      return;
    }

    this.jobService.getJobsByEmployer(employerId).subscribe({
      next: (jobs) => {
        console.log('[MyJobs] Jobs received:', jobs);
        this.jobs = jobs || [];
        this.loading = false;
        this.cdr.detectChanges();   // 👈 force update
        console.log('[MyJobs] loading set to false, jobs length:', this.jobs.length);
      },
      error: (error) => {
        console.error('[MyJobs] API error:', error);
        this.errorMessage = 'Failed to load jobs. Please try again.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  editJob(jobId: number): void {
    this.router.navigate(['/employer/edit-job', jobId]);
  }

  deleteJob(id: number): void {
    if (!confirm('Are you sure you want to delete this job?')) return;
    this.jobService.deleteJob(id).subscribe({
      next: () => {
        this.jobs = this.jobs.filter(job => job.id !== id);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(error);
        alert('Failed to delete job');
      }
    });
  }
}