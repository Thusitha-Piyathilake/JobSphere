import { Injectable } from '@angular/core';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  private clientId =
    '943288721276-p5tv12om4cstn13ng4ioog2i6i9iv2qd.apps.googleusercontent.com';

  initialize(callback: (idToken: string) => void): void {

    google.accounts.id.initialize({
      client_id: this.clientId,

      callback: (response: any) => {
        callback(response.credential);
      }
    });

  }

}