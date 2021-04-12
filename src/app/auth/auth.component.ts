import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Store} from "@ngrx/store";
import {userLogin} from "../store/actions/app.actions";
import {selectUserInfo} from "../store/selectors/app.selectors";
import {AppState} from "../store/state/app.state";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  public authForm: FormGroup;
  public load: boolean = false;

  subscriptionUserInfo$: Subscription = this.store.select(selectUserInfo).subscribe(userInfo => {
    this.load = false;
    if (userInfo) {
      this.router.navigate(['/main/profile']);
    }
  });


  constructor(private router: Router,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl(null, [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  submit(): void {
    if (this.authForm.invalid) {
      const controls = this.authForm.controls;
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    this.load = true;
    this.store.dispatch(userLogin(this.authForm.value));
  }

  ngOnDestroy(): void {
    this.subscriptionUserInfo$.unsubscribe();
  }
}
