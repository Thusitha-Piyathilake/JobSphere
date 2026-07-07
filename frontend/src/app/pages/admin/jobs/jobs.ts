import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  AdminJob,
  AdminJobService
} from '../../../services/admin-job.service';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './jobs.html',
  styleUrl: './jobs.css'
})
export class Jobs implements OnInit {

  jobs: AdminJob[] = [];

  search = '';

  selectedType = 'ALL';

  selectedJob: AdminJob | null = null;

  showModal = false;

  // Delete Modal
  showDeleteModal = false;

  jobToDelete: AdminJob | null = null;

  constructor(
    private adminJobService: AdminJobService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadJobs();

  }

  loadJobs(): void {

    this.adminJobService.getAllJobs().subscribe({

      next: (response) => {

        this.jobs = [...response];

        this.cdr.detectChanges();

      },

      error: err => console.error(err)

    });

  }

  get filteredJobs(): AdminJob[] {

    return this.jobs.filter(job => {

      const matchesSearch =

        job.title.toLowerCase().includes(this.search.toLowerCase()) ||

        job.company.toLowerCase().includes(this.search.toLowerCase()) ||

        job.location.toLowerCase().includes(this.search.toLowerCase());

      const matchesType =

        this.selectedType === 'ALL' ||

        job.jobType === this.selectedType;

      return matchesSearch && matchesType;

    });

  }

  view(job: AdminJob): void {

    this.selectedJob = job;

    this.showModal = true;

  }

  closeModal(): void {

    this.showModal = false;

    this.selectedJob = null;

  }

  delete(job: AdminJob): void {

    this.jobToDelete = job;

    this.showDeleteModal = true;

  }

  cancelDelete(): void {

    this.showDeleteModal = false;

    this.jobToDelete = null;

  }

  confirmDelete(): void {

  if (!this.jobToDelete) {
    return;
  }

  const jobId = this.jobToDelete.id;

  // Close modal FIRST
  this.showDeleteModal = false;
  this.jobToDelete = null;

  this.adminJobService.deleteJob(jobId).subscribe({

    next: () => {

      // Remove from UI immediately
      this.jobs = this.jobs.filter(job => job.id !== jobId);

      this.cdr.detectChanges();

    },

    error: err => {

      console.error(err);

      // Optional: reload if delete fails
      this.loadJobs();

    }

  });

}

}