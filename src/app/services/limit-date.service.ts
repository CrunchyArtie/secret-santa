import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import * as moment from 'moment';
import {Moment} from 'moment';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import * as _ from 'lodash';
import {environment} from '../../environments/environment';

const ENDPOINT = '/limit-date'

@Injectable({
  providedIn: 'root'
})
export class LimitDateService {

  constructor(private httpClient: HttpClient) {
    moment.locale('fr')
  }

  public getLimitDate(): Observable<Date> {
    return this.getLimitMoment().pipe(map(m => m.toDate()));
  }

  public getUserFriendlyDate(): Observable<string> {
    return this.getLimitMoment().pipe(map(m => m.format('LLLL')));
  }

  private getLimitMoment(): Observable<Moment> {
    return this.httpClient.get<{data: string}>(environment.apiUrl + ENDPOINT)
      .pipe(
        map((response: {data: string}) => {
          const date = moment.utc(response.data);

          if (date.isValid())
            return date;
          else
            throw Error('Response must be a date.');
        })
      )
  }
}
