import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AdminCompany {

  id: number;

  email: string;

  companyName: string | null;

  companyWebsite: string | null;

  companyLocation: string | null;

  industry: string | null;

  companyDescription: string | null;

  role: string;

  enabled: boolean;

}

@Injectable({
  providedIn: 'root'
})
export class AdminCompanyService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/admin/companies';

  getAllCompanies(): Observable<AdminCompany[]> {

    return this.http.get<AdminCompany[]>(this.apiUrl);

  }

  getCompany(id: number): Observable<AdminCompany> {

    return this.http.get<AdminCompany>(
      `${this.apiUrl}/${id}`
    );

  }

  blockCompany(id: number): Observable<string> {

    return this.http.put(
      `${this.apiUrl}/${id}/block`,
      {},
      {
        responseType: 'text'
      }
    );

  }

  unblockCompany(id: number): Observable<string> {

    return this.http.put(
      `${this.apiUrl}/${id}/unblock`,
      {},
      {
        responseType: 'text'
      }
    );

  }

  deleteCompany(id: number): Observable<string> {

    return this.http.delete(
      `${this.apiUrl}/${id}`,
      {
        responseType: 'text'
      }
    );

  }

}