import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { IsAnonymousGuard } from './guard/is-anonymous.guard';
import { AnonymousHomeComponent } from './page-components/anonymous-home/anonymous-home.component';
import { DiscoverComponent } from './page-components/discover/discover.component';
import { HomeComponent } from './page-components/home/home.component';
import { LoginComponent } from './page-components/login/login.component';
import {RegisterComponent} from './page-components/register/register.component';
import { RulesComponent } from './page-components/rules/rules.component';
import {IsAuthenticatedGuard} from './guard/is-authenticated.guard';
import {MaintenanceComponent} from './page-components/maintenance/maintenance.component';

export const routes: Routes = [
  {
    path: '',
    component: AnonymousHomeComponent,
    canActivate: [IsAnonymousGuard]
  }, {
    path: 'home',
    component: HomeComponent,
    canActivate: [IsAuthenticatedGuard]
  }, {
    path: 'login',
    component: LoginComponent,
    canActivate: [IsAnonymousGuard]
  }, {
    path: 'register',
    component: RegisterComponent,
    canActivate: [IsAnonymousGuard]
  }, {
    path: 'discover',
    component: DiscoverComponent,
    canActivate: [IsAuthenticatedGuard]
  }, {
    path: 'rules',
    component: RulesComponent
  }, {
    path: 'maintenance',
    component: MaintenanceComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
