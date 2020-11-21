import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, MissingTranslationStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from './login.model';
import { Message } from './message.model';
import { DataService } from './services/data.service';
import { User } from './user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  [x: string]: any;
  users$: User[];
  risposta$: Message;
  login$: Login;
  loginView: boolean = true;
  username: string = "";
  password: string = "";
  errorEmpty: boolean = false;

  constructor(
    private dataService: DataService,
    private router: Router) { }

  ngOnInit() {
    /*
    return this.dataService.postSignUP()
      .subscribe((data: Message) => this.risposta$ = data)
    */
    /*
    return this.dataService.getUsers()
       .subscribe(data=> this.users$ = data)
    */
    

   


  }
  /*
    login(){
      this.dataService.postSignIn()
     .subscribe((data: Login) => this.login$ = data )
  
      sessionStorage.setItem('token',this.login$.accessToken)
    }
  */

  login() {
    //todo fare cotrolli username o pw vuoti

    if (this.username === "" || this.password === "") {
      this.errorEmpty= true;
      console.log("vuoto")
      waits(2000)
      //this.errorEmpty=false;
    } else {
      this.dataService.postSignIn(this.username, this.password)
      
      this.loginView = false;
      sessionStorage.setItem("restView","si")
     
      this.router.navigate(['lista']);
    }

  }



  elencoUtenti() {
    this.dataService.getUsers()
      .subscribe(data => this.users$ = data)
  }
  usernameOnKey(event) { this.username = event.target.value; }
  passwordOnKey(event) { this.password = event.target.value; }


  
}
