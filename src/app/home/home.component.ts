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

  get f() { 
    return this.loginForm.controls; 
  }

  onSubmit() {
    
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
            this.router.navigate(['cucina']);
          }
        },
        error: error => {

          this.errorAccess = true;
        }
      });
     


  }


}
