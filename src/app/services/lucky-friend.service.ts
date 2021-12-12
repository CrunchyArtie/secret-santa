import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiResponse} from '../models/api-response';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

const ENDPOINT = '/lucky-friend';

@Injectable({
  providedIn: 'root'
})
export class LuckyFriendService {

  constructor(private httpClient: HttpClient) {
  }

  public getLuckyFriend(username: string): Observable<string> {
    return this.httpClient.get<ApiResponse>(environment.apiUrl + ENDPOINT + '/' + username).pipe(
      map((response) => {
        if (!!response.errors && response.errors.length > 0) {
          throw new Error(response.errors.join(' '));
        }
        return response.data;
      })
    )
  }
}
