import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ToastService} from "../plugins/toast/toast.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../store/state/app.state";
import {selectCategories, selectUserBill} from "../store/selectors/app.selectors";
import {createRecord, getCategories} from "../store/actions/app.actions";

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit, OnDestroy {

  categories$ = this.store.select(selectCategories);
  subscriptionUserBill: Subscription = this.store.select(selectUserBill).subscribe(bill => {
    this.userBill = bill;
    this.loadNewRecord = false;
  });

  userBill: number;
  category: any;

  public newRecordForm: FormGroup;
  public loadNewRecord: boolean = false;

  constructor(private store: Store<AppState>,
              private toastService: ToastService) { }

  ngOnInit(): void {
    this.store.dispatch(getCategories());

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
        text: `Недостаточно средств на счете (${this.newRecordForm.value['amount'] - this.userBill})`
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

    const bill = record.type === 'income'? this.userBill + record.amount: this.userBill - record.amount;
    this.newRecordForm.reset({amount: 1, description: null});
    this.store.dispatch(createRecord({bill, record}));
  }

  private canCreateRecord() {
    if (this.newRecordForm.value['type'] === 'income') {
      return true;
    }

    return this.userBill >= this.newRecordForm.value['amount'];
  }

  ngOnDestroy(): void {
    this.subscriptionUserBill.unsubscribe();
  }
}
