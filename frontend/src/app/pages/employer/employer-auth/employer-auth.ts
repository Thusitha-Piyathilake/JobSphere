import {
  Component,
  inject,
  AfterViewInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  AuthService,
  LoginRequest,
  EmployerRegisterRequest
} from '../../../services/auth.service';

import { GoogleAuthService } from '../../../services/google-auth.service';

declare const google: any;

@Component({
  selector: 'app-employer-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employer-auth.html',
  styleUrl: './employer-auth.css'
})
export class Auth implements AfterViewInit {

  private authService = inject(AuthService);
  private googleAuthService = inject(GoogleAuthService);
  private router = inject(Router);

  isLogin = true;

  // ================= LOGIN =================

  loginData: LoginRequest = {
    email: '',
    password: ''
  };

  // ================= REGISTER =================

  registerData: EmployerRegisterRequest = {
    companyName: '',
    email: '',
    password: '',
    companyWebsite: '',
    companyLocation: '',
    industry: '',
    companyDescription: ''
  };

  confirmPassword = '';

  showLogin() {
    this.isLogin = true;
  }

  showRegister() {
    this.isLogin = false;
  }

  // ===================================================
  // GOOGLE SIGN IN
  // ===================================================

  ngAfterViewInit(): void {

    this.googleAuthService.initialize((idToken: string) => {

      this.authService
        .authenticateWithGoogle(idToken, 'EMPLOYER')
        .subscribe({

          next: (response) => {

            this.authService.saveAuth(
              response.token,
              response.role,
              response.userId
            );

            if (response.role === 'EMPLOYER') {
              this.router.navigate(['/employer/dashboard']);
            } else {
              alert('This Google account is not registered as an employer.');
              this.authService.logout();
            }

          },

          error: (err) => {
            console.error(err);
            alert('Google login failed');
          }

        });

    });

    const element = document.getElementById('googleEmployerButton');

    if (element) {
      google.accounts.id.renderButton(
        element,
        {
          theme: 'outline',
          size: 'large',
          shape: 'rectangular',
          width: 450
        }
      );
    }

  }

  // ================= LOGIN =================

  login() {

    this.authService.login(this.loginData)
      .subscribe({

        next: (response) => {

          this.authService.saveAuth(
            response.token,
            response.role,
            response.userId
          );

          if (response.role === 'EMPLOYER') {
            this.router.navigate(['/employer/dashboard']);
          }
          else {
            alert('This account is not an employer account.');
            this.authService.logout();
          }

        },

        error: (error) => {
          console.error(error);
          alert('Invalid email or password');
        }

      });

  }

  // ================= REGISTER =================

  register() {

    if (this.registerData.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    this.authService.registerEmployer(this.registerData)
      .subscribe({

        next: (response) => {

          console.log(response);

          alert('Employer registered successfully! Please login to continue.');

          this.isLogin = true;

          this.loginData.email = this.registerData.email;
          this.loginData.password = '';

          this.registerData = {
            companyName: '',
            email: '',
            password: '',
            companyWebsite: '',
            companyLocation: '',
            industry: '',
            companyDescription: ''
          };

          this.confirmPassword = '';

        },

        error: (error) => {
          console.error(error);
          alert('Registration failed');
        }

      });

  }

}