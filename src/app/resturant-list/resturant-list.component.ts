import { Component, OnInit } from '@angular/core';
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


  constructor(private dataService: DataService) { }

  ngOnInit(): void {

   //  if(sessionStorage.getItem("restView")==="si"){
     
      this.resturantView = true;
      this.dataService.getResturantList()
       .subscribe(data=> this.resturantList$ = data)
   //  }

    
  }

}
