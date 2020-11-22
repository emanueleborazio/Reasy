import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { TokenInterceptor } from './TokenInterceptor';
import { ResturantListComponent } from './resturant-list/resturant-list.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditResturantMenuComponent } from './edit-resturant-menu/edit-resturant-menu.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ResturantListComponent,
    HomeComponent,
    EditResturantMenuComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    
  ],
  providers: [
    //DataService
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
