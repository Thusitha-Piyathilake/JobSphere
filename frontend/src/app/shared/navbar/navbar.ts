import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get isJobSeekerLoggedIn(): boolean {
    return this.authService.getRole() === 'JOB_SEEKER';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}