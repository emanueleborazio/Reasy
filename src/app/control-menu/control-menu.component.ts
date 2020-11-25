import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../menu.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-control-menu',
  templateUrl: './control-menu.component.html',
  styleUrls: ['./control-menu.component.css']
})
export class ControlMenuComponent implements OnInit {
  editView: boolean;


  menulist$: Menu[];

  constructor(
    private dataService: DataService,
    private readonly router: Router
    ) { }

  ngOnInit(): void {
    this.editView = false;



    this.dataService.getMenu().subscribe({
      next: (response: Menu[]) => {
        this.menulist$ = response        
      }
    });

  }


  editMenu(){
    this.editView = true;
  }
  autorizzaQr(){

  }
  storicoIngressi(){

  }
  storicoOrdini(){

  }


}
