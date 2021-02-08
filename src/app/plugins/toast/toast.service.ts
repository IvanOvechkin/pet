import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

export interface IToast {
  show: boolean;
  type?: string;
  text?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toast$ = new Subject<IToast>();

  constructor() { }

  public getToast(): Observable<IToast> {
    return this.toast$.asObservable();
  }

  public show(params): void {
    this.toast$.next({...params, show: true});
    setTimeout(() => {
      this.toast$.next({show: false});
    }, 2000);
  }

  public hide(): void {
    this.toast$.next({show: false});
  }
}
