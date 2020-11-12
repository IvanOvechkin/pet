import { Injectable } from '@angular/core';
import {
  AbstractApiService,
  IRegistrationUserParams,
  IUserData,
  IUserLogPass
} from './abstract-api.service.';
import {Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements AbstractApiService {

  private url = 'https://angular-crm-11d38.firebaseio.com';

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
}


