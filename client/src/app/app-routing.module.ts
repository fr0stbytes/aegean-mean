import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { SightseeingComponent } from './components/sightseeing/sightseeing.component';
import { EatAndDrinkComponent } from './components/eat-and-drink/eat-and-drink.component';


const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'sightseeing',
    component: SightseeingComponent
  },
  {
    path: 'eat-and-drink',
    component: EatAndDrinkComponent
  },

];

@NgModule ({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})

export class AppRoutingModule{}
