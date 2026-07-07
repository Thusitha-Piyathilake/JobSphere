import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AdminUser {

  id: number;

  email: string;

  firstName: string | null;

  lastName: string | null;

  role: string;

  enabled: boolean;

}

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/admin/users';

  getAllUsers(): Observable<AdminUser[]> {

    return this.http.get<AdminUser[]>(this.apiUrl);

  }

  blockUser(id: number): Observable<string> {

    return this.http.put(
      `${this.apiUrl}/${id}/block`,
      {},
      { responseType: 'text' }
    );

  }

  unblockUser(id: number): Observable<string> {

    return this.http.put(
      `${this.apiUrl}/${id}/unblock`,
      {},
      { responseType: 'text' }
    );

  }

  deleteUser(id: number): Observable<string> {

    return this.http.delete(
      `${this.apiUrl}/${id}`,
      { responseType: 'text' }
    );

  }

}