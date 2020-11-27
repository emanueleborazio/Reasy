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

/*
 postSignIn(username, password): Observable<Login>{
  
   return this.http.post<Login>(this.urlBase + this.apiUrlSignIn,
      {
        "username":username,
        "password":password
      });
      

  }

*/

getSignIn(username, password) {
  debugger
  return this.http.post<any>(`http://80.211.235.235:8082/api/auth/signin`, { username, password })
      .pipe(map(user => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          
          localStorage.setItem('user', JSON.stringify(user.username))
          localStorage.setItem('token', JSON.stringify(user.accessToken))
          localStorage.setItem('role',JSON.stringify(user.roles[0]))
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


}