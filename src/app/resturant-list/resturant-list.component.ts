import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Resturant } from '../resturant.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-resturant-list',
  templateUrl: './resturant-list.component.html',
  styleUrls: ['./resturant-list.component.css']
})
export class ResturantListComponent implements OnInit {
  resturantView: boolean = false
  resturantList$: Resturant[];
  codeResturant: string;


  constructor(
    private dataService: DataService,
    private readonly router: Router
    ) { }

  ngOnInit(): void {

   //  if(sessionStorage.getItem("restView")==="si"){
     
      this.resturantView = true;
      this.dataService.getResturantList()
       .subscribe(data=> this.resturantList$ = data)
   //  }

    
  }

  codeResturantOnKey(event) { this.codeResturant = event.target.value; }
  

  cerca(){
    this.router.navigate(['menu/'+this.codeResturant]);
  }

}
