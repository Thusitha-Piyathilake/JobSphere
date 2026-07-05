import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, User } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProfileComponent implements OnInit {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  user: User = { id: 0, email: '', firstName: '', lastName: '', phone: '', skills: [] };
  originalUser: User = { id: 0, email: '', firstName: '', lastName: '', phone: '', skills: [] };
  loading = true;
  editing = false;
  successMessage = '';
  errorMessage = '';

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    const userId = Number(localStorage.getItem('userId'));
    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }

    this.loading = true;
    this.userService.getUserById(userId).subscribe({
      next: (user) => {
        if (!user.skills) user.skills = [];
        this.user = { ...user };
        this.originalUser = { ...user };
        this.loading = false;
        this.cdr.detectChanges();
        console.log('Profile loaded:', this.user);
      },
      error: (err) => {
        console.error('Error loading profile:', err);
        this.errorMessage = 'Unable to load profile. Please try again.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  enableEditing(): void {
    this.editing = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  cancelEdit(): void {
    this.user = { ...this.originalUser };
    this.editing = false;
    this.successMessage = '';
    this.errorMessage = '';
  }

  saveProfile(): void {
    const userId = Number(localStorage.getItem('userId'));
    if (!userId) return;

    this.loading = true;
    const payload = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      phone: this.user.phone,
      skills: this.user.skills
    };

    this.userService.updateUser(userId, payload).subscribe({
      next: (updatedUser) => {
        this.user = { ...updatedUser };
        this.originalUser = { ...updatedUser };
        this.editing = false;
        this.loading = false;
        this.successMessage = 'Profile updated successfully!';
        this.errorMessage = '';
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error updating profile:', err);
        this.errorMessage = 'Failed to update profile. Please try again.';
        this.loading = false;
        this.successMessage = '';
        this.cdr.detectChanges();
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  get skillsDisplay(): string {
    return (this.user.skills || []).join(', ');
  }

  set skillsDisplay(value: string) {
    this.user.skills = value.split(',').map(s => s.trim()).filter(s => s.length > 0);
  }

  get fullName(): string {
    const first = this.user.firstName || '';
    const last = this.user.lastName || '';
    return (first + ' ' + last).trim() || 'User';
  }
}