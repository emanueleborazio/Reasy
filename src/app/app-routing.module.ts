import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ResturantListComponent } from './resturant-list/resturant-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'lista', component: ResturantListComponent }
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
