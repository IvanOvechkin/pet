import { Component, OnInit } from '@angular/core';
import {StoreService, ICurrency} from '../services/store/store.service';
import {combineLatest, Observable, of} from 'rxjs';
import {ApiService} from '../api/services/api.service';
import {map, mergeMap, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {

  currency$: Observable<ICurrency> = this.storeService.getCurrancy()
    .pipe(
      mergeMap(val => {
        if (!val) {
          return this.apiService.fetchCurrency().pipe(
            switchMap(res => of(this.storeService.setCurrancy(res))
              .pipe(
                switchMap(res => this.storeService.getCurrancy())
              )
            )
          );
        }
        return of(val);
      })
    );

  bases$: Observable<any> = combineLatest(
    this.storeService.getCurrancy(),
    this.storeService.getUserInfo()
  ).pipe(
      map(val => {
        if (val[0] !== null) {
          const base = val[1].bill / (val[0].rates['RUB'] / val[0].rates['EUR']);
          const kyes = Object.keys(val[0].rates);
          const values = {};
          kyes.forEach(key => {
            values[key] = Math.floor(base * val[0].rates[key]);
          });
          return values;
        }
        return null;
      })
  );

  constructor(private storeService: StoreService,
              private apiService: ApiService) { }

  ngOnInit(): void {
  }

  refresh() {
    this.storeService.setCurrancy(null);
  }
}
