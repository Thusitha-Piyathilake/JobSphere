import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService, RegisterRequest } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  private authService = inject(AuthService);

  registerData: RegisterRequest = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
    homeTown: '',
    cvUrl: '',
    receiveJobAlerts: false,
    termsAccepted: false
  };

  confirmPassword = '';

  register() {

    if (this.registerData.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!this.registerData.termsAccepted) {
      alert('Please accept the Terms and Conditions');
      return;
    }

    this.authService.registerJobSeeker(this.registerData)
      .subscribe({
        next: (response) => {
          alert('Registration successful!');
          console.log(response);
        },

        error: (error) => {
          console.error(error);
          alert('Registration failed');
        }
      });
  }
}