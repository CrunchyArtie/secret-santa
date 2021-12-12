import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authenticationService.isAuthenticated()) {
      if (request.url.endsWith('api/users/login') === false) {
        const token = this.authenticationService.getToken();
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ` + token
          }
        });
      }
    }
    return next.handle(request);
  }
}
