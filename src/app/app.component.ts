import { Component } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { User } from './User';
import { Error } from './Error';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {
  err: Error;
  loginForm: FormGroup;

  constructor(private authService: AuthService, formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      'email': [null, [Validators.required, Validators.email]],
      'password': [null, [Validators.required, Validators.minLength(3)]]
    })
  }

  submitForm(formData: any) {
    this.authService.login(formData).subscribe(
      (data) => {
        if (data.success) {
          var user: User = {name: data.userName, role: data.userRole};
          this.saveData(data.token, user);
          this.err = null;
          this.loginForm.reset();
        } else {
          this.err = {message: data.message}
        }
      },
      (error) => console.log(error));
  }  

  saveData(token: any, user: User) {
    this.authService.saveToLocalStorage(token, user);
  }

  onLogout() {
    this.authService.logout();
  }

  getUserName(): string {
    return this.authService.getUserName();
  }

  isLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }

  isAdmin(): boolean {
    return this.authService.isUserAdmin();
  }
}

