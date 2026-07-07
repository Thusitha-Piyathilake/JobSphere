// src/app/app.routes.ts

import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

// ======================
// Admin
// ======================
import { Layout } from './pages/admin/layout/layout';
import { Dashboard } from './pages/admin/dashboard/dashboard';
import { Users } from './pages/admin/users/users';
import { Companies } from './pages/admin/companies/companies';
import { Jobs as AdminJobs } from './pages/admin/jobs/jobs';
import { Categories } from './pages/admin/categories/categories';
import { Locations } from './pages/admin/locations/locations';
import { Statistics } from './pages/admin/statistics/statistics';

// ======================
// Employer
// ======================
import { EmployerRegister } from './pages/employer/employer-register/employer-register';
import { Auth as EmployerAuth } from './pages/employer/employer-auth/employer-auth';
import { EmployerDashboard } from './pages/employer/dashboard/dashboard';
import { CreateJob } from './pages/employer/create-job/create-job';
import { MyJobs } from './pages/employer/my-jobs/my-jobs';
import { Applicants } from './pages/employer/applicants/applicants';
import { Profile } from './pages/employer/profile/profile';

// ======================
// Public
// ======================
import { Jobs } from './pages/jobs/jobs';
import { JobDetails } from './pages/job-details/job-details';

// ======================
// Job Seeker
// ======================
import { ApplyJobComponent } from './pages/jobseeker/apply-job/apply-job';
import { ProfileComponent } from './pages/jobseeker/profile/profile';
import { Applications } from './pages/jobseeker/applications/applications';
import { JobSeekerDashboardComponent } from './pages/jobseeker/jobseeker-dashboard/jobseeker-dashboard';
import { Auth } from './pages/jobseeker/auth/auth';
import { SavedJobs } from './pages/jobseeker/saved-jobs/saved-jobs';

// ======================
// Resolver
// ======================
import { SavedJobsResolver } from './resolvers/saved-jobs.resolver';

export const routes: Routes = [

  // ======================
  // Home
  // ======================

  { path: '', component: Home },

  // ======================
  // Generic Auth
  // ======================

  { path: 'login', component: Login },
  { path: 'register', component: Register },

  // ======================
  // Job Seeker Auth
  // ======================

  { path: 'jobseeker/auth', component: Auth },
  { path: 'employer/profile', component: Profile },

  // ======================
  // Admin Routes
  // ======================

  {
    path: 'admin',
    component: Layout,
    children: [

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },

      {
        path: 'dashboard',
        component: Dashboard
      },

      {
        path: 'users',
        component: Users
      },

      {
        path: 'companies',
        component: Companies
      },

      {
        path: 'jobs',
        component: AdminJobs
      },

      {
        path: 'categories',
        component: Categories
      },

      {
        path: 'locations',
        component: Locations
      },

      {
        path: 'statistics',
        component: Statistics
      }

    ]
  },

  // ======================
  // Employer Auth
  // ======================

  {
    path: 'employer/auth',
    component: EmployerAuth
  },

  // Optional standalone employer register page

  {
    path: 'register/employer',
    component: EmployerRegister
  },

  // ======================
  // Jobs
  // ======================

  { path: 'jobs', component: Jobs },

  // Keep apply route before jobs/:id

  { path: 'jobs/:id/apply', component: ApplyJobComponent },

  { path: 'jobs/:id', component: JobDetails },

  // ======================
  // Legacy Login
  // ======================

  { path: 'login/jobseeker', component: Login },

  // ======================
  // Employer Routes
  // ======================

  { path: 'employer/dashboard', component: EmployerDashboard },
  { path: 'employer/create-job', component: CreateJob },
  { path: 'employer/my-jobs', component: MyJobs },
  { path: 'employer/applicants', component: Applicants },
  { path: 'employer/edit-job/:id', component: CreateJob },

  // ======================
  // Job Seeker Routes
  // ======================

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

  // ======================
  // Fallback
  // ======================

  { path: '**', redirectTo: '' }

];