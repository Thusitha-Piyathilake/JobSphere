import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  AuthService,
  LoginRequest,
  EmployerRegisterRequest
} from '../../../services/auth.service';

@Component({
  selector: 'app-employer-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employer-auth.html',
  styleUrl: './employer-auth.css',
})
export class Auth {

  private authService = inject(AuthService);
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

          // Switch back to login tab
          this.isLogin = true;

          // Pre-fill login email
          this.loginData.email = this.registerData.email;
          this.loginData.password = '';

          // Clear registration form
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