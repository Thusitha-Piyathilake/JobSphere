import { Component } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive
} from '@angular/router';

import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule
  ],
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

  get isEmployerLoggedIn(): boolean {
    return this.authService.getRole() === 'EMPLOYER';
  }

  get isAdminLoggedIn(): boolean {
  return this.authService.getRole() === 'ADMIN';
}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}