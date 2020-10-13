import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HiddenHavService {
  private hiddenNav: boolean = false;
  private hiddenNav$ = new BehaviorSubject<boolean>(this.hiddenNav);

  public getCurrentHiddenState(): boolean {
    return this.hiddenNav$.getValue();
  }

  public getHiddenState() {
    return this.hiddenNav$.asObservable();
  }

  public setHiddenState() {
    this.hiddenNav = !this.hiddenNav;
    this.hiddenNav$.next(this.hiddenNav);
  }
}
