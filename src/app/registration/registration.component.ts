import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {from, Subscription} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {ToastService} from '../plugins/toast/toast.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  public registrationForm: FormGroup;
  public load = false;
  private subscribe: Subscription;

  constructor(private router: Router,
              private authFireBase: AngularFireAuth,
              private db: AngularFireDatabase,
              private toastService: ToastService) { }

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
      userName: new FormControl(null, [
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

    this.registration();
  }

  private registration(): void {
    this.load = true;
    const {email, password, userName} = this.registrationForm.value;
    this.subscribe = from(this.authFireBase.createUserWithEmailAndPassword(email, password))
      .pipe(
        map(user => user.user.uid),
        switchMap(uid => this.db.object(`/users/${uid}/info`).set({bill: 1000, name: userName}))
      )
      .subscribe(val => {
        this.load = false;
        this.router.navigate(['/main/profile']);
      }, err => {
        this.toastService.show({type: 'warning', text: err.message});
      });
  }

  ngOnDestroy(): void {
    this.subscribe?.unsubscribe();
  }
}
