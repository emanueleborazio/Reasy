import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Login } from '../login.model';
import { Menu } from '../menu.model';
import { Message } from '../message.model';
import { Resturant } from '../resturant.model';
import { User } from '../user.model';
import { map } from 'rxjs/operators';
import { Order } from '../order.model';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class DataService {
utente : Login;

  constructor(
    protected http: HttpClient,
    private readonly router: Router
    ) {
  }

  //urlBase = 'http://reasy-be.herokuapp.com'
  urlBase = 'http://80.211.235.235:8082'
  apiUrlElencoUtenti = '/user/users';
  apiUrlSignUp = '/api/auth/signup';
  apiUrlSignIn = '/api/auth/signin';
  apiUrlResturantList = '/store/stores';
  apiUrlMenu = '/store/menu';
  apiUrlMenuByQr = '/store/qrcode/'; 
  apiUrlGetMyQr ='/user/qrcode';
  apiUrlGetAuth = '/user/authorized/';
  apiUrlSendOrder = '/order/send/'

  getSignUP(): Observable<any> {
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



getSignIn(username, password) {
  
  return this.http.post<any>(this.urlBase + this.apiUrlSignIn, { username, password })
      .pipe(map(user => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          
          localStorage.setItem('user', user.username)
          localStorage.setItem('token', user.accessToken)
          localStorage.setItem('role',user.roles[0])
          return user;
      }));
}


  getResturantList(): Observable<any> {
    return this.http.get<Resturant[]>(this.urlBase + this.apiUrlResturantList);
  }

  getMenuByQr(code): Observable<any> {
    return this.http.get<Menu[]>(this.urlBase + this.apiUrlMenuByQr + code);
  }
  
  getMenu(): Observable<any> {
    return this.http.get<Menu[]>(this.urlBase + this.apiUrlMenu);
  }

  getMyQr(): Observable<any>{
    return this.http.get<any>(this.urlBase + this.apiUrlGetMyQr)
  }
  getAuthUser(idResturant): Observable<any> {
    return this.http.get<any>(this.urlBase + this.apiUrlGetAuth + idResturant);
  }

  sendOrder(idResturant, order): Observable<any> {
    return this.http.post<any[]>(this.urlBase + this.apiUrlSendOrder + idResturant, order);
  }


}