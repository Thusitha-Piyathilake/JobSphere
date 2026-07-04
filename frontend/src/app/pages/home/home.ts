import {
  Component,
  inject,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { JobService } from '../../services/job.service';
import { Job } from '../../models/job.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {

  private jobService = inject(JobService);
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
}