import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth {

  private authService = inject(AuthService);
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
  // LOGIN
  // ======================

  login() {

    const request = {
      email: this.loginEmail,
      password: this.loginPassword
    };

    this.authService.login(request).subscribe({

      next: (response) => {

        this.authService.saveAuth(
          response.token,
          response.role
        );

        console.log('Login successful');
        console.log(response);

        if (response.role === 'JOB_SEEKER') {
          this.router.navigate(['/jobseeker/dashboard']);
        }

        else if (response.role === 'EMPLOYER') {
          this.router.navigate(['/employer/dashboard']);
        }

        else if (response.role === 'ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        }
      },

      error: (error) => {
        console.error(error);
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

    this.authService.registerJobSeeker(request).subscribe({

      next: (response) => {

        console.log(response);

        alert('Registration successful');

        // Pre-fill login email
        this.loginEmail = this.registerEmail;

        // Clear registration form
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

        // Switch to login tab
        this.isLogin = true;
      },

      error: (error) => {
        console.error(error);
        alert('Registration failed');
      }
    });
  }

}