import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Login } from '../login.model';
import { Menu } from '../menu.model';
import { Message } from '../message.model';
import { Resturant } from '../resturant.model';
import { User } from '../user.model';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class DataService {

  constructor(
    protected http: HttpClient,
    private readonly router: Router
    ) {
  }

  urlBase = 'http://reasy-be.herokuapp.com'
  apiUrlElencoUtenti = '/user/users';
  apiUrlSignUp = '/api/auth/signup';
  apiUrlSignIn = '/api/auth/signin';
  apiUrlResturantList = '/store/stores';
  apiUrlMenu = '/store/qrcode/'; 
  apiUrlGetMyQr ='/user/qrcode';

  postSignUP(): Observable<any> {
    return this.http.post<Message>(this.urlBase + this.apiUrlSignUp, {
      "username": "luiggggi@gmail.com",
      "mobile": "3847586788",
      "password": "12345678",
      "role": ["ristoratore"]
    });
  }

  getUsers(): Observable<any> {
    return this.http.get<User[]>(this.urlBase + this.apiUrlElencoUtenti);
  }


 postSignIn(username, password): Observable<Login>{
  
   return this.http.post<Login>(this.urlBase + this.apiUrlSignIn,
      {
        "username":username,
        "password":password
      });
      

  }

  getResturantList(): Observable<any> {
    return this.http.get<Resturant[]>(this.urlBase + this.apiUrlResturantList);
  }

  getMenuByQr(code): Observable<any> {
    return this.http.get<Menu[]>(this.urlBase + this.apiUrlMenu + code);
  }
  

  getMyQr(): Observable<any>{
    return this.http.get<any>(this.urlBase + this.apiUrlGetMyQr)
  }


}