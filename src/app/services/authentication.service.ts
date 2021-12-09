import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {catchError, map} from 'rxjs/operators';
import * as _ from 'lodash';
import {ApiResponse} from '../models/api-response';
import {Router} from '@angular/router';

const ENDPOINT = '/users';
const LOCAL_STORAGE_USER_KEY = 'userData';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient, private router: Router) {
  }

  public getUsername(): string {
    const user = this.getCacheAuthUser();
    if (!user || !user.username) {
      throw Error('User has to be authenticated.')
    }

    return user.username;
  }

  public logout() {
    this.cacheAuthUser(null);
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    const user = this.getCacheAuthUser();
    return !!user;
  }

  public register(registerRequestData: { password: string, password_confirm: string, username: string }): Observable<true | string[]> {
    return this.httpClient.post<ApiResponse>(environment.apiUrl + ENDPOINT + '/register', registerRequestData).pipe(
      catchError((e) => this.handleError(e)),
      map((response) => this.handleLogin(response))
    )
  }

  public login(credentials: { username: string; password: string }): Observable<true | string[]> {
    return this.httpClient.post<ApiResponse>(environment.apiUrl + ENDPOINT + '/login', credentials).pipe(
      catchError((e) => this.handleError(e)),
      map(response => this.handleLogin(response))
    );
  }

  private cacheAuthUser(user: { username: string, token: string } | null) {
    if (user === null) {
      window.localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    } else {
      window.localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
    }
  }

  private getCacheAuthUser() {
    const rawCache = window.localStorage.getItem(LOCAL_STORAGE_USER_KEY);

    if (_.isString(rawCache))
      return JSON.parse(rawCache)

    return null;
  }

  private handleLogin(response: ApiResponse) {
    if (!!response && !!response.errors) {
      return response.errors;
    }

    if (!!response && !!response.data
      && !!response.data.username && _.isString(response.data.username)
      && !!response.data.token && _.isString(response.data.token)) {
      this.cacheAuthUser(response.data)
      return true;
    }

    return ['Une erreur a eu lieu.']
  }

  private handleError(data: HttpErrorResponse): Observable<ApiResponse> {
    return of({data: null, errors: _.get(data, 'error.errors', ['Le serveur a rencontré une erreur !'])});
  }
}
