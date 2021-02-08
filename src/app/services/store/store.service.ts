import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

export interface IUserInfo {
  bill?: number;
  name?: string;
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

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  userInfo: IUserInfo = {
    name: 'NoName',
    bill: 0
  };

  currency: ICurrency;

  constructor() { }

  userInfo$ = new BehaviorSubject<IUserInfo>(this.userInfo);
  currency$ = new BehaviorSubject<ICurrency>(this.currency);

  public getUserInfo(): Observable<IUserInfo> {
    return this.userInfo$.asObservable();
  }

  public setUserInfo(userInfo): void {
    this.userInfo$.next(userInfo);
  }

  public clearUserInfo(): void {
    this.userInfo$.next({});
  }

  public getCurrancy(): Observable<ICurrency> {
    return this.currency$.asObservable();
  }

  public setCurrancy(currency): void {
    this.currency$.next(currency);
  }
}
