import { Component, OnInit } from '@angular/core';
import { Router, ParamMap, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Menu } from '../menu.model';
import { Order } from '../order.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  idResturant: any;
  qrResturant: any;
  nameResturant: any;  
  menulist$: Menu[];
  lista: Menu[];

  imAuthorized: boolean;
  showQr: boolean;
  authOrder: boolean = false;
  errorAuth : boolean =false;
  showSummary: boolean = false;

  myQr: string;

  //TODO inizializzare in modo corretto l'array
  quantity: number[]=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

  order: Order[] = [];
  x : number = 0 ;

  


  constructor(
    private dataService: DataService,
    private readonly router: Router,
    private route: ActivatedRoute) 
    {  }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => this.qrResturant = params['qr']);
    this.route.params.subscribe((params: Params) => this.nameResturant = params['name']);
    this.route.params.subscribe((params: Params) => this.idResturant = params['id']);

    localStorage.setItem("idResturant", this.idResturant)
    localStorage.setItem("qrResturant",this.qrResturant)
    localStorage.setItem("nameResturant",this.nameResturant)

    console.log("idResturant "+ this.idResturant)
    console.log("qrResturant "+ this.qrResturant)
    console.log("nameResturant "+ this.nameResturant)

    this.authOrder = false;
    this.imAuthorized = false;
    this.showQr = false;
    this.showSummary=false;

    this.myQr = localStorage.getItem("myQr")


    console.log("scelto il ristorante con qr code: "+this.qrResturant)
    
    this.dataService.getMenuByQr(this.qrResturant).subscribe({
      next: (response: Menu[]) => {
        this.menulist$ = response 
        
      } 
      
    });

    
        

   //inizializzo a zero il vettore
   /*
   for(let i=0; i<10; i++){
     this.quantity[i] = 0;
   }
  
*/
   
/*
    for(let x of this.menulist$ ){
      this.nVector.push(new Quantity(x.id,0))
    }
*/
   

   

    this.checkAuthorization()
    //todo avviare servizio che vede se sono autorizzato

  }

  autorizzazione(){
    
    this.showQr = true
    console.log("my qr: "+this.myQr)

  
  }

  checkAuthorization(){

    // todo servizio non funzionante, momentanemanete sospeso
    
    this.dataService.getAuthUser(this.idResturant).subscribe({
      next: (response: Boolean) => {
        if(response){
          this.authOrder = true;
          console.log("UTENTE autorizzato")
        }else{
          console.log("UTENTE NON autorizzato")
          this.authOrder = false;
          this.errorAuth = true
        }
        
      
      }
    });
    
   //this.authOrder = true;

  }

  sendOrder(){
    
    console.log("ordine in corso: "+this.order)
    this.dataService.sendOrder(this.idResturant,this.order);
    console.log("ordine inviato")
    this.showSummary= true

  }


  add(menu : Menu, i: number){
    
    this.quantity[i] = this.quantity[i]+1;
    let temp = new Order(menu.id,this.quantity[i]);
    this.order.push(temp) 
    

  }

  remove(menu : Menu,i:number){
    if(this.quantity[i] > 0){
      this.quantity[i] = this.quantity[i]-1
      let temp = new Order(menu.id,this.quantity[i]);
      this.order.push(temp) 
    }
  }
}
