import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdministrationComponent } from './administration/administration.component';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { AuthHttp, AuthConfig, AUTH_PROVIDERS, provideAuth } from 'angular2-jwt';

@NgModule({
  declarations: [
    AppComponent,
    AdministrationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'administration', component: AdministrationComponent, canActivate: [AuthGuardService]}
    ])
  ],
  providers: [AuthService, AuthGuardService, provideAuth({
    tokenName: 'token',
    tokenGetter: (() => localStorage.getItem('token')),
    noJwtError: true
  })],
  bootstrap: [AppComponent]
})
export class AppModule { }

