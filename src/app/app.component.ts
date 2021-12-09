import {Component, OnInit} from '@angular/core';
import {routes} from './app-routing.module'
import {AuthenticationService} from './services/authentication.service';
import {Router} from '@angular/router';
import {MaintenanceService} from './services/maintenance.service';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public routes = routes.map(r => r.path);
  public isDown$ = this.maintenance.isDown();

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private maintenance: MaintenanceService
  ) {
  }

  public logout() {
    this.authenticationService.logout()
    this.goHome()
  }

  public canDisconnect() {
    return this.authenticationService.isAuthenticated();
  }

  public goHome() {
    this.isDown$.subscribe((isDown) => {
      this.router.navigate(isDown ? ['/', 'maintenance'] : ['/'])
    })
  }

  public ngOnInit(): void {
    this.isDown$.pipe(filter(idDown => idDown)).subscribe((isDown) => {
      this.router.navigate(['/', 'maintenance'])
    })
  }
}
