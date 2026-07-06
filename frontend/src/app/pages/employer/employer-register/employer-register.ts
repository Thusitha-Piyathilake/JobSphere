import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AuthService,
  EmployerRegisterRequest
} from '../../../services/auth.service';

@Component({
  selector: 'app-employer-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employer-register.html',
  styleUrl: './employer-register.css'
})
export class EmployerRegister {

  private authService = inject(AuthService);
  private router = inject(Router);

  registerData: EmployerRegisterRequest = {
    email: '',
    password: '',
    companyName: '',
    companyWebsite: '',
    companyLocation: '',
    industry: '',
    companyDescription: ''
  };

  confirmPassword = '';

  register() {

    if (this.registerData.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    this.authService.registerEmployer(this.registerData)
      .subscribe({
        next: (response) => {
          console.log(response);
          alert('Employer registered successfully!');
          this.router.navigate(['/login']);
        },

        error: (error) => {
          console.error(error);
          alert('Registration failed');
        }
      });
  }
}