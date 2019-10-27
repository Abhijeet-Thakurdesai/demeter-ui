import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { config } from './../config';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser: string;

  constructor(private http: HttpClient, private router: Router) {}

  login(user: { username: string, password: string }): Observable<boolean> {
    return this.http.post<any>(`${config.apiUrl}/login`, user)
      .pipe(
        tap(data => this.doLoginUser(user.username, data.token)),
        mapTo(true),
        catchError(error => {
          alert('Invalid Username or password');
          return of(false);
        }));
  }

    register(user: { username: string, password: string }): Observable<boolean> {
    return this.http.post<any>(`${config.apiUrl}/user`, user)
      .pipe(
        tap(data => this.userRegistered()),
        mapTo(true),
        catchError(error => {
          alert('unable to register user');
          return of(false);
        }));
  }

  logout() {
    this.removeTokens();
  }

  userRegistered() {
    console.log('registered');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(username: string, token) {
    this.loggedUser = username;
    this.storeTokens(token);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: string) {
    localStorage.setItem(this.JWT_TOKEN, tokens);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
  }

}
