import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
export class AppRoutingModule { }
