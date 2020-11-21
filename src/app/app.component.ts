import { Component, MissingTranslationStrategy, OnInit } from '@angular/core';
import { Login } from './login.model';
import { Message } from './message.model';
import { DataService } from './services/data.service';
import { User } from './user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  [x: string]: any;
  users$: User[];
  risposta$: Message;
  login$: Login;



  
  constructor(private dataService: DataService){}

  ngOnInit(){
    /*
    return this.dataService.postSignUP()
      .subscribe((data: Message) => this.risposta$ = data)
    */
    /*
    return this.dataService.getUsers()
       .subscribe(data=> this.users$ = data)
    */


   
   

  }

  login(){
    this.dataService.postSignIn()
   .subscribe((data: Login) => this.login$ = data)

   console.log("token: ",this.login$.accessToken)
   sessionStorage.setItem('token',this.login$.accessToken)
  }

  elencoUtenti(){
     this.dataService.getUsers()
       .subscribe(data=> this.users$ = data)
  }

  
}
 