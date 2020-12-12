import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../contact.model';
import { Item } from '../item.model';
import { Items } from '../items.model';
import { Menu2 } from '../menu2.model';
import { OrderFullData } from '../orderFullData.model';
import { ResturantMenu } from '../resturantMenu.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-control-menu',
  templateUrl: './control-menu.component.html',
  styleUrls: ['./control-menu.component.css']
})
export class ControlMenuComponent implements OnInit {
  editMenuView: boolean;
  editResturantView: boolean;
  authUserView: boolean;
  insertView: boolean;
  showContactView: boolean;
  showContactFormView: boolean;
  showOrdersByUserId: boolean;
  showOrdersFormView: boolean;

  deleteViewMessage: boolean
  errorDeleteViewMessage: boolean

  addViewMessage: boolean
  errorAddViewMessage: boolean

  errorShowContactMessage: boolean

  errorShowOrdersMessage: boolean

  contactDay: string;
  nameItem: string;
  priceItem: string;
  nameResturantNew: string;
  cityResturantNew : string;
  qrUser: string;
  qrUserOrders: string;
  note: string;
  resData: any;
  dayAuth: string;
  total: number;
  nameTable: string;
  nameResturant: string;
  cityResturant: string;

  menulist$: ResturantMenu;
  itemEditMenuList$: Item[];
  itemList$: Item[];
  contactList$: Contact[];
  orderUserList$: OrderFullData[];
  itemsOrder$: Items[];
  

  constructor(
    private dataService: DataService,
    private readonly router: Router
    ) { }

  ngOnInit(): void {
    //VIEW
    this.editMenuView = false;
    this.editResturantView = false;
    this.authUserView = false;
    this.insertView = false;
    this.showContactView = false;
    this.showContactFormView = false;
    this.showOrdersByUserId = false;
    this.showOrdersFormView = false;


    //MESSAGE
    this.deleteViewMessage = false;
    this.errorDeleteViewMessage = false;
    this.addViewMessage = false;
    this.errorAddViewMessage = false;
    this.errorShowContactMessage = false;
    this.errorShowOrdersMessage = false;


    this.dataService.getMenu().subscribe({
      next: (response: ResturantMenu) => {
        this.menulist$ = response  
        this.itemEditMenuList$  = this.menulist$.items  
        this.nameResturant = this.menulist$.store.name 
        this.cityResturant = this.menulist$.store.city
      }
    });

   

  }

  editResturant(){
    this.editResturantView = true;
  }
  editMenu(){
    this.editMenuView = true;
  }
  autorizzaQr(){
    this.authUserView = true;
  }
  storicoIngressi(){
    this.showContactFormView = true;
  }
  ordini(){
    this.showOrdersByUserId = true;
  }


  editResturantButton(){
    
    let input = new FormData();
    input.append('name',this.nameResturantNew)
    input.append('city',this.cityResturantNew)

    this.dataService.getModStore(input).subscribe((data: any) => {
      this.resData = data;
      console.log(this.resData);
    });
    this.editResturantView = false;

  }

  authUserButton(){
    let input = new FormData();
    input.append('userToken',this.qrUser)
    input.append('note',this.note)
    if(this.dayAuth!=undefined)
    input.append('days',this.dayAuth)
    this.dataService.setAuthUser(input).subscribe((data: any) => {
      this.resData = data;
      console.log(this.resData);
    });
    
    this.authUserView = false;


  }

  deleteItem(id){
    console.log("elimino item con id: "+id)
    this.dataService.deleteItemMenu(id).subscribe({
      next: (response: String) => {
        this.deleteViewMessage = true     
        this.refreshMenu()
      },
      error: error => {

        this.errorDeleteViewMessage = true;
      }
    });

  }

  refreshMenu(){

    this.dataService.getMenu().subscribe({
      next: (response: ResturantMenu) => {
        this.menulist$ = response  
        this.itemEditMenuList$  = this.menulist$.items  
        this.nameResturant = this.menulist$.store.name 
        this.cityResturant = this.menulist$.store.city
      }
    });

    setTimeout(()=>{
      this.addViewMessage = false;
      this.deleteViewMessage = false;
    },2000)
    
  }

  

  addItemView(){
    this.insertView = true;
  }

  addItemButton(){
   
    var input = {
      items:[
        {
          "name": this.nameItem,
          "price": this.priceItem
        }
      ]
    }

    this.dataService.addItemMenu(input).subscribe((data: any) => {
      this.resData = data;
      console.log(this.resData);
      this.addViewMessage = true;
    },
    error => {

      this.errorAddViewMessage = true;
    }
    );
    this.insertView = false;
    this.refreshMenu();

  }

  showContactButton(){

    this.dataService.getShowContact(this.contactDay).subscribe({
      next: (response: Contact[]) => {     
        this.contactList$ = response
      
      },error:()=>{
        this.errorShowContactMessage = false;
      }
    });
  


    this.showContactView = true;
  }

  showOrdersButton(){ 
    this.total=0;
    this.dataService.getOrdersByUserId(this.qrUserOrders).subscribe({
      next: (response: OrderFullData[]) => {     
        this.orderUserList$ = response
        this.itemsOrder$ = this.orderUserList$[this.orderUserList$.length-1].items
       
        for(let i=0; i<this.itemsOrder$.length;i++){
          this.total=this.total+(this.itemsOrder$[i].item.price * this.itemsOrder$[i].quantity)
        }
        
        this.nameTable = this.orderUserList$[this.orderUserList$.length-1].note
        
        
        
      },error:()=>{
        this.errorShowOrdersMessage = false;
      }
    });
    
    this.showOrdersFormView = true;
    
    
    console.log("ordini")
  }


  qrCodeOnKey(event){ this.qrUserOrders = event.target.value; }

  showContactOnKey(event){ this.contactDay = event.target.value; }

  nameItemOnKey(event) { this.nameItem = event.target.value; }
  priceItemOnKey(event) { this.priceItem = event.target.value; }

  nameResturantOnKey(event) { this.nameResturantNew = event.target.value; }
  cityResturantOnKey(event) { this.cityResturantNew = event.target.value; }

  qrClienteOnKey(event) { this.qrUser = event.target.value; }
  noteOnKey(event) { this.note = event.target.value; }
  dayOnKey(event) { this.dayAuth = event.target.value; }
}
