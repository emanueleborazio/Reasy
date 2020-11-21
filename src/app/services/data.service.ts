import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../login.model';
import { Message } from '../message.model';
import { User } from '../user.model';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class DataService {

  constructor(protected http: HttpClient) {
  }

  urlBase = 'http://reasy-be.herokuapp.com'
  apiUrlElencoUtenti = '/user/users';
  apiUrlSignUp = '/api/auth/signup';
  apiUrlSignIn = '/api/auth/signin';
  
  postSignUP(): Observable<any> {
    return this.http.post<Message>(this.urlBase + this.apiUrlSignUp,{
      "username":"luiggggi@gmail.com",
      "mobile":"3847586788",
      "password":"12345678",
      "role":["ristoratore"]
    });
  }
  
  postSignIn(): Observable<any> {
    return this.http.post<Login>(this.urlBase + this.apiUrlSignIn,{
      "username":"luiggggi@gmail.com",
      "password":"12345678"
    })
  }

  
  getUsers(): Observable<any> {
    return this.http.get<User[]>(this.urlBase + this.apiUrlElencoUtenti);
  }







}