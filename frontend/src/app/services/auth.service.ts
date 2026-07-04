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

export interface LoginResponse {
  token: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/auth';

  // ================= LOGIN =================
  login(
    request: LoginRequest
  ): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      request
    );
  }

  // ================= JOB SEEKER REGISTER =================
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

  // ================= EMPLOYER REGISTER =================
  registerEmployer(
    request: RegisterRequest
  ): Observable<string> {
    return this.http.post(
      `${this.apiUrl}/register/employer`,
      request,
      {
        responseType: 'text'
      }
    );
  }

  // ================= ADMIN REGISTER =================
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

  // ================= LOCAL STORAGE =================
  saveAuth(
    token: string,
    role: string
  ): void {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}