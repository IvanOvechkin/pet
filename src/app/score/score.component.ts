import {Component, OnInit} from '@angular/core';
import {ICurrency} from '../api/services/abstract-api.service.';
import {combineLatest, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Store} from "@ngrx/store";
import {AppState} from "../store/state/app.state";
import {selectCurrency, selectUserBill} from "../store/selectors/app.selectors";
import {fetchCurrency, resetCurrency} from "../store/actions/app.actions";

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {

  currency$: Observable<ICurrency> = this.store.select(selectCurrency).pipe(
    tap(curency => {
      if (!curency) {
        this.store.dispatch(fetchCurrency());
      }
    })
  );

  bases$: Observable<any> = combineLatest(
    this.currency$,
    this.store.select(selectUserBill)
  ).pipe(
    map(val => {
      if (val[0] !== null) {
        const base = val[1] / (val[0].rates['RUB'] / val[0].rates['EUR']);
        const values = {};
        Object.keys(val[0].rates).forEach(key => values[key] = Math.floor(base * val[0].rates[key]));
        return values;
      }
      return null;
    })
  );

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  refresh() {
    this.store.dispatch(resetCurrency());
  }
}
