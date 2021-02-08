import { Component, OnInit } from '@angular/core';
import {StoreService, ICurrency} from '../services/store/store.service';
import {combineLatest, Observable, of} from 'rxjs';
import {ApiService} from '../api/services/api.service';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {

  currency$: Observable<ICurrency> = this.storeService.getCurrancy()
    .pipe(
      switchMap(val => {
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

  base$: Observable<any> = combineLatest(
    this.storeService.getCurrancy(),
    this.storeService.getUserInfo()
  ).pipe(
      map(val => {
        const base = val[1].bill / (val[0].rates['RUB'] / val[0].rates['EUR']);
        const kyes = Object.keys(val[0].rates);
        const values = {};
        kyes.forEach(key => {
          values[key] = Math.floor(base * val[0].rates[key]);
        });
        return values;
      })
  );

  constructor(private storeService: StoreService,
              private apiService: ApiService) { }

  ngOnInit(): void {
  }

}
