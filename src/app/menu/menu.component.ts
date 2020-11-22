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
  menulist$: Menu[];


  constructor(
    private dataService: DataService,
    private readonly router: Router,
    private route: ActivatedRoute) 
    {  }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => this.qrResturant = params['id']);

    console.log("scelto il ristorante con qr code: "+this.qrResturant)
    
    this.dataService.getMenuByQr(this.qrResturant).subscribe({
      next: (response: Menu[]) => {
        this.menulist$ = response        
      }
    });

    /*
    this.domandaNido$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.domandaService.getDomandaNidoById(parseInt(params.get('id')))
      )
    );
    // richiamo il dettaglio della domanda sul service della domanda
    this.domandaNido$.subscribe({
      next: (data: DomandaNido) => {
        this.domandaNido = data;
        console.log('domandaNido: ' + JSON.stringify(this.domandaNido));
        this.statusSearchDomanda = false;
      },
      error: (data: SrvError) => {
        console.log('Errore: ' + JSON.stringify(data));
        this.statusSearchDomanda = false;

        this.globalError = true;
        setTimeout(() => {
          this.globalError = false;
        }, 9000);
      },
    });
*/

  }

}
