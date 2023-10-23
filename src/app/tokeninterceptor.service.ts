import { HttpInterceptor} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { RegisterService } from './shared/register.service';

@Injectable({
  providedIn: 'root'
})
export class TokeninterceptorService implements HttpInterceptor {

  constructor(private injector:Injector) { }
  intercept(req:any,next:any){
    let register = this.injector.get(RegisterService)
    let tokenizedReq = req.clone(
      {
        headers: req.headers.set('Authorization', 'bearer' + register.getToken())
      }
    )
      return next.handle(tokenizedReq)
  }

}
