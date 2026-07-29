import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Company } from '../models/company.model';
import { Job } from '../models/job.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private http = inject(HttpClient);

  private companyApi =
    'http://localhost:8080/api/employer-profile';

  private jobsApi =
    'http://localhost:8080/api/jobs';

  getCompany(employerId: number): Observable<Company> {

    return this.http.get<Company>(
      `${this.companyApi}/${employerId}`
    );

  }

  getCompanyJobs(employerId: number): Observable<Job[]> {

    return this.http.get<Job[]>(
      `${this.jobsApi}/employer/${employerId}`
    );

  }

}