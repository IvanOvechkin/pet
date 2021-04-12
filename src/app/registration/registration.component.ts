import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {userCreate} from "../store/actions/app.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../store/state/app.state";
import {selectUserInfo} from "../store/selectors/app.selectors";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  public registrationForm: FormGroup;
  public load = false;

  subscriptionUserInfo$: Subscription = this.store.select(selectUserInfo).subscribe(userInfo => {
    this.load = false;
    if (userInfo) {
      this.router.navigate(['/main/profile']);
    }
  });

  constructor(private router: Router,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      email: new FormControl(null, [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
      name: new FormControl(null, [
        Validators.required
      ]),
      agree: new FormControl(false)
    });
  }

  submit(): void {
    if (this.registrationForm.invalid) {
      const controls = this.registrationForm.controls;
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    this.load = true;
    const {email, password, name} = this.registrationForm.value;
    this.store.dispatch(userCreate({email, password, name}));
  }

  ngOnDestroy(): void {
    this.subscriptionUserInfo$.unsubscribe();
  }
}
