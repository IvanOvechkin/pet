import {Injectable, OnDestroy} from '@angular/core';
import {
  AbstractApiService,
  IUserRegistrationParams,
  IUserLoginParams, IUserInfo
} from './abstract-api.service.';
import {from, Observable, of, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, delay, first, map} from 'rxjs/operators';
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFireDatabase} from "@angular/fire/database";
import {ToastService} from "../../plugins/toast/toast.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/state/app.state";
import {selectUserId} from "../../store/selectors/app.selectors";

@Injectable({
  providedIn: 'root'
})
export class ApiService implements AbstractApiService, OnDestroy {

  private userId: string = null;

  private testCurrency = {
    success: true,
    timestamp: 1611846127,
    base: "EUR",
    date: "2021-01-28",
    rates: {
      USD: 1.21304,
      EUR: 1,
      RUB: 92.301453,
    }
  };

  subscriptionUserId$: Subscription = this.store.select(selectUserId).subscribe(userId => this.userId = userId);

  private fixerEnv = 'f74b6252865dfe6682a25420a3dbb73f';

  constructor(private http: HttpClient,
              private authFireBase: AngularFireAuth,
              private db: AngularFireDatabase,
              private toastService: ToastService,
              private store: Store<AppState>) { }


  public createUser(params: IUserRegistrationParams): Observable<any> {
    return from(this.authFireBase.createUserWithEmailAndPassword(params.email, params.password))
      .pipe(
        map(user => user.user.uid),
        catchError(error => {
          this.toastService.show({type: 'warning', text: error.message});
          return error;
        })
      );
  }

  public authUser(params: IUserLoginParams): Observable<any> {
    return from(this.authFireBase.signInWithEmailAndPassword(params.email, params.password))
      .pipe(
        map(user => user.user.uid),
        catchError(error => {
          this.toastService.show({type: 'warning', text: error.message});
          return error;
        })
      );
  }

  public getUserInfo(): Observable<any> {
    return this.db.object(`/users/${this.userId}/info`).valueChanges()
      .pipe(
        map(userInfo => ({userInfo})),
        catchError(error => {
          this.toastService.show({type: 'warning', text: error.message});
          return error;
        })
      );
  }

  public setUserInfo(params: IUserInfo): Observable<any> {
    return from(this.db.object(`/users/${this.userId}/info`).set(params))
      .pipe(
        map(res => ({...params})),
        catchError(error => {
          this.toastService.show({type: 'warning', text: error.message});
          return error;
        })
      );
  }

  public setUserName(name: string): Observable<any> {
    return from(this.db.object(`/users/${this.userId}/info/name`).set(name))
      .pipe(
        map(res => name),
        catchError(error => {
          this.toastService.show({type: 'warning', text: error.message});
          return error;
        })
      );
  }

  public fetchCurrency(): Observable<any> {
    // return this.http
    //   .get(`http://data.fixer.io/api/latest?access_key=${this.fixerEnv}&symbols=USD,EUR,RUB`);
    return of(this.testCurrency)
      .pipe(
        delay(2000),
        map(res => ({base: res.base, date: res.date, rates: res.rates}))
      );
  }

  public getCategories(): Observable<any> {
    return this.db.object(`/users/${this.userId}/categories`).valueChanges()
      .pipe(
        first(),
        map(categories => Object.keys(categories).map(key => ({...categories[key], id: key}))),
        catchError(error => {
          this.toastService.show({type: 'warning', text: error.message});
          return error;
        })
      );
  }

  public createCategory(params): Observable<any> {
    return from(this.db.list(`/users/${this.userId}/categories`).push(params))
      .pipe(
        map(category => ({...params, id: category.key})),
        catchError(error => {
          this.toastService.show({type: 'warning', text: error.message});
          return error;
        })
      )
  }

  public editCategory(params): Observable<any> {
    return from(this.db.list(`/users/${this.userId}/categories`).update(params.id, {title: params.title, limit: params.limit}))
      .pipe(
        map(category => params),
        catchError(error => {
          this.toastService.show({type: 'warning', text: error.message});
          return error;
        })
      )
  }

  public createRecord(params): Observable<any> {
    return from(this.db.list(`/users/${this.userId}/records`).push(params))
      .pipe(
        map(r => params),
        catchError(error => {
          this.toastService.show({type: 'warning', text: error.message});
          return error;
        })
      )
  }

  public setUserBill(bill): Observable<any> {
    return from(this.db.object(`/users/${this.userId}/info/bill`).set(bill))
      .pipe(
        map(b => bill),
        catchError(error => {
          this.toastService.show({type: 'warning', text: error.message});
          return error;
        })
      )
  }

  public logOutUser(): Observable<any> {
    return from(this.authFireBase.signOut())
      .pipe(
        map(user => user),
        catchError(error => {
          this.toastService.show({type: 'warning', text: error.message});
          return error;
        })
      );
  }

  ngOnDestroy(): void {
    this.subscriptionUserId$.unsubscribe();
  }
}


