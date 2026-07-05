// src/app/app.routes.ts
import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

import { Jobs } from './pages/jobs/jobs';
import { JobDetails } from './pages/job-details/job-details';
import { ApplyJobComponent } from './pages/jobseeker/apply-job/apply-job';

import { ProfileComponent } from './pages/jobseeker/profile/profile';
import { Applications } from './pages/jobseeker/applications/applications';
import { JobSeekerDashboardComponent } from './pages/jobseeker/jobseeker-dashboard/jobseeker-dashboard';
import { Auth } from './pages/jobseeker/auth/auth';
import { SavedJobs } from './pages/jobseeker/saved-jobs/saved-jobs';

import { EmployerDashboard } from './pages/employer/dashboard/dashboard';
import { CreateJob } from './pages/employer/create-job/create-job';
import { MyJobs } from './pages/employer/my-jobs/my-jobs';
import { Applicants } from './pages/employer/applicants/applicants';

// 👇 Import the resolver
import { SavedJobsResolver } from './resolvers/saved-jobs.resolver';

export const routes: Routes = [
  { path: '', component: Home },

  { path: 'login', component: Login },
  { path: 'register', component: Register },

  { path: 'jobseeker/auth', component: Auth },

  { path: 'jobs', component: Jobs },

  // IMPORTANT: keep apply route before jobs/:id
  { path: 'jobs/:id/apply', component: ApplyJobComponent },

  { path: 'jobs/:id', component: JobDetails },

  { path: 'login/employer', component: Login },
  { path: 'login/jobseeker', component: Login },

  // Employer routes
  { path: 'employer/dashboard', component: EmployerDashboard },
  { path: 'employer/create-job', component: CreateJob },
  { path: 'employer/my-jobs', component: MyJobs },
  { path: 'employer/applicants', component: Applicants },

  // Job seeker routes
  { path: 'jobseeker/dashboard', component: JobSeekerDashboardComponent },
  { path: 'jobseeker/applications', component: Applications },
  {
    path: 'jobseeker/saved-jobs',
    component: SavedJobs,
    resolve: { savedJobs: SavedJobsResolver }   // 👈 Add resolver
  },
  { path: 'jobseeker/profile', component: ProfileComponent },

  { path: '**', redirectTo: '' }
];