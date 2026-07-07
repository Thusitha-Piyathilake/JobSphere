import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;

  email: string;
  password: string;

  gender: string;
  homeTown: string;

  cvUrl: string;

  receiveJobAlerts: boolean;
  termsAccepted: boolean;
}

export interface EmployerRegisterRequest {
  email: string;
  password: string;

  companyName: string;
  companyWebsite: string;
  companyLocation: string;
  industry: string;
  companyDescription: string;
}

export interface LoginResponse {
  token: string;
  role: string;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/auth';

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      request
    );
  }

  registerJobSeeker(
    request: RegisterRequest
  ): Observable<string> {

    return this.http.post(
      `${this.apiUrl}/register/jobseeker`,
      request,
      {
        responseType: 'text'
      }
    );
  }

  registerEmployer(
    request: EmployerRegisterRequest
  ): Observable<string> {

    return this.http.post(
      `${this.apiUrl}/register/employer`,
      request,
      {
        responseType: 'text'
      }
    );
  }

  registerAdmin(
    request: RegisterRequest
  ): Observable<string> {

    return this.http.post(
      `${this.apiUrl}/register/admin`,
      request,
      {
        responseType: 'text'
      }
    );
  }

  saveAuth(
    token: string,
    role: string,
    userId: number
  ): void {

    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('userId', userId.toString());
  }

  logout(): void {

    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getUserId(): number | null {

    const id = localStorage.getItem('userId');

    return id ? Number(id) : null;
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  isJobSeeker(): boolean {
    return this.getRole() === 'JOB_SEEKER';
  }

  isEmployer(): boolean {
    return this.getRole() === 'EMPLOYER';
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  // NEW
  getUser(id: number): Observable<any> {

    return this.http.get<any>(
      `http://localhost:8080/api/users/${id}`
    );
  }

}