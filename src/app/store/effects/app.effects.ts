import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import {catchError, delay, map, mergeMap, switchMap, tap} from "rxjs/operators";
import * as AppActions from "../actions/app.actions";
import {ApiService} from "../../api/services/api.service";
import {of} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../state/app.state";
import {createRecordSuccess, getUserInfo} from "../actions/app.actions";
import {ToastService} from "../../plugins/toast/toast.service";

@Injectable()
export class AppEffects {

  userLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.userLogin),
      switchMap(action => this.apiService.authUser({email: action.email, password: action.password}).pipe(
        map(userId =>  AppActions.userLoginSuccess({userId})),
        tap(res => this.store.dispatch(getUserInfo())),
        catchError(error => of(AppActions.userLoginFailure({error})))
      ))
    );
  });

  userCreate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.userCreate),
      mergeMap((action) => {
        return this.apiService.createUser({email: action.email, password: action.password, name: action.name}).pipe(
          switchMap(userId => this.apiService.setUserInfo({bill: 1000, name: action.name}).pipe(
            map(userInfo => AppActions.userCreateSuccess({userId, userInfo})),
            catchError(error => of(AppActions.userCreateFailure({error})))
          ))
        );
      })
    );
  });

  getUserInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.getUserInfo),
      delay(0),
      switchMap(action => this.apiService.getUserInfo().pipe(
        map(userInfo => AppActions.getUserInfoSuccess(userInfo)),
        catchError(error => of(AppActions.getUserInfoFailure({error})))
      ))
    );
  });

  setUserName$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.setUserName),
      switchMap(action => this.apiService.setUserName(action.name).pipe(
        map(name => AppActions.setUserNameSuccess({name})),
        tap(res => this.toastService.show({text: 'Данные пользователя обновлены', type: 'success'})),
        catchError(error => of(AppActions.setUserNameFailure({error})))
      ))
    );
  });

  fetchCurrency$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.fetchCurrency),
      switchMap(action => this.apiService.fetchCurrency().pipe(
        map(currency => AppActions.fetchCurrencySuccess({currency})),
        catchError(error => of(AppActions.fetchCurrencyFailure({error})))
      ))
    );
  });

  getCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.getCategories),
      switchMap(action => this.apiService.getCategories().pipe(
        map(categories => AppActions.getCategoriesSuccess({categories})),
        catchError(error => of(AppActions.getCategoriesFailure({error})))
      ))
    );
  });

  createCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.createCategory),
      switchMap(action => this.apiService.createCategory(action.category).pipe(
        map(category => AppActions.createCategorySuccess({category})),
        tap(res => this.toastService.show({type: 'success', text: 'Новая категория добавлена'})),
        catchError(error => of(AppActions.createCategoryFailure({error})))
      ))
    );
  });

  editCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.editCategory),
      switchMap(action => this.apiService.editCategory(action.category).pipe(
        map(category => AppActions.editCategorySuccess({category})),
        tap(res => this.toastService.show({type: 'success', text: 'Категория успешно обновлена'})),
        catchError(error => of(AppActions.editCategoryFailure({error})))
      ))
    );
  });

  createRecord$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.createRecord),
      mergeMap((action) => {
        return this.apiService.createRecord(action.record).pipe(
          tap(record => this.store.dispatch(createRecordSuccess(record))),
          switchMap(userId => this.apiService.setUserBill(action.bill).pipe(
            map(bill => AppActions.setUserBillSuccess({bill})),
            tap(res => this.toastService.show({type: 'success', text: 'Запись успешно добавлена'})),
            catchError(error => of(AppActions.setUserBillFailure({error})))
          )),
          catchError(error => of(AppActions.createRecordFailure({error})))
        );
      })
    );
  });

  userLogout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.userLogout),
      delay(0),
      switchMap(action => this.apiService.logOutUser())
    );
  });

  constructor(private actions$: Actions,
              private apiService: ApiService,
              private store: Store<AppState>,
              private toastService: ToastService) {
  }
}
