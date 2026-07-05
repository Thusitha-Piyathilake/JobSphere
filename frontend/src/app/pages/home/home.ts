import {
  Component,
  inject,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { JobService } from '../../services/job.service';
import { AuthService } from '../../services/auth.service';

import { Job } from '../../models/job.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {

  private jobService = inject(JobService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  jobs: Job[] = [];

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.jobService.getAllJobs().subscribe({
      next: (data: Job[]) => {
        this.jobs = [...data];
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  viewJob(jobId: number): void {

    if (
      !this.authService.isLoggedIn() ||
      this.authService.getRole() !== 'JOB_SEEKER'
    ) {
      this.router.navigate(['/jobseeker/auth']);
      return;
    }

    this.router.navigate(['/jobs', jobId]);
  }
}