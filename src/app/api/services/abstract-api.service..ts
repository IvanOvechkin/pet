import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

export interface IRegistrationUserParams {
  email: string;
  password: string;
  userName: string;
}

export interface IUserData {
  name?: string;
  id: string;
  email: string;
  userName: string;
}

export interface IUserLogPass {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractApiService {
  abstract authUser(params: IUserLogPass): Observable<IUserData | Error>;
  abstract createUser(params: IRegistrationUserParams): Observable<IUserData | Error>;
  abstract updateUserData(params: any): Observable<any>;
  abstract fetchCurrency(): Observable<any>;
}
