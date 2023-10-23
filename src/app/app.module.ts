import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestaurentDashComponent } from './restaurent-dash/restaurent-dash.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ApiService } from './shared/api.service';
import { RegisterService } from './shared/register.service';
import { TokeninterceptorService } from './tokeninterceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    RestaurentDashComponent,
    LoginComponent,
    SignupComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ApiService,RegisterService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokeninterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
