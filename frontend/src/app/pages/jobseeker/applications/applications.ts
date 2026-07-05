// src/app/pages/jobseeker/applications/applications.ts

import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

import {
  ApplicationService,
  Application
} from '../../../services/application.service';

import {
  JobService
} from '../../../services/job.service';

interface ApplicationWithJob extends Application {
  jobTitle: string;
  jobCompany: string;
  jobLocation: string;
  jobType: string;
}

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './applications.html',
  styleUrl: './applications.css'
})
export class Applications implements OnInit {

  private applicationService =
    inject(ApplicationService);

  private jobService =
    inject(JobService);

  // ✅ FIXED
  public router =
    inject(Router);

  private cdr =
    inject(ChangeDetectorRef);

  applications: ApplicationWithJob[] = [];

  loading = true;

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {

    const jobSeekerId =
      Number(localStorage.getItem('userId')) || 1;

    console.log(
      '[Applications] Fetching for ID:',
      jobSeekerId
    );

    this.applicationService
      .getApplicationsByJobSeeker(jobSeekerId)
      .subscribe({

        next: (apps) => {

          console.log(
            '[Applications] Received:',
            apps
          );

          if (!apps || apps.length === 0) {
            this.applications = [];
            this.loading = false;
            this.cdr.detectChanges();
            return;
          }

          const jobRequests =
            apps.map(app =>
              this.jobService.getJobById(app.jobId)
            );

          forkJoin(jobRequests).subscribe({

            next: (jobs) => {

              this.applications =
                apps.map((app, index) => ({

                  ...app,

                  jobTitle:
                    jobs[index].title,

                  jobCompany:
                    jobs[index].company,

                  jobLocation:
                    jobs[index].location,

                  jobType:
                    jobs[index].jobType
                }));

              console.log(
                '[Applications] Final:',
                this.applications
              );

              this.loading = false;

              this.cdr.detectChanges();
            },

            error: (err) => {

              console.error(
                'Error fetching job details:',
                err
              );

              this.loading = false;

              this.cdr.detectChanges();
            }
          });
        },

        error: (err) => {

          console.error(
            'Error fetching applications:',
            err
          );

          this.loading = false;

          this.cdr.detectChanges();
        }
      });
  }

  viewJob(jobId: number): void {

    this.router.navigate([
      '/jobs',
      jobId
    ]);
  }

  getStatusClass(
    status: string
  ): string {

    const map: {
      [key: string]: string
    } = {

      PENDING:
        'status-pending',

      ACCEPTED:
        'status-accepted',

      REJECTED:
        'status-rejected',

      WITHDRAWN:
        'status-withdrawn'
    };

    return (
      map[status] ||
      'status-pending'
    );
  }
}