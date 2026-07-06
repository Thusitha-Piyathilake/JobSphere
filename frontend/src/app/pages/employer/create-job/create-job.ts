// src/app/pages/employer/create-job/create-job.ts
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { JobService } from '../../../services/job.service';
import { AuthService } from '../../../services/auth.service';
import { CreateJobRequest } from '../../../models/create-job-request.model';
import { LocationPickerComponent } from '../../../shared/location-picker/location-picker';

@Component({
  selector: 'app-create-job',
  standalone: true,
  imports: [CommonModule, FormsModule, LocationPickerComponent],
  templateUrl: './create-job.html',
  styleUrl: './create-job.css',
})
export class CreateJob implements OnInit {
  private jobService = inject(JobService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);  // 👈 inject

  job: CreateJobRequest = {
    title: '',
    company: '',
    location: '',
    latitude: null,
    longitude: null,
    salary: null,
    jobType: '',
    description: '',
    employerId: this.authService.getUserId() || 0,
    category: ''
  };

  isEditMode = false;
  editJobId: number | null = null;
  loadingJob = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.editJobId = +id;
      this.loadJobForEdit(this.editJobId);
    }
  }

  loadJobForEdit(jobId: number): void {
    this.loadingJob = true;
    this.jobService.getJobById(jobId).subscribe({
      next: (job) => {
        console.log('[CreateJob] Job data received:', job);
        this.job = {
          title: job.title || '',
          company: job.company || '',
          location: job.location || '',
          latitude: job.latitude || null,
          longitude: job.longitude || null,
          salary: job.salary || null,
          jobType: job.jobType || '',
          description: job.description || '',
          employerId: job.employerId || this.authService.getUserId() || 0,
          category: job.category || ''
        };
        this.editJobId = job.id;
        this.loadingJob = false;
        this.cdr.detectChanges();  // 👈 force UI update
        console.log('[CreateJob] Form populated, loadingJob set to false');
      },
      error: (err) => {
        console.error('[CreateJob] Failed to load job:', err);
        this.loadingJob = false;
        this.cdr.detectChanges();
        alert('Could not load job details. Please try again.');
        this.router.navigate(['/employer/my-jobs']);
      }
    });
  }

  onLocationSelected(location: any) {
    this.job.latitude = location.latitude;
    this.job.longitude = location.longitude;
    this.job.location = location.address;
  }

  cancel(): void {
    this.router.navigate(['/employer/my-jobs']);
  }

  submitJob() {
    if (this.isEditMode && this.editJobId) {
      this.jobService.updateJob(this.editJobId, this.job).subscribe({
        next: () => {
          alert('Job updated successfully!');
          this.router.navigate(['/employer/my-jobs']);
        },
        error: (err) => {
          console.error(err);
          alert('Failed to update job. Please try again.');
        }
      });
    } else {
      this.jobService.createJob(this.job).subscribe({
        next: () => {
          alert('Job posted successfully!');
          this.router.navigate(['/employer/my-jobs']);
        },
        error: (err) => {
          console.error(err);
          alert('Failed to create job. Please try again.');
        }
      });
    }
  }
}