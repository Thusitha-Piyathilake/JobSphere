// src/app/pages/employer/dashboard/dashboard.ts

import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { JobService } from '../../../services/job.service';
import { ApplicationService, ApplicationWithJob } from '../../../services/application.service';
import { Job } from '../../../models/job.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class EmployerDashboard implements OnInit {
  private jobService = inject(JobService);
  private applicationService = inject(ApplicationService);
  private cdr = inject(ChangeDetectorRef);

  // Data
  jobs: Job[] = [];
  applications: ApplicationWithJob[] = [];
  loading = true;
  error = '';

  // UI data (computed from real data)
  stats: any[] = [];
  recentJobs: any[] = [];
  pipeline: { name: string; count: number; percent: number }[] = [];
  interviews: any[] = [];
  activities: any[] = [];

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    const employerId = this.getEmployerId();
    if (!employerId) {
      this.error = 'Employer not logged in';
      this.loading = false;
      this.cdr.detectChanges();
      return;
    }

    // Fetch jobs and applications in parallel
    this.jobService.getJobsByEmployer(employerId).subscribe({
      next: (jobs) => {
        this.jobs = jobs || [];
        this.applicationService.getApplicationsForEmployerWithDetails(employerId).subscribe({
          next: (apps) => {
            this.applications = apps || [];
            this.buildDashboard();
            this.loading = false;
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error('Failed to load applications', err);
            this.error = 'Could not load applications';
            this.loading = false;
            this.cdr.detectChanges();
          }
        });
      },
      error: (err) => {
        console.error('Failed to load jobs', err);
        this.error = 'Could not load jobs';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  private getEmployerId(): number {
    const id = localStorage.getItem('userId') ||
               localStorage.getItem('employerId') ||
               localStorage.getItem('id');
    return Number(id) || 0;
  }

  private buildDashboard(): void {
    // 1. Stats
    const jobsPosted = this.jobs.length;
    // Safely access status: use (job as any)
    const activeJobs = this.jobs.filter(job => {
      const status = (job as any).status;
      return status?.toLowerCase() === 'active' || status === 'Active';
    }).length;
    const totalApplications = this.applications.length;
    const interviewsCount = this.applications.filter(a => a.status === 'ACCEPTED').length;

    this.stats = [
      {
        title: 'Jobs Posted',
        value: jobsPosted,
        icon: '📋',
        iconClass: 'orange',
        trend: '▲ 8%',
        trendClass: 'up',
        color: '#FF6A1F',
        sparkline: '0,20 15,18 30,14 45,16 60,10 75,12 100,4'
      },
      {
        title: 'Applications',
        value: totalApplications,
        icon: '✉️',
        iconClass: 'blue',
        trend: '▲ 22%',
        trendClass: 'up',
        color: '#3D6FE0',
        sparkline: '0,22 15,16 30,18 45,10 60,12 75,6 100,4'
      },
      {
        title: 'Active Jobs',
        value: activeJobs,
        icon: '🟢',
        iconClass: 'mint',
        trend: '▼ 3%',
        trendClass: 'down',
        color: '#1F9C74',
        sparkline: '0,10 15,12 30,8 45,14 60,12 75,16 100,18'
      },
      {
        title: 'Interviews',
        value: interviewsCount,
        icon: '🎯',
        iconClass: 'navy',
        trend: '▲ 14%',
        trendClass: 'up',
        color: '#14172A',
        sparkline: '0,20 15,18 30,20 45,12 60,14 75,8 100,6'
      }
    ];

    // 2. Recent Jobs (latest 4 jobs)
    const sortedJobs = [...this.jobs].sort((a, b) => {
      // Safely access createdAt: use (job as any)
      const dateA = (a as any).createdAt ? new Date((a as any).createdAt).getTime() : (a.id || 0);
      const dateB = (b as any).createdAt ? new Date((b as any).createdAt).getTime() : (b.id || 0);
      return dateB - dateA;
    });
    const recent = sortedJobs.slice(0, 4);
    this.recentJobs = recent.map(job => {
      const status = (job as any).status || 'Draft';
      let statusClass = 'status-draft';
      if (status.toLowerCase() === 'active') statusClass = 'status-active';
      else if (status.toLowerCase() === 'closed') statusClass = 'status-closed';
      const applicants = this.applications.filter(a => a.jobId === job.id).length;
      return {
        title: job.title,
        applicants: applicants,
        status: status,
        statusClass: statusClass,
        initials: job.company ? job.company.substring(0, 2).toUpperCase() : 'JD',
        location: job.location || 'N/A',
        type: job.jobType || 'Full Time'
      };
    });

    // 3. Pipeline – group applications by status
    const statusMap: { [key: string]: number } = {};
    this.applications.forEach(a => {
      const s = a.status || 'PENDING';
      statusMap[s] = (statusMap[s] || 0) + 1;
    });
    const totalApps = this.applications.length;
    this.pipeline = [
      { name: 'Applied', count: totalApps, percent: totalApps > 0 ? 100 : 0 },
      { name: 'Pending', count: statusMap['PENDING'] || 0, percent: totalApps > 0 ? Math.round((statusMap['PENDING'] || 0) / totalApps * 100) : 0 },
      { name: 'Accepted', count: statusMap['ACCEPTED'] || 0, percent: totalApps > 0 ? Math.round((statusMap['ACCEPTED'] || 0) / totalApps * 100) : 0 },
      { name: 'Rejected', count: statusMap['REJECTED'] || 0, percent: totalApps > 0 ? Math.round((statusMap['REJECTED'] || 0) / totalApps * 100) : 0 }
    ];

    // 4. Upcoming Interviews – can be extended when data available
    this.interviews = [];

    // 5. Recent Activity – combine recent applications and job changes
    const activities: any[] = [];
    const sortedApps = [...this.applications].sort((a, b) => {
      const dateA = a.appliedAt ? new Date(a.appliedAt).getTime() : 0;
      const dateB = b.appliedAt ? new Date(b.appliedAt).getTime() : 0;
      return dateB - dateA;
    });
    sortedApps.slice(0, 3).forEach(app => {
      const name = app.applicantName || 'Someone';
      const jobTitle = app.job?.title || 'a job';
      activities.push({
        text: `<b>${name}</b> applied to ${jobTitle}`,
        time: this.timeAgo(app.appliedAt),
        dotColor: '#FF6A1F'
      });
    });
    sortedJobs.slice(0, 2).forEach(job => {
      const createdAt = (job as any).createdAt;
      activities.push({
        text: `<b>${job.title}</b> was posted`,
        time: this.timeAgo(createdAt),
        dotColor: '#1F9C74'
      });
    });
    // Sort by time (newest first) – we'll just use a simple sort by the time string if possible
    // For simplicity, we'll keep the order as is, but you can improve with actual timestamps
    this.activities = activities.slice(0, 4);
  }

  private timeAgo(date: string | Date | undefined): string {
    if (!date) return 'Just now';
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return minutes + ' MINUTES AGO';
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return hours + ' HOURS AGO';
    const days = Math.floor(hours / 24);
    if (days < 7) return days + ' DAYS AGO';
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return weeks + ' WEEKS AGO';
    return 'A MONTH AGO';
  }
}