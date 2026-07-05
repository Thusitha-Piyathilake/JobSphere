import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { JobService } from '../../services/job.service';
import { AuthService } from '../../services/auth.service';
import { SavedJobService } from '../../services/saved-job.service';

import { Job } from '../../models/job.model';

import { JobMapComponent } from '../../shared/job-map/job-map';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [
    CommonModule,
    JobMapComponent
  ],
  templateUrl: './job-details.html',
  styleUrl: './job-details.css'
})
export class JobDetails implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private jobService = inject(JobService);
  private authService = inject(AuthService);
  private savedJobService = inject(SavedJobService);

  private cdr = inject(ChangeDetectorRef);

  job?: Job;

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    console.log('Route Job ID:', id);

    this.jobService.getJobById(id).subscribe({

      next: (data) => {

        console.log('API Response:', data);

        this.job = data;

        console.log('Assigned Job:', this.job);

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error(error);
      }
    });
  }

  applyJob(): void {

    if (
      !this.authService.isLoggedIn() ||
      this.authService.getRole() !== 'JOB_SEEKER'
    ) {
      this.router.navigate([
        '/jobseeker/auth'
      ]);

      return;
    }

    if (!this.job) {
      return;
    }

    this.router.navigate([
      '/jobs',
      this.job.id,
      'apply'
    ]);
  }

  saveJob(): void {

    if (
      !this.authService.isLoggedIn() ||
      this.authService.getRole() !== 'JOB_SEEKER'
    ) {
      this.router.navigate([
        '/jobseeker/auth'
      ]);

      return;
    }

    if (!this.job) {
      return;
    }

    const jobSeekerId =
      Number(
        localStorage.getItem(
          'userId'
        )
      ) || 1;

    this.savedJobService.saveJob(
      jobSeekerId,
      this.job.id
    ).subscribe({

      next: (message) => {

        alert(message);
      },

      error: (error) => {

        console.error(error);

        alert(
          'Failed to save job'
        );
      }
    });
  }

  openMap(): void {

    if (!this.job) {
      return;
    }

    navigator.geolocation.getCurrentPosition(

      (position) => {

        const userLat =
          position.coords.latitude;

        const userLng =
          position.coords.longitude;

        const destination =
          encodeURIComponent(
            this.job!.location
          );

        const url =
          `https://www.google.com/maps/dir/?api=1` +
          `&origin=${userLat},${userLng}` +
          `&destination=${destination}` +
          `&travelmode=driving`;

        window.open(
          url,
          '_blank'
        );
      },

      () => {

        const destination =
          encodeURIComponent(
            this.job!.location
          );

        const url =
          `https://www.google.com/maps/search/?api=1&query=${destination}`;

        window.open(
          url,
          '_blank'
        );
      }
    );
  }
}