import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../login.model';
import { DataService } from '../services/data.service';
import { User } from '../user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  [x: string]: any;
  users$: User[];
  risposta$: Message;
  login$: Login;
  loginView: boolean = true;
  username: string = "";
  password: string = "";
  errorEmpty: boolean = false;
  errorAccess: boolean = false;
  statuSearch: boolean = false;
  personalToken: string = null;
  account: Login;

  constructor(
    private dataService: DataService,
    private readonly router: Router) { }

  ngOnInit() {
    this.errorEmpty = false;
    this.statuSearch = false;




  }
  /*
    login(){
      this.dataService.postSignIn()
     .subscribe((data: Login) => this.login$ = data )
  
      sessionStorage.setItem('token',this.login$.accessToken)
    }
  */

  login(){
    //todo fare cotrolli username o pw vuoti
    this.statuSearch = true;
    if (this.username === "" || this.password === "") {
      this.errorEmpty = true;
    } else {
      console.log("username "+this.username)
      console.log("pw "+this.password)
      
      this.dataService.postSignIn(this.username, this.password).subscribe({
        next: (response: Login) => {
          this.account = response
          localStorage.setItem('token', this.account.accessToken)
          localStorage.setItem('role',this.account.roles[0])
          this.statuSearch = false;
          
        }
      });
      
      console.log("ruolo: "+ localStorage.getItem('role'))

      if(localStorage.getItem('role')==='ROLE_UTENTE'){
        this.router.navigate(['lista']);
      }
      if(localStorage.getItem('role')==='ROLE_RISTORATORE'){
        this.router.navigate(['editMenu']);
      }
      
      

      
      

    }
      

  }
  usernameOnKey(event) { this.username = event.target.value; }
  passwordOnKey(event) { this.password = event.target.value; }

  timeout(ms) { //pass a time in milliseconds to this function
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
