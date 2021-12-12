import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './page-components/register/register.component';
import { LoginComponent } from './page-components/login/login.component';
import { DiscoverComponent } from './page-components/discover/discover.component';
import { HomeComponent } from './page-components/home/home.component';
import { AnonymousHomeComponent } from './page-components/anonymous-home/anonymous-home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { WallNameComponent } from './components/wall-name/wall-name.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { SnowDirective } from './directives/snow/snow.directive';
import {MatCardModule} from '@angular/material/card';
import { RulesComponent } from './page-components/rules/rules.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { MaintenanceComponent } from './page-components/maintenance/maintenance.component';
import {AuthInterceptor} from './interceptor/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DiscoverComponent,
    HomeComponent,
    AnonymousHomeComponent,
    WallNameComponent,
    SnowDirective,
    RulesComponent,
    MaintenanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
