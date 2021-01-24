import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Login } from '../../model/login.model';
import { Menu2 } from '../../model/menu2.model';
import { Message } from '../../model/message.model';
import { Resturant } from '../../model/resturant.model';
import { User } from '../../model/user.model';
import { map } from 'rxjs/operators';
import { Order } from '../../model/order.model';
import { Contact } from '../../model/contact.model';
import { ResturantMenu } from '../../model/resturantMenu.model';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class DataService {
  utente: Login;

  constructor(
    protected http: HttpClient,
    private readonly router: Router
  ) {
  }

  //////////////
  /////URL//////
  //////////////

  //url BASE

  //urlBase = 'http://reasy-be.herokuapp.com'
  urlBase = 'http://80.211.235.235:8082'

  //url per UTENTE
  apiUrlSendOrder = '/order/send/';
  apiUrlGetMyQr = '/user/qrcode';
  apiUrlGetAuth = '/user/authorized/';
  apiUrlSetAuth = '/user/authorize';

  //url per RISTORATORE
  apiUrlInsertItem = '/store/menu';
  apiUrlMenu = '/store/menu';
  apiUrlModStore = '/store/info';
  apiUrlDeleteItemMenu = '/store/item/';
  apiUrlShowContact = '/store/users/';
  apiUrlShowOrdersByUserId = '/store/orders/';

  //url per CUCINA
  apiUrlOrders= '/store/orders';
  apiUrlModItemOrder= '/order/item/modify';

  //url per UTENTE e CUCINA
  apiUrlMenuByQr = '/store/qrcode/';


  //url per TUTTI
  apiUrlSignUp = '/api/auth/signup';
  apiUrlSignIn = '/api/auth/signin';
  apiUrlSignInGoogle = '/api/auth/google';
  apiUrlElencoUtenti = '/user/users';
  apiUrlGetStores = '/store/stores';


  //////////////
  ///SERVIZI////
  //////////////


  ////servizi per UTENTE////////////////////////////////////////////////////////////////////
  sendOrder(idResturant, order): Observable<any> {
    return this.http.post<any[]>(this.urlBase + this.apiUrlSendOrder + idResturant, order);
  }
  getAuthUser(idResturant): Observable<any> {
    return this.http.get<any>(this.urlBase + this.apiUrlGetAuth + idResturant);
  }

  ////servizi per CUCINA////////////////////////////////////////////////////////////////////
  //servizio per visionare tutti gli ordini di tutti i ristoranti a cui si è collegati
  getOrdersList(): Observable<any>{
    return this.http.get<any>(this.urlBase + this.apiUrlOrders);
  }
  //servizio epr modificare lo status
  getModItemOrder(data): Observable<any> {
    return this.http.post<any>(this.urlBase + this.apiUrlModItemOrder,  data)
  }

  ////servizi per RISTORATORE///////////////////////////////////////////////////////////////
  //servizio per aggiungere una voce nel menu
  addItemMenu(item): Observable<any> {
    return this.http.post<any>(this.urlBase + this.apiUrlInsertItem, item);
  }
  //servizio per eliminare un item dal menu
  deleteItemMenu(itemId): Observable<any> {

    return this.http.delete<any>(this.urlBase + this.apiUrlDeleteItemMenu + itemId);
  }
  //servizio per ottenere il qr code
  getMyQr(): Observable<any> {
    return this.http.get<any>(this.urlBase + this.apiUrlGetMyQr)
  }
  //servizio per leggere il menù
  getMenu(): Observable<any> {
    return this.http.get<ResturantMenu>(this.urlBase + this.apiUrlMenu);
  }
  //servizio per modificare nome e città del ristorante
  getModStore(data): Observable<any> {
    return this.http.post<any>(this.urlBase + this.apiUrlModStore, data); //multipart
  }
  //servizio per autorizzare un cliente a ordinare
  setAuthUser(data): Observable<any> {
    return this.http.post<any>(this.urlBase + this.apiUrlSetAuth, data); //multipart
  }
  //servizio per mostrare gli accessi al ristorante
  getShowContact(day): Observable<any> {
    if(day===undefined)
      return this.http.get<Contact[]>(this.urlBase + this.apiUrlShowContact);
    else
      return this.http.get<Contact[]>(this.urlBase + this.apiUrlShowContact + day); //multipart
  }
  //servizio per mostrare l'ordine
  getOrdersByUserId(qrUser): Observable<any>{
    return this.http.get<any>(this.urlBase + this.apiUrlShowOrdersByUserId + qrUser)
  }


  ////servizi per UTENTE e CUCINA//////////////////////////////////////////////////////////
  getMenuByQr(code): Observable<any> {
    return this.http.get<Menu2[]>(this.urlBase + this.apiUrlMenuByQr + code);
  }

  ////serivizi per TUTTI//////////////////////////////////////////////////////////////////
  //servizio per la registrazione
  getSignUP(): Observable<any> {
    return this.http.post<Message>(this.urlBase + this.apiUrlSignUp, {
      "username": "luiggggi@gmail.com",
      "mobile": "3847586788",
      "password": "12345678",
      "role": ["ristoratore"]
    });
  }
  //servizio per effettuare l'accesso
  getSignIn(username, password) {
    return this.http.post<any>(this.urlBase + this.apiUrlSignIn, { username, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes

        localStorage.setItem('user', user.username)
        localStorage.setItem('token', user.accessToken)
        localStorage.setItem('role', user.roles[0])
        return user;
      }));
  }
  //serivizo LOGIN CON GOOGLE
  getSingInGoogle(token,clientId){
    return this.http.post<any>(this.urlBase + this.apiUrlSignInGoogle,   {
      "token": token,
      "clientId": clientId
    } )
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes

        localStorage.setItem('user', user.username)
        localStorage.setItem('token', user.accessToken)
        localStorage.setItem('role', user.roles[0])
        return user;
      }));
  }

  //servizo che elenca gli account della piattaforma
  getUsers(): Observable<any> {
    return this.http.get<User[]>(this.urlBase + this.apiUrlElencoUtenti);
  }
  //servizio che elenca i ristoranti
  getStores(): Observable<any> {
    return this.http.get<any>(this.urlBase + this.apiUrlGetStores);
  }





}
