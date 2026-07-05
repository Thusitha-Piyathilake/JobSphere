import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';

  login() {

    const request = {
      email: this.email,
      password: this.password
    };

    this.authService.login(request).subscribe({

      next: (response) => {

        this.authService.saveAuth(
          response.token,
          response.role,
          response.userId
        );

        console.log('Login successful');
        console.log(response);

        if (response.role === 'EMPLOYER') {
          this.router.navigate(['/employer/dashboard']);
        }

        else if (response.role === 'JOB_SEEKER') {
          this.router.navigate(['/jobseeker/dashboard']);
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
}