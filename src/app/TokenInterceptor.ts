import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()


export class TokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    let userToken = 'none'

    if(sessionStorage.getItem('token') != undefined){
      userToken = sessionStorage.getItem('token');
      console.log("user Token: ",userToken)
    }
    //const userToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsdWNhY2FycGVkaWVtQGdtYWlsLmNvbSIsImlhdCI6MTYwNTY4NzQ0MiwiZXhwIjoxNjA1NzczODQyfQ.FfwNe0gJKOPz4UrBeX2YtkOoRHJZL3aU2YV2xXokA7R1PzDyt590WY-RhJHXpPGKfBiVLRW2x2PUtcPf_uzhVQ';
    
    
    const modifiedReq = req.clone({ 
      headers: req.headers.set('Authorization', `Bearer ${userToken}`),
    });
    return next.handle(modifiedReq);
    
  
  }

  
}

