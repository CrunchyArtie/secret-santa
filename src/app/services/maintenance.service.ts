import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ApiResponse} from '../models/api-response';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  public isDown(): Observable<boolean> {
    return this.httpClient.get<ApiResponse>(environment.apiUrl + '/maintenance').pipe(
      map(response => {
        if(!!response.errors && response.errors.length > 0) {
          console.error(response.errors);
          return true;
        }

        return response.data;
      }),
      catchError(err => {
        console.error(err);
        return of(true);
      })
    )
  }
}
