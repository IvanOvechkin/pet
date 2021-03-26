import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject, Subject} from 'rxjs';

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

export interface ICategory {
  limit: number;
  title: string;
  id: string;
}

type TCategory = ICategory[] | null;


@Injectable({
  providedIn: 'root'
})
export class StoreService {

  userInfo: IUserInfo = {
    name: 'NoName',
    bill: 0
  };
  currency: ICurrency;
  categories: TCategory = null;

  constructor() { }

  userInfo$ = new BehaviorSubject<IUserInfo>(this.userInfo);
  currency$ = new BehaviorSubject<ICurrency>(this.currency);
  categories$ = new BehaviorSubject<TCategory>(this.categories);

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

  public getCategories(): Observable<TCategory> {
    return this.categories$.asObservable();
  }

  public setCategories(categories: TCategory): void {
    this.categories$.next(categories);
  }
}
