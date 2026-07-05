import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Try different possible keys – adjust to your actual key
    const token = localStorage.getItem('token') || 
                  localStorage.getItem('accessToken') || 
                  localStorage.getItem('jwt');

    console.log('Interceptor – Token found:', token ? 'Yes' : 'No');
    console.log('Interceptor – Request URL:', req.url);

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      console.log('Interceptor – Added Authorization header');
      return next.handle(cloned);
    } else {
      console.warn('Interceptor – No token found, request sent without auth');
      return next.handle(req);
    }
  }
}