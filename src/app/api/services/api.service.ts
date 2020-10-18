import { Injectable } from '@angular/core';
import {Api, UserData, UserLogPass} from './api';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements Api {

  constructor(private http: HttpClient) { }

  public Auth(params: UserLogPass): Observable<UserData> {
    return this.http.get<UserData>('mocks/user-data.json')
      .pipe(delay(2000));
  }
}


