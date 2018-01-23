import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { User } from './User';
import { tokenNotExpired, AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  constructor(private http: Http, public authHttp: AuthHttp) {}

  login(credentials: any) {
    return this.http.post('http://localhost:3000/api/authenticate', {email: credentials.email, password: credentials.password}).map((res) => res.json());
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
  }

  getUsers() {
    return this.authHttp.get('http://localhost:3000/api/users').map((res) => res.json());
  }

  saveToLocalStorage(token: any, user: User) {
    localStorage.setItem('token', token);
    localStorage.setItem('userName', user.name);
    localStorage.setItem('userRole', user.role.toString());
  }

  isUserLoggedIn(): boolean {
    return tokenNotExpired('token');
  }

  isUserAdmin(): boolean {
    return this.isUserLoggedIn() && localStorage.getItem('userRole') == "1";
  }

  getUserName(): string {
    if (this.isUserLoggedIn()) {
      return localStorage.getItem('userName');
    }
  }
}

