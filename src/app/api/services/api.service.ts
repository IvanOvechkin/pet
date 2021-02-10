import { Injectable } from '@angular/core';
import {
  AbstractApiService,
  IRegistrationUserParams,
  IUserData,
  IUserLogPass
} from './abstract-api.service.';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, delay, map, tap} from 'rxjs/operators';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements AbstractApiService {

  private url = 'https://angular-crm-11d38.firebaseio.com';

  private testCurrency = {
    success: true,
    timestamp: 1611846127,
    base: "EUR",
    date: "2021-01-28",
    rates: {
      USD: 1.21304,
      EUR: 1,
      RUB: 92.301453,
    }
  };

  private fixerEnv = 'f74b6252865dfe6682a25420a3dbb73f';

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  public authUser(params: IUserLogPass): Observable<IUserData | Error> {
    const {id} = this.localStorageService.getItem('user');
    return this.http.get<IUserData>(`${this.url}/user/${id}.json`)
      .pipe(
        catchError(err => {
          return throwError(err);
        })
      );
  }

  public createUser(params: IRegistrationUserParams): Observable<IUserData | Error> {
    return this.http.post<IUserData>(`${this.url}/user.json`, params)
      .pipe(
        map(res => {
          return {
            id: res.name,
            email: params.email,
            userName: params.userName
          };
        }),
        tap(user => {
          this.localStorageService.setItem('user', user);
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  public updateUserData(params: any): Observable<any> {
    const user = this.localStorageService.getItem('user');
    return this.http.put<any>(`${this.url}/user/${user.id}/userName.json`, params.userName)
      .pipe(
        tap(name => {
          const newUserData = {...user, userName: params.userName};
          this.localStorageService.setItem('user', newUserData);
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  public fetchCurrency(): Observable<any> {
    // return this.http
    //   .get(`http://data.fixer.io/api/latest?access_key=${this.fixerEnv}&symbols=USD,EUR,RUB`);
    return of(this.testCurrency)
      .pipe(
        delay(2000)
      );
  }
}


