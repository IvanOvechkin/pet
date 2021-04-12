import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {Subscription} from "rxjs";
import {selectUserName} from "../store/selectors/app.selectors";
import {Store} from "@ngrx/store";
import {AppState} from "../store/state/app.state";
import {setUserName} from "../store/actions/app.actions";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public updateNameForm: FormGroup;
  public load = false;

  subscriptionUserName$: Subscription = this.store.select(selectUserName).subscribe(userName => {
    this.load = false;
    if (userName) {
      this.updateNameForm = new FormGroup({
        name: new FormControl(userName, [
          Validators.required
        ])
      });
    }
  });

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  public submit(): void {
    if (this.updateNameForm.invalid) {
      const controls = this.updateNameForm.controls;
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    this.load = true;
    this.store.dispatch(setUserName(this.updateNameForm.value));
  }

  ngOnDestroy(): void {
    this.subscriptionUserName$.unsubscribe();
  }
}
