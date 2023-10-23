import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private _http:HttpClient, private _router:Router) { }
  postregister(data:any){
    return this._http.post<any>('http://localhost:3000/rapi/signup',data).pipe(map((res:any)=>{
    return res;
    }));
  }
  postlogin(data:any){
    return this._http.post<any>('http://localhost:3000/rapi/login',data)
  }
  getToken():any {
    return localStorage.getItem('token')
  }
  logoutUser():any{
    localStorage.removeItem('token')
    this._router.navigate(['/login'])
  }
  loggedIn():any{
    return !!localStorage.getItem('token')
  }
}
