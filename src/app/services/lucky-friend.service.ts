import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LuckyFriendService {

  constructor() { }

  public getLuckyFriend(username: string): Observable<string> {
    return of('Romane')
  }
}
