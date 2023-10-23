import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../shared/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit 
{
  loginForm!: FormGroup;
  constructor(private formbuilder: FormBuilder, private _http:HttpClient, private _router:Router, private register:RegisterService ) { }

  ngOnInit(): void
  {
    this.loginForm = this.formbuilder.group({
      email: [''],
      password: ['']
    });
  }

  logIn() 
  {
    this.register.postlogin(this.loginForm.value).subscribe(res=>{
      localStorage.setItem('token', res.token)
      this._router.navigate(['/restaurent'])
      this.loginForm.reset();   
      alert("logged in successfull");
    },err=>{console.log("Error found!",err),alert("logged in fail")}
    )
 
  }
}
