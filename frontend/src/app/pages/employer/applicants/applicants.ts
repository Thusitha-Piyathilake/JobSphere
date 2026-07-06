import {
  Component,
  OnInit,
  inject
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  ApplicationService,
  Application
} from '../../../services/application.service';

import {
  AuthService
} from '../../../services/auth.service';

@Component({
  selector: 'app-applicants',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './applicants.html',
  styleUrl: './applicants.css',
})
export class Applicants implements OnInit {

  private applicationService =
    inject(ApplicationService);

  private authService =
    inject(AuthService);

  applications: Application[] = [];

  loading = true;

  ngOnInit(): void {

    const employerId =
      this.authService.getUserId();

    if (!employerId) {
      this.loading = false;
      return;
    }

    this.applicationService
      .getApplicationsForEmployer(
        employerId
      )
      .subscribe({

        next: (applications) => {

          this.applications =
            applications;

          this.loading = false;
        },

        error: (error) => {

          console.error(error);

          this.loading = false;
        }
      });
  }

  acceptApplication(
    applicationId: number
  ): void {

    this.applicationService
      .acceptApplication(
        applicationId
      )
      .subscribe({

        next: (updated) => {

          const index =
            this.applications.findIndex(
              a => a.id === updated.id
            );

          if (index !== -1) {
            this.applications[index] =
              updated;
          }
        }
      });
  }

  rejectApplication(
    applicationId: number
  ): void {

    this.applicationService
      .rejectApplication(
        applicationId
      )
      .subscribe({

        next: (updated) => {

          const index =
            this.applications.findIndex(
              a => a.id === updated.id
            );

          if (index !== -1) {
            this.applications[index] =
              updated;
          }
        }
      });
  }
}