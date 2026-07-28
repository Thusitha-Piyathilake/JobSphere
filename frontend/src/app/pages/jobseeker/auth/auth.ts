import { Component, inject, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { GoogleAuthService } from '../../../services/google-auth.service';
declare const google: any;

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth implements AfterViewInit {

  private authService = inject(AuthService);
  private googleAuthService = inject(GoogleAuthService);
  private router = inject(Router);

  isLogin = true;

  switchToLogin() {
    this.isLogin = true;
  }

  switchToRegister() {
    this.isLogin = false;
  }

  // ======================
  // Login Fields
  // ======================

  loginEmail = '';
  loginPassword = '';

  // ======================
  // Register Fields
  // ======================

  firstName = '';
  lastName = '';

  registerEmail = '';
  registerPassword = '';
  confirmPassword = '';

  gender = '';
  homeTown = '';

  cvUrl = '';

  receiveEmails = true;
  acceptTerms = false;

  // ======================
  // GOOGLE SIGN IN
  // ======================

  ngAfterViewInit(): void {

    this.googleAuthService.initialize((idToken: string) => {

      this.authService
        .authenticateWithGoogle(idToken, 'JOB_SEEKER')
        .subscribe({

          next: (response) => {

            this.authService.saveAuth(
              response.token,
              response.role,
              response.userId
            );

            if (response.role === 'JOB_SEEKER') {
              this.router.navigate(['/jobseeker/dashboard']);
            }
            else if (response.role === 'EMPLOYER') {
              this.router.navigate(['/employer/dashboard']);
            }
            else {
              this.router.navigate(['/admin/dashboard']);
            }

          },

          error: (err) => {
            console.error(err);
            alert('Google login failed');
          }

        });

    });

    google.accounts.id.renderButton(
      document.getElementById('googleSignInButton'),
      {
        theme: 'outline',
        size: 'large',
        width: 450,
        shape: 'rectangular'
      }
    );

  }

  // ======================
  // LOGIN
  // ======================

  login() {

    const request = {
      email: this.loginEmail,
      password: this.loginPassword
    };

    this.authService.login(request)
      .subscribe({

        next: (response) => {

          this.authService.saveAuth(
            response.token,
            response.role,
            response.userId
          );

          if (response.role === 'JOB_SEEKER') {
            this.router.navigate(['/jobseeker/dashboard']);
          }
          else if (response.role === 'EMPLOYER') {
            this.router.navigate(['/employer/dashboard']);
          }
          else {
            this.router.navigate(['/admin/dashboard']);
          }

        },

        error: () => {
          alert('Invalid email or password');
        }

      });

  }

  // ======================
  // REGISTER
  // ======================

  register() {

    if (this.registerPassword !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!this.acceptTerms) {
      alert('Please accept Terms and Conditions');
      return;
    }

    const request = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.registerEmail,
      password: this.registerPassword,
      gender: this.gender,
      homeTown: this.homeTown,
      cvUrl: this.cvUrl,
      receiveJobAlerts: this.receiveEmails,
      termsAccepted: this.acceptTerms
    };

    this.authService.registerJobSeeker(request)
      .subscribe({

        next: () => {

          alert('Registration successful');

          this.loginEmail = this.registerEmail;

          this.firstName = '';
          this.lastName = '';
          this.registerEmail = '';
          this.registerPassword = '';
          this.confirmPassword = '';
          this.gender = '';
          this.homeTown = '';
          this.cvUrl = '';
          this.receiveEmails = true;
          this.acceptTerms = false;

          this.isLogin = true;

        },

        error: () => {
          alert('Registration failed');
        }

      });

  }

  // ======================
  // FILE UPLOAD
  // ======================

  onFileSelected(event: any): void {

    const file = event.target.files[0];

    if (file) {
      console.log(file.name);
    }

  }

}