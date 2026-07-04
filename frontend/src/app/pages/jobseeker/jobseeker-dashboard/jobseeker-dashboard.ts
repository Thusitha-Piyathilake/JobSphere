import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../../../services/job.service';
import { Job } from '../../../models/job.model';

@Component({
  selector: 'app-jobseeker-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jobseeker-dashboard.html',
  styleUrl: './jobseeker-dashboard.css'
})
export class JobSeekerDashboardComponent implements OnInit {

  private jobService = inject(JobService);

  jobs: Job[] = [];

  applicationsCount = 0;
  savedJobsCount = 0;
  interviewsCount = 0;

  ngOnInit(): void {
    console.log('Dashboard initialized');
    this.loadJobs();
  }

  loadJobs(): void {
    console.log('Calling getAllJobs()...');

    this.jobService.getAllJobs().subscribe({
      next: (data: Job[]) => {
        console.log('========== JOBS RECEIVED ==========');
        console.log(data);
        console.log('Jobs count:', data.length);

        this.jobs = [...data];

        console.log('Jobs stored in component:', this.jobs);
        console.log('Stored jobs count:', this.jobs.length);
      },

      error: (error) => {
        console.error('========== API ERROR ==========');
        console.error(error);
      },

      complete: () => {
        console.log('========== REQUEST FINISHED ==========');
      }
    });
  }
}