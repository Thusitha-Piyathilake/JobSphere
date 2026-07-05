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
  private route = inject(ActivatedRoute);   // added to read resolved data

  savedJobs: Job[] = [];

  ngOnInit(): void {
    // Data is now provided by the resolver before the component loads
    this.route.data.subscribe(data => {
      this.savedJobs = data['savedJobs'];
    });
  }

  // ═══════════════════════════════════════════════════════════════
  //   The two methods below are unchanged – your logic is intact
  // ═══════════════════════════════════════════════════════════════

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
}