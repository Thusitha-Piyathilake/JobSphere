import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  AdminUser,
  AdminUserService
} from '../../../services/admin-user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {

  users: AdminUser[] = [];

  search = '';

  selectedRole = 'ALL';

  // ============================
  // Modal
  // ============================

  selectedUser: AdminUser | null = null;

  showModal = false;

  constructor(
    private adminUserService: AdminUserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadUsers();

  }

  loadUsers(): void {

    this.adminUserService.getAllUsers().subscribe({

      next: (response) => {

        console.log('Users loaded:', response);

        this.users = [...response];

        this.cdr.detectChanges();

      },

      error: (error) => {

        console.error('Failed to load users:', error);

      }

    });

  }

  get filteredUsers(): AdminUser[] {

    return this.users.filter(user => {

      const fullName =
        `${user.firstName ?? ''} ${user.lastName ?? ''}`.toLowerCase();

      const matchesSearch =
        fullName.includes(this.search.toLowerCase()) ||
        user.email.toLowerCase().includes(this.search.toLowerCase());

      const matchesRole =
        this.selectedRole === 'ALL' ||
        user.role === this.selectedRole;

      return matchesSearch && matchesRole;

    });

  }

  // ============================
  // View User
  // ============================

  viewUser(user: AdminUser): void {

    this.selectedUser = user;

    this.showModal = true;

  }

  closeModal(): void {

    this.showModal = false;

    this.selectedUser = null;

  }

  block(user: AdminUser): void {

    this.adminUserService.blockUser(user.id).subscribe({

      next: () => {

        this.loadUsers();

      },

      error: err => console.error(err)

    });

  }

  unblock(user: AdminUser): void {

    this.adminUserService.unblockUser(user.id).subscribe({

      next: () => {

        this.loadUsers();

      },

      error: err => console.error(err)

    });

  }

  delete(user: AdminUser): void {

    if (!confirm('Delete this user?')) {

      return;

    }

    this.adminUserService.deleteUser(user.id).subscribe({

      next: () => {

        this.loadUsers();

      },

      error: err => console.error(err)

    });

  }

}