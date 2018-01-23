import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    if (this.authService.isUserLoggedIn() && this.authService.isUserAdmin()) {
      return true;
    } else {
      return false;
    }
  }
}


