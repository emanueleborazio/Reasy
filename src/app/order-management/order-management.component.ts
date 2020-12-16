import { Component, OnInit } from '@angular/core';
import { OrderFullData } from '../orderFullData.model';
import { Resturant } from '../resturant.model';
import { DataService } from '../services/data.service';
import { Store } from '../store.model';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {
  manageOrderView: boolean;
  authView: boolean;
  resturantListView: boolean;

  
  errorShowOrdersMessage: boolean;
  
  nameUser: string;
  myQr: string;
  resturantId: number;
  noRes: boolean;
  noOrd: boolean;


  orderUserList$: OrderFullData[];
  orderUserListFull$: OrderFullData[];


  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit(): void {

    this.errorShowOrdersMessage = false;

    this.manageOrderView = false
    this.authView = false

    let email = localStorage.getItem("user")
    let n = email.indexOf("@")
    this.nameUser = email.substring(0,n)

    this.dataService.getMyQr().subscribe(
      (res) => {
        
        console.log("qrCode utente: "+res)
        localStorage.setItem("myQr",res)
        
      },
      (err) => console.log(err)
    );


    this.dataService.getOrdersList().subscribe({
      next: (response: OrderFullData[]) => {     
        this.orderUserList$ = response
        //this.orderUserListFull$ = response

       // this.orderUserList$.reverse();
       //this.orderUserListFull$.reverse();


        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        var todayS = yyyy + '-' + mm + '-' + dd + 'T00:00:01';

        this.orderUserList$ = this.orderUserList$.filter(oggi => oggi.createdAt > todayS)
        this.orderUserList$ = this.orderUserList$.filter(oggi => oggi.items.filter( todo => todo.status === "In carico"))

        this.orderUserList$ = this.orderUserList$.filter((thing, index, self) =>
            index === self.findIndex((t) => (
             t.id === thing.id
        ))
      )
        

        if(this.orderUserList$.length>0){
          this.noRes = false;
          
          this.orderUserList$ = this.orderUserList$.sort((a,b)=>a.createdAt.localeCompare(b.createdAt))
          this.orderUserList$ = this.orderUserList$.sort((a,b)=>a.store.name.localeCompare(b.store.name))
        }else{
          this.noRes = true;
        }

      },error:()=>{
        this.errorShowOrdersMessage = true;
      }
    });


  }

  resturantList(){
    
    this.resturantListView = true;
  }
  
  openOrder(resturantId){
    console.log("scelto ristorante con id: "+resturantId)

    this.resturantId = resturantId;
    this.manageOrderView = true;

  }
  authorization(){
    this.myQr = localStorage.getItem("myQr")
    this.authView = true;
  }
}
