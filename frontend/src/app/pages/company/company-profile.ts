// src/app/pages/company/company-profile.ts

import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { CompanyService } from '../../services/company.service';

import { Company } from '../../models/company.model';
import { Job } from '../../models/job.model';

@Component({
  selector: 'app-company-profile',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './company-profile.html',
  styleUrl: './company-profile.css'
})
export class CompanyProfile implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef); // added

  private companyService = inject(CompanyService);

  company?: Company;
  jobs: Job[] = [];
  loading = true;
  error = false;

  ngOnInit(): void {
    const employerId = Number(
      this.route.snapshot.paramMap.get('id')
    );
    console.log('[CompanyProfile] employerId:', employerId);
    this.loadCompany(employerId);
    this.loadJobs(employerId);
  }

  private loadCompany(employerId: number): void {
    console.log('Loading company:', employerId);
    this.companyService.getCompany(employerId).subscribe({
      next: (data) => {
        console.log('Company response:', data);
        this.company = data;
        console.log('Company assigned:', this.company);
        this.loading = false;
        this.cdr.detectChanges(); // force UI update
      },
      error: (err) => {
        console.error('Company API Error:', err);
        this.error = true;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  private loadJobs(employerId: number): void {
    this.companyService.getCompanyJobs(employerId).subscribe({
      next: (data) => {
        console.log('Jobs response:', data);
        this.jobs = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Jobs API Error:', err);
      }
    });
  }

  openJob(jobId: number): void {
    this.router.navigate(['/jobs', jobId]);
  }
}