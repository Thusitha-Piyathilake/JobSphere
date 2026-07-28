// src/app/pages/jobseeker/saved-jobs/saved-jobs.ts

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { SavedJobService } from '../../../services/saved-job.service';
import { Job } from '../../../models/job.model';

@Component({
  selector: 'app-saved-jobs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './saved-jobs.html',
  styleUrl: './saved-jobs.css'
})
export class SavedJobs implements OnInit {

  private savedJobService = inject(SavedJobService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  savedJobs: Job[] = [];

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.savedJobs = data['savedJobs'];
    });
  }

  // ---------- helpers for the template ----------
  closingSoonCount(): number {
    // placeholder: count jobs with a "closing soon" flag (e.g., within 7 days)
    // You can replace with real logic if you have a deadline field.
    return this.savedJobs.filter((_, i) => i % 2 === 0).length; // demo: half of them
  }

  getSavedDays(job: Job): string {
    // placeholder: use a saved date if available, else random days
    // In a real app, store savedAt in the saved-job relation.
    const index = this.savedJobs.indexOf(job);
    const days = (index + 1) * 2; // 2,4,6... for demo
    return String(days);
  }

  // ---------- original methods (unchanged) ----------
  viewJob(jobId: number): void {
    this.router.navigate(['/jobs', jobId]);
  }

  removeSavedJob(jobId: number): void {
    const jobSeekerId = Number(localStorage.getItem('userId')) || 1;
    this.savedJobService.removeSavedJob(jobSeekerId, jobId).subscribe({
      next: () => {
        this.savedJobs = this.savedJobs.filter(job => job.id !== jobId);
        alert('Job removed from saved jobs');
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  // optional: clear all
  clearAll(): void {
    if (confirm('Remove all saved jobs?')) {
      this.savedJobs.forEach(job => this.removeSavedJob(job.id));
    }
  }
}