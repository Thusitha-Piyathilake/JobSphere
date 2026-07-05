import {
  Component,
  inject
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  UploadService
} from '../../../services/upload.service';

import {
  ApplicationService
} from '../../../services/application.service';

@Component({
  selector: 'app-apply-job',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './apply-job.html',
  styleUrl: './apply-job.css'
})
export class ApplyJobComponent {

  private uploadService =
    inject(UploadService);

  private applicationService =
    inject(ApplicationService);

  private route =
    inject(ActivatedRoute);

  private router =
    inject(Router);

  applicantName = '';
  applicantEmail = '';
  coverLetter = '';
  emailCopy = false;

  selectedFile?: File;

  onFileSelected(event: any): void {

    this.selectedFile =
      event.target.files[0];
  }

  submitApplication(): void {

    if (!this.selectedFile) {
      alert('Please select your CV');
      return;
    }

    this.uploadService
      .uploadCv(this.selectedFile)
      .subscribe({

        next: (uploadResponse) => {

          const request = {

            jobId: Number(
              this.route.snapshot.paramMap.get('id')
            ),

            jobSeekerId: Number(
              localStorage.getItem('userId')
            ),

            applicantName:
              this.applicantName,

            applicantEmail:
              this.applicantEmail,

            coverLetter:
              this.coverLetter,

            cvUrl:
              uploadResponse.url,

            emailCopy:
              this.emailCopy
          };

          this.applicationService
            .apply(request)
            .subscribe({

              next: () => {

                alert(
                  'Application submitted successfully!'
                );

                this.router.navigate([
                  '/jobseeker/applications'
                ]);
              },

              error: (error) => {
                console.error(error);

                alert(
                  'Failed to submit application'
                );
              }
            });
        },

        error: (error) => {

          console.error(error);

          alert(
            'Failed to upload CV'
          );
        }
      });
  }
}