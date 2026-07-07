// src/app/app.routes.ts
import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

import { EmployerRegister } from './pages/employer/employer-register/employer-register';
import { Auth as EmployerAuth } from './pages/employer/employer-auth/employer-auth';

import { Jobs } from './pages/jobs/jobs';
import { JobDetails } from './pages/job-details/job-details';
import { ApplyJobComponent } from './pages/jobseeker/apply-job/apply-job';
import { Profile } from './pages/employer/profile/profile';

import { ProfileComponent } from './pages/jobseeker/profile/profile';
import { Applications } from './pages/jobseeker/applications/applications';
import { JobSeekerDashboardComponent } from './pages/jobseeker/jobseeker-dashboard/jobseeker-dashboard';
import { Auth } from './pages/jobseeker/auth/auth';
import { SavedJobs } from './pages/jobseeker/saved-jobs/saved-jobs';

import { EmployerDashboard } from './pages/employer/dashboard/dashboard';
import { CreateJob } from './pages/employer/create-job/create-job';
import { MyJobs } from './pages/employer/my-jobs/my-jobs';
import { Applicants } from './pages/employer/applicants/applicants';

import { SavedJobsResolver } from './resolvers/saved-jobs.resolver';

export const routes: Routes = [

  // Home
  { path: '', component: Home },

  // Generic Auth
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  // Job Seeker Auth
  { path: 'jobseeker/auth', component: Auth },
  { path: 'employer/profile', component: Profile },


  // Employer Auth
  {
    path: 'employer/auth',
    component: EmployerAuth
  },

  // Optional standalone employer register page
  {
    path: 'register/employer',
    component: EmployerRegister
  },

  // Jobs
  { path: 'jobs', component: Jobs },

  // IMPORTANT: keep apply route before jobs/:id
  { path: 'jobs/:id/apply', component: ApplyJobComponent },

  { path: 'jobs/:id', component: JobDetails },

  // Legacy login routes
  { path: 'login/jobseeker', component: Login },

  // Employer routes
  { path: 'employer/dashboard', component: EmployerDashboard },
  { path: 'employer/create-job', component: CreateJob },
  { path: 'employer/my-jobs', component: MyJobs },
  { path: 'employer/applicants', component: Applicants },
  { path: 'employer/edit-job/:id', component: CreateJob },


  // Job seeker routes
  { path: 'jobseeker/dashboard', component: JobSeekerDashboardComponent },
  { path: 'jobseeker/applications', component: Applications },

  {
    path: 'jobseeker/saved-jobs',
    component: SavedJobs,
    resolve: {
      savedJobs: SavedJobsResolver
    }
  },

  { path: 'jobseeker/profile', component: ProfileComponent },

  // Fallback
  { path: '**', redirectTo: '' }
];