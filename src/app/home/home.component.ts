import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { nextTick } from 'process';
import { first } from 'rxjs/operators';
import { Login } from '../login.model';
import { DataService } from '../services/data.service';
import { User } from '../user.model';
import { ViewChild,ElementRef } from '@angular/core'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('loginRef', {static: true }) loginElement: ElementRef;


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

    this.googleInitialize();



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
  
  googleInitialize() {
    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        this.auth2 = window['gapi'].auth2.init({
          client_id: '998339999841-ie7hs502m3rtjfnvei0lqk7cvalm5ctf.apps.googleusercontent.com',
          cookie_policy: 'single_host_origin',
          scope: 'profile email'
        });
        this.prepareLogin();
      });
    }
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
  }

  prepareLogin() {
    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleUser) => {
        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        localStorage.setItem("googleToken",googleUser.getAuthResponse().id_token)
        this.show = true;
        this.Name =  profile.getName();
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());

        
        let token = googleUser.getAuthResponse().id_token
        let clientId = "998339999841-ie7hs502m3rtjfnvei0lqk7cvalm5ctf.apps.googleusercontent.com"

        this.dataService.getSingInGoogle(token,clientId)
      .pipe(first())
      .subscribe({
        next: () => {
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


      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });

    
  }


}


