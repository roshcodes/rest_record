import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { RestaurentData } from '../restaurent-dash/restaurent.model';

@Injectable({
  providedIn: 'root'
})

export class ApiService 
{
  [x: string]: any;
  

  constructor(private _http: HttpClient) { }

  //POST request
  postRestaurent(data:any) 
  {
    return this._http.post<any>("http://localhost:3000/api/post",data).pipe(map((res:any)=>{
      return res;
    }))
  }

  //GET request
  getRestaurent() 
  {
    return this._http.get<any>("http://localhost:3000/api/get").pipe(map((res:any)=>{
      return res;
    }));
  }

  //delete request
  deleteRestaurant(_id:number) 
  {
    return this._http.delete<any>("http://localhost:3000/api/delete/"+_id).pipe(map((res:any)=>{
      return res;
    }));
  }

  //update request
  updateRestaurant(_id: number, data: any) 
  {
    return this._http.put<any>("http://localhost:3000/api/update/"+_id,data).pipe(map((res:any)=>{
      return res;
    }));
  }
}
