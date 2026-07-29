// src/app/pages/employer/profile/profile.ts

import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { EmployerProfileService } from '../../../services/employer-profile.service';
import { UploadService } from '../../../services/upload.service';
import { EmployerProfile } from '../../../models/employer-profile.model';
import { AuthService } from '../../../services/auth.service';

import { ReplacePipe } from '../../../pipes/replace.pipe';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReplacePipe
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {

  private profileService = inject(EmployerProfileService);
  private uploadService = inject(UploadService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  editMode = false;
  loading = true;
  errorMessage = '';

  profile: EmployerProfile = {
    employerId: Number(localStorage.getItem('userId')) || 0,
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    industry: '',
    website: '',
    address: '',
    foundedYear: '',
    companySize: '',
    logoUrl: '',
    bannerUrl: '',
    description: ''
  };

  ngOnInit(): void {

    console.log('[Profile] Role:', this.authService.getRole());

    if (!this.authService.isEmployer()) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadProfile();
  }

  loadProfile(): void {

    this.loading = true;
    this.errorMessage = '';

    const employerId = Number(localStorage.getItem('userId'));

    this.authService.getUser(employerId).subscribe({

      next: (user) => {

        this.profile.employerId = employerId;
        this.profile.companyName = user.companyName;
        this.profile.companyEmail = user.email;
        this.profile.website = user.companyWebsite;
        this.profile.address = user.companyLocation;
        this.profile.industry = user.industry;
        this.profile.description = user.companyDescription;

        this.profileService.getProfile(employerId).subscribe({

          next: (extraProfile) => {

            this.profile = {
              ...this.profile,
              ...extraProfile
            };

            this.loading = false;
            this.cdr.detectChanges();

          },

          error: () => {

            this.loading = false;
            this.cdr.detectChanges();

          }

        });

      },

      error: (err) => {

        console.error(err);
        this.errorMessage = 'Failed to load company information.';
        this.loading = false;

      }

    });

  }

  toggleEdit(): void {

    this.editMode = !this.editMode;
    this.errorMessage = '';

  }

  // ==========================================================
  // Upload Company Logo – updated to save the profile
  // ==========================================================

  onLogoSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    this.uploadService.uploadCompanyLogo(file).subscribe({

      next: (response) => {

        this.profile.logoUrl = response.url;

        this.profileService.updateProfile(
          this.profile.employerId,
          this.profile
        ).subscribe({

          next: (updatedProfile) => {

            this.profile = updatedProfile;
            this.cdr.detectChanges();
            alert('Company logo saved successfully.');

          },

          error: (err) => {

            console.error(err);
            alert('Logo uploaded but profile could not be updated.');

          }

        });

      },

      error: (err) => {

        console.error(err);
        alert('Failed to upload company logo.');

      }

    });

  }

  saveProfile(): void {

    this.profile.employerId = Number(localStorage.getItem('userId'));

    this.errorMessage = '';

    if (this.profile.id) {

      this.profileService.updateProfile(
        this.profile.employerId,
        this.profile
      ).subscribe({

        next: (response) => {

          this.profile = response;

          this.editMode = false;

          alert('Profile updated successfully!');

          this.cdr.detectChanges();

        },

        error: (err) => {

          console.error(err);

          this.errorMessage =
            'Failed to update profile. Please try again.';

        }

      });

    } else {

      this.profileService.createProfile(this.profile).subscribe({

        next: (response) => {

          this.profile = response;

          this.editMode = false;

          alert('Profile created successfully!');

          this.cdr.detectChanges();

        },

        error: (err) => {

          console.error(err);

          this.errorMessage =
            'Failed to create profile. Please try again.';

        }

      });

    }

  }

  copyLink(): void {

    const link =
      `jobsphere.lk/company/${this.profile.companyName?.toLowerCase().replace(/ /g, '-') || 'company'}`;

    navigator.clipboard?.writeText(link).then(() => {

      alert('Link copied to clipboard!');

    }).catch(() => {

      const input = document.createElement('input');

      input.value = link;

      document.body.appendChild(input);

      input.select();

      document.execCommand('copy');

      document.body.removeChild(input);

      alert('Link copied to clipboard!');

    });

  }

}