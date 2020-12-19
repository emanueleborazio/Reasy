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
  resturantName: string;


  orderUserList$: OrderFullData[];
  orderUserListCustom$: OrderFullData[];
  closeOrderList: number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  detailView: boolean[] = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]

  resturantListWA: OrderFullData[]; //todo cambiare nel caso di lavoro su più ristoranti
  
  idOld: number = 0;


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
        this.resturantListWA = response

        //workaround
        this.resturantListWA = this.resturantListWA.filter(idR => idR.id === this.resturantListWA[0].id)


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
      
        this.orderUserList$ = this.orderUserList$.filter(x => x.id
        )

        if(this.orderUserList$.length>0){
          this.noRes = false;
          
          this.orderUserList$ = this.orderUserList$.sort((a,b)=>a.createdAt.localeCompare(b.createdAt))
          this.orderUserListCustom$ = this.orderUserList$
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
  
  openOrder(resturantId, resturantName){
    console.log("scelto ristorante con id: "+resturantId)

    this.orderUserListCustom$ = this.orderUserListCustom$.filter(id => id.store.id === resturantId)

    this.resturantName = resturantName
    this.resturantId = resturantId;
    this.manageOrderView = true;
    this.resturantListView = false;

  }
  authorization(){
    this.myQr = localStorage.getItem("myQr")
    this.authView = true;
  }

  workingOrder(i){
    //todo call service

    this.closeOrderList[i] = 1
  }
  closeOrder(i){
    //todo

    this.orderUserList$ = this.orderUserList$.filter(rem => rem.id !== this.orderUserList$[i].id)
    this.closeOrderList[i] = 2
  }

  showDetail(i){
    this.detailView[i] = true
  }

  hideDetail(i){
    this.detailView[i] = false
  }
}
