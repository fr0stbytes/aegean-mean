import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';

import { HomeComponent } from './components/home/home.component';
import { SightseeingComponent } from './components/sightseeing/sightseeing.component';
import { EatAndDrinkComponent } from './components/eat-and-drink/eat-and-drink.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/navbar/login/login.component';
import { RegisterComponent } from './components/navbar/register/register.component';


const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate:[NotAuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate:[NotAuthGuard]
  },
  {
    path: 'sightseeing',
    component: SightseeingComponent
  },
  {
    path: 'eat-and-drink',
    component: EatAndDrinkComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate:[AuthGuard]
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
