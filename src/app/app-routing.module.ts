import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { ControlMenuComponent } from './control-menu/control-menu.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { ResturantListComponent } from './resturant-list/resturant-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'lista', component: ResturantListComponent },
  { path: 'ristoratore', component:  ControlMenuComponent},
  { path: 'menu/:id/:name', component: MenuComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  constructor(private router: Router) {
    this.router.errorHandler = (error: any) => {
        this.router.navigate(['404']); // or redirect to default route
    }
  }
}
