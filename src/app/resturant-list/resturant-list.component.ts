import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../item.model';
import { Items } from '../items.model';
import { OrderFullData } from '../orderFullData.model';
import { Resturant } from '../resturant.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-resturant-list',
  templateUrl: './resturant-list.component.html',
  styleUrls: ['./resturant-list.component.css']
})
export class ResturantListComponent implements OnInit {
  resturantView: boolean = false
  orderView: boolean = false
  showDetailView: boolean = false
  detailView: boolean[] = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]

  resturantList$: Resturant[];
  orderUserList$: OrderFullData[];

  totalList: number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

  errorShowOrdersMessage: boolean

  codeResturant: string;
  total: number;
  nameTable: string;
  nameUser: string;


  constructor(
    private dataService: DataService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {

    //  if(sessionStorage.getItem("restView")==="si"){

    this.resturantView = false;
    this.dataService.getStores()
      .subscribe(data => this.resturantList$ = data)
    //  }

    this.dataService.getMyQr().subscribe(
      (res) => {
        
        console.log("qrCode utente: "+res)
        localStorage.setItem("myQr",res)
        
      },
      (err) => console.log(err)
    );

    this.dataService.getOrdersByUserId(0).subscribe({
      next: (response: OrderFullData[]) => {     
        this.orderUserList$ = response

        this.orderUserList$.reverse();

        for(let i=0; i<this.orderUserList$.length;i++){
          this.total = 0
          for(let j=0; j<this.orderUserList$[i].items.length;j++){
            this.total=this.total+(this.orderUserList$[i].items[j].item.price * this.orderUserList$[i].items[j].quantity)
          }

          this.totalList[i] = this.total
          
        }
       
        //this.nameTable = this.orderUserList$[this.orderUserList$.length-1].note
        
        
        
      },error:()=>{
        this.errorShowOrdersMessage = false;
      }
    });


    
   
     


    let email = localStorage.getItem("user")
    let n = email.indexOf("@")
    this.nameUser = email.substring(0,n)

    this.total=0


  }

  newOrder(){
    this.resturantView = true;
  }

  oldOrder(){
    this.orderView = true;
  }

  showDetail(i){
    this.detailView[i] = true
  }

  hideDetail(i){
    this.detailView[i] = false
  }

  codeResturantOnKey(event) { this.codeResturant = event.target.value; }


  cerca() {
    this.router.navigate(['menu/' + this.codeResturant]);
  }

  goBack(){
    this.resturantView = false
    this.orderView = false
  }

}
