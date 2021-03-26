import {Component, OnDestroy, OnInit} from '@angular/core';
import {from, of, Subscription} from "rxjs";
import {map, mergeMap, switchMap} from "rxjs/operators";
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFireDatabase} from "@angular/fire/database";
import {IUserInfo, StoreService} from "../services/store/store.service";
import {ToastService} from "../plugins/toast/toast.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit, OnDestroy {

  categories$ = this.store.getCategories().pipe(
    mergeMap(cat => {
      if (!cat) {
        return from(this.authFireBase.currentUser)
          .pipe(
            map(user => user.uid),
            switchMap(uid => this.db.object(`/users/${uid}/categories`).snapshotChanges()
              .pipe(
                map(changes => {
                  const cat = changes.payload.val();
                  return Object.keys(cat).map(key => ({...cat[key], id: key}))
                }),
                switchMap(cat => of(this.store.setCategories(cat))
                  .pipe(
                    switchMap(val => this.store.getCategories())
                  )
                )
              )
            )
          );
      }
      return of(cat);
    })
  );

  subscriptionUserInfo: Subscription;
  subscriptionUserBill: Subscription;
  subscriptionUserRecords: Subscription;
  userInfo: IUserInfo;
  category: any;

  public newRecordForm: FormGroup;
  public loadNewRecord: boolean = false;

  constructor(private authFireBase: AngularFireAuth,
              private db: AngularFireDatabase,
              private store: StoreService,
              private toastService: ToastService) { }

  ngOnInit(): void {
    this.subscriptionUserInfo = this.store.getUserInfo().subscribe(info => {
      this.userInfo = info;
    });

    this.newRecordForm = new FormGroup({
      type: new FormControl('income', [
        Validators.required
      ]),
      amount: new FormControl(1, [
        Validators.required,
        Validators.pattern('[0-9]+$'),
        Validators.min(1)
      ]),
      description: new FormControl(null, [
        Validators.required
      ])
    });
  }

  onChangedSelect($event: any) {
    this.category = $event;
  }

  submitNewRecordForm() {
    if (this.newRecordForm.invalid) {
      const controls = this.newRecordForm.controls;
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    if (this.canCreateRecord()) {
      this.initCreateRecord();
    } else {
      this.toastService.show({
        type: 'warning',
        text: `Недостаточно средств на счете (${this.newRecordForm.value['amount'] - this.userInfo.bill})`
      });
    }
  }

  private initCreateRecord(): void {
    this.loadNewRecord = true;
    const record = {
      categoryId: this.category.id,
      ...this.newRecordForm.value,
      date: new Date().toJSON()
    };

    this.subscriptionUserRecords = from(this.authFireBase.currentUser)
      .pipe(
        map(user => user.uid),
        switchMap(uid => this.db.list(`/users/${uid}/records`).push(record))
      )
      .subscribe(rec => {
        const bill = record.type === 'income'? this.userInfo.bill + record.amount: this.userInfo.bill - record.amount;
        this.initUpdateUserBill(bill);
      }, err => {
        this.toastService.show({type: 'warning', text: err.message});
        this.loadNewRecord = false;
      })
  }

  private initUpdateUserBill(bill): void {
    this.subscriptionUserBill = from(this.authFireBase.currentUser).pipe(
      map(user => user.uid),
      switchMap(uid => from(this.db.object(`/users/${uid}/info/bill`).set(bill)).pipe(
        switchMap(val => from(this.authFireBase.currentUser).pipe(
          map(user => user.uid),
          switchMap(uid => from(this.db.object(`/users/${uid}/info`).valueChanges()))
        ))
      )),
    ).subscribe(userInfo => {
      this.store.setUserInfo(userInfo);
      this.toastService.show({type: 'success', text: 'Запись успешно добавлена'});
      this.newRecordForm.reset({amount: 1, description: null});
      this.loadNewRecord = false;
    }, err => {
      this.toastService.show({text: err.message, type: 'warning'});
      this.loadNewRecord = false;
    });
  }

  private canCreateRecord() {
    if (this.newRecordForm.value['type'] === 'income') {
      return true;
    }

    return this.userInfo.bill >= this.newRecordForm.value['amount'];
  }

  ngOnDestroy(): void {
    this.subscriptionUserInfo?.unsubscribe();
    this.subscriptionUserRecords?.unsubscribe();
    this.subscriptionUserBill?.unsubscribe();
  }
}
