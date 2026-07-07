import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  stats = [
    { title: 'Total Users', value: 125, icon: '👥', color: '#3B82F6' },
    { title: 'Employers', value: 24, icon: '🏢', color: '#F97316' },
    { title: 'Job Seekers', value: 101, icon: '🙋', color: '#10B981' },
    { title: 'Jobs', value: 86, icon: '💼', color: '#8B5CF6' },
    { title: 'Applications', value: 320, icon: '📄', color: '#EF4444' },
    { title: 'Pending Companies', value: 5, icon: '⏳', color: '#F59E0B' }
  ];

  recentUsers = [
    {
      name: 'Namal Silva',
      email: 'namal@gmail.com',
      role: 'Job Seeker'
    },
    {
      name: 'Amal Perera',
      email: 'amal@gmail.com',
      role: 'Employer'
    },
    {
      name: 'John Fernando',
      email: 'john@gmail.com',
      role: 'Job Seeker'
    }
  ];

  recentJobs = [
    {
      title: 'Software Engineer',
      company: 'ABC Technologies',
      location: 'Colombo'
    },
    {
      title: 'UI/UX Designer',
      company: 'Tech Lanka',
      location: 'Kandy'
    },
    {
      title: 'Backend Developer',
      company: 'Soft Solutions',
      location: 'Remote'
    }
  ];

  pendingCompanies = [
    'FutureTech',
    'VisionSoft',
    'DigitalX'
  ];

}