import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../item.model';
import { Menu } from '../menu.model';
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


  deleteViewMessage: boolean
  errorDeleteViewMessage: boolean

  addViewMessage: boolean
  errorAddViewMessage: boolean

  nameItem: string;
  priceItem: string;
  nameResturant: string;
  cityResturant : string;
  qrUser: string;
  note: string;
  resData: any;
  dayAuth: string;

  menulist$: Menu[];
  itemList$: Item[];

  constructor(
    private dataService: DataService,
    private readonly router: Router
    ) { }

  ngOnInit(): void {
    this.editMenuView = false;
    this.editResturantView = false;
    this.authUserView = false;
    this.insertView = false;

    this.deleteViewMessage = false;
    this.errorDeleteViewMessage = false;
    this.addViewMessage = false;
    this.errorAddViewMessage = false;


    this.dataService.getMenu().subscribe({
      next: (response: Menu[]) => {
        this.menulist$ = response     
        
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

  }
  ordini(){

  }


  editResturantButton(){
    
    let input = new FormData();
    input.append('name',this.nameResturant)
    input.append('city',this.cityResturant)

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
      next: (response: Menu[]) => {
        this.menulist$ = response     
        
      }
    });
  }

  

  addItemView(){
    this.insertView = true;
  }

  addItemButton(){
    console.log("aggiungo il piatto")
    let input = new FormData();
    input.append('name',this.nameItem)
    input.append('price',this.priceItem)

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

  nameItemOnKey(event) { this.nameItem = event.target.value; }
  priceItemOnKey(event) { this.priceItem = event.target.value; }

  nameResturantOnKey(event) { this.nameResturant = event.target.value; }
  cityResturantOnKey(event) { this.cityResturant = event.target.value; }

  qrClienteOnKey(event) { this.qrUser = event.target.value; }
  noteOnKey(event) { this.note = event.target.value; }
  dayOnKey(event) { this.dayAuth = event.target.value; }
}
