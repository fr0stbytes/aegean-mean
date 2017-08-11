import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarTopComponent } from './components/navbar/navbar-top/navbar-top.component';
import { NavbarBottomComponent } from './components/navbar/navbar-bottom/navbar-bottom.component';
import { SightseeingComponent } from './components/sightseeing/sightseeing.component';
import { EatAndDrinkComponent } from './components/eat-and-drink/eat-and-drink.component';
import { RegisterComponent } from './components/navbar/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    NavbarTopComponent,
    NavbarBottomComponent,
    SightseeingComponent,
    EatAndDrinkComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
