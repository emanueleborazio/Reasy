import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { nextTick } from 'process';
import { first } from 'rxjs/operators';
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
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private readonly router: Router) { }

  ngOnInit() {
    this.errorEmpty = false;
    this.statuSearch = false;

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });




  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    //todo fare cotrolli username o pw vuoti
    /*
    if (this.username === "" || this.password === "") {
      this.errorEmpty = true;
    } else {
      console.log("username "+this.username)
      console.log("pw "+this.password)
      
      /*
      this.dataService.postSignIn(this.username, this.password).subscribe({
        next: (response: Login) => {
          this.account = response
          localStorage.setItem('token', this.account.accessToken)
          localStorage.setItem('role',this.account.roles[0])
        }
      });
      */
    this.dataService.getSignIn(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from query parameters or default to home page
          console.log("ruolo: " + localStorage.getItem('role'))

          if (localStorage.getItem('role') === 'ROLE_UTENTE') {
            this.router.navigate(['lista']);
          }
          if (localStorage.getItem('role') === 'ROLE_RISTORATORE') {
            this.router.navigate(['ristoratore']);
          }
          if (localStorage.getItem('role') === 'ROLE_CUCINA') {
            //TODO
            //this.router.navigate(['']);
          }
        },
        error: error => {

          this.errorAccess = true;
        }
      });







    // }


  }
  //usernameOnKey(event) { this.username = event.target.value; }
  //passwordOnKey(event) { this.password = event.target.value; }

  timeout(ms) { //pass a time in milliseconds to this function
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
