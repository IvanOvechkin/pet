import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

export interface IUserData {
  id: string;
  userInfo: IUserInfo;
}

export interface IUserRegistrationParams {
  email: string;
  password: string;
  name: string;
}

export interface IUserLoginParams {
  email: string;
  password: string;
}

export interface IUserInfo {
  bill: number;
  name: string;
}

export interface ICurrency {
  base: string;
  date: string;
  rates: {
    EUR: number;
    RUB: number;
    USD: number;
  };
}

export interface ICategory {
  limit: number;
  title: string;
  id?: string;
}

export interface IRecord {
  amount: number;
  categoryId: string;
  date: string;
  description: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractApiService {
  abstract authUser(params: IUserLoginParams): Observable<string | Error>;
  abstract logOutUser(): Observable<string | Error>;
  abstract createUser(params: IUserRegistrationParams): Observable<string | Error>;
  abstract getUserInfo(): Observable<IUserData>;
  abstract setUserInfo(params: IUserInfo): Observable<IUserInfo | Error>;
  abstract setUserName(name: string): Observable<string | Error>;
  abstract fetchCurrency(): Observable<ICurrency | Error>;
  abstract getCategories(): Observable<ICategory[] | Error>;
  abstract createCategory(params: ICategory): Observable<ICategory | Error>;
  abstract editCategory(params: ICategory): Observable<ICategory | Error>;
  abstract createRecord(params: IRecord): Observable<IRecord | Error>;
  abstract setUserBill(bill: number): Observable<number | Error>;
}
