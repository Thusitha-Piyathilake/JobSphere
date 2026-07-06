import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class EmployerDashboard {

  stats = [
    {
      title: 'Jobs Posted',
      value: 12,
      icon: '📋'
    },
    {
      title: 'Applications',
      value: 54,
      icon: '📨'
    },
    {
      title: 'Active Jobs',
      value: 9,
      icon: '🟢'
    },
    {
      title: 'Interviews',
      value: 8,
      icon: '🎯'
    }
  ];

  recentJobs = [
    {
      title: 'Senior Java Developer',
      applicants: 18,
      status: 'Active'
    },
    {
      title: 'Frontend Developer',
      applicants: 12,
      status: 'Active'
    },
    {
      title: 'DevOps Engineer',
      applicants: 7,
      status: 'Closed'
    }
  ];

}