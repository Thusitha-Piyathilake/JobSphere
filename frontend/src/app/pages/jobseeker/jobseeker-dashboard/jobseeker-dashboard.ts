import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  Router
} from '@angular/router';

import { JobService } from '../../../services/job.service';
import { Job } from '../../../models/job.model';

@Component({
  selector: 'app-jobseeker-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './jobseeker-dashboard.html',
  styleUrl: './jobseeker-dashboard.css'
})
export class JobSeekerDashboardComponent implements OnInit {

  private jobService = inject(JobService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  jobs: Job[] = [];
  filteredJobs: Job[] = [];

  uniqueLocations: string[] = [];
  uniqueJobTypes: string[] = [];
  uniqueCategories: string[] = [];

  searchKeyword = '';
  selectedLocation = '';
  selectedJobType = '';
  selectedCategory = '';

  applicationsCount = 0;
  savedJobsCount = 0;
  interviewsCount = 0;

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {

    this.jobService.getAllJobs().subscribe({

      next: (data: Job[]) => {

        this.jobs = [...data];
        this.filteredJobs = [...data];

        this.uniqueLocations = [
          ...new Set(
            data.map(job => job.location)
          )
        ];

        this.uniqueJobTypes = [
          ...new Set(
            data.map(job => job.jobType)
          )
        ];

        this.uniqueCategories = [
          ...new Set(
            data.map(job => job.category)
          )
        ];

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error(error);
      }
    });
  }

  searchJobs(): void {

    this.filteredJobs = this.jobs.filter(job => {

      const keywordMatch =
        !this.searchKeyword ||
        job.title.toLowerCase().includes(
          this.searchKeyword.toLowerCase()
        ) ||
        job.company.toLowerCase().includes(
          this.searchKeyword.toLowerCase()
        );

      const locationMatch =
        !this.selectedLocation ||
        job.location === this.selectedLocation;

      const typeMatch =
        !this.selectedJobType ||
        job.jobType === this.selectedJobType;

      const categoryMatch =
        !this.selectedCategory ||
        job.category === this.selectedCategory;

      return (
        keywordMatch &&
        locationMatch &&
        typeMatch &&
        categoryMatch
      );
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.searchJobs();
  }

  showAllJobs(): void {
    this.selectedCategory = '';
    this.filteredJobs = [...this.jobs];
  }

  resetFilters(): void {

    this.searchKeyword = '';
    this.selectedLocation = '';
    this.selectedJobType = '';
    this.selectedCategory = '';

    this.filteredJobs = [...this.jobs];
  }

  applyJob(jobId: number): void {

    this.router.navigate([
      '/jobs',
      jobId
    ]);
  }
}