import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../message.model';
import { User } from '../user.model';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class DataService {

  constructor(protected http: HttpClient) {
  }


  apiUrlElencoUtenti = 'reasy-be.herokuapp.com/user/users';
  apiUrlSignUp = 'reasy-be.herokuapp.com/api/auth/signup';
  apiUrlSignIn = 'reasy-be.herokuapp.com/api/auth/signin';
  
  postSignUP(): Observable<any> {
    return this.http.post<Message>(this.apiUrlSignUp,{
      "username":"luiggggi@gmail.com",
      "mobile":"3847586788",
      "password":"12345678",
      "role":["ristoratore"]
    },);
  }
  
  
  getUsers(): Observable<any> {
    return this.http.get<User[]>(this.apiUrlElencoUtenti);
  }







}