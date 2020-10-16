import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HiddenHavService {
  private hiddenNav = false;
  private hiddenNav$ = new BehaviorSubject<boolean>(this.hiddenNav);

  public getCurrentHiddenState(): boolean {
    return this.hiddenNav$.getValue();
  }

  public getHiddenState(): Observable<boolean> {
    return this.hiddenNav$.asObservable();
  }

  public setHiddenState(): void {
    this.hiddenNav = !this.hiddenNav;
    this.hiddenNav$.next(this.hiddenNav);
  }
}
