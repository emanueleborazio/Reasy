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


    console.log("scelto il ristorante con qr code: "+this.qrResturant)
    
    this.dataService.getMenuByQr(this.qrResturant).subscribe({
      next: (response: Menu[]) => {
        this.menulist$ = response        
      }
    });

  }

  autorizzazione(){
    
    this.dataService.getMyQr().subscribe(
      (res) => {
        this.myQr = res;
        this.imAuthorized = true;
      },
      (err) => console.log(err)
    );
    
    this.showQr = true
    console.log("my qr: "+this.myQr)
    
    
  }

}
