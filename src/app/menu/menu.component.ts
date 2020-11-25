import { Component, OnInit } from '@angular/core';
import { Router, ParamMap, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Menu } from '../menu.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  qrResturant: string;
  nameResturant: any;  
  menulist$: Menu[];

  imAuthorized: boolean;
  showQr: boolean;

  myQr: string;
  


  constructor(
    private dataService: DataService,
    private readonly router: Router,
    private route: ActivatedRoute) 
    {  }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => this.qrResturant = params['id']);
    this.route.params.subscribe((params: Params) => this.nameResturant = params['name']);
  
    this.imAuthorized = false;
    this.showQr = false

    this.myQr = localStorage.getItem("myQr")


    console.log("scelto il ristorante con qr code: "+this.qrResturant)
    
    this.dataService.getMenuByQr(this.qrResturant).subscribe({
      next: (response: Menu[]) => {
        this.menulist$ = response        
      }
    });

    
    //todo avviare servizio che vede se sono autorizzato

  }

  autorizzazione(){
    
   
    this.showQr = true
    console.log("my qr: "+this.myQr)

    
    


    
  }

}
