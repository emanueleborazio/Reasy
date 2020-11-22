import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()


export class TokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
  
  
   let userToken = sessionStorage.getItem('token');
   console.log("user Token: ",userToken)

   const modifiedReq = req.clone({ 
     headers: req.headers.set('Authorization', `Bearer ${userToken}`),
   });
   return next.handle(modifiedReq);



  }

  
}

