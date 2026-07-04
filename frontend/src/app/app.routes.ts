import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

import { Jobs } from './pages/jobs/jobs';
import { JobDetails } from './pages/job-details/job-details';

import { Dashboard as EmployerDashboard } from './pages/employer/dashboard/dashboard';
import { CreateJob } from './pages/employer/create-job/create-job';
import { MyJobs } from './pages/employer/my-jobs/my-jobs';
import { Applicants } from './pages/employer/applicants/applicants';

import { Dashboard as JobSeekerDashboard } from './pages/jobseeker/dashboard/dashboard';
import { Applications } from './pages/jobseeker/applications/applications';
import { Profile } from './pages/jobseeker/profile/profile';
import { Auth } from './pages/jobseeker/auth/auth';
export const routes: Routes = [
  { path: '', component: Home },

  { path: 'login', component: Login },
  { path: 'register', component: Register },

  {
    path: 'jobseeker/auth', component: Auth },

  { path: 'jobs', component: Jobs },
  { path: 'jobs/:id', component: JobDetails },

  { path: 'login/employer', component: Login },
{ path: 'login/jobseeker', component: Login },

  { path: 'employer/dashboard', component: EmployerDashboard },
  { path: 'employer/create-job', component: CreateJob },
  { path: 'employer/my-jobs', component: MyJobs },
  { path: 'employer/applicants', component: Applicants },

  { path: 'jobseeker/dashboard', component: JobSeekerDashboard },
  { path: 'jobseeker/applications', component: Applications },
  { path: 'jobseeker/profile', component: Profile },

  { path: '**', redirectTo: '' }
];