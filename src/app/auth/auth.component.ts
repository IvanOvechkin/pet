import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {from, Subscription} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {ToastService} from '../plugins/toast/toast.service';
import {AngularFireDatabase} from "@angular/fire/database";
import {StoreService} from "../services/store/store.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  public authForm: FormGroup;
  public load = false;
  private subscribe: Subscription;

  constructor(private router: Router,
              private authFireBase: AngularFireAuth,
              private db: AngularFireDatabase,
              private storeService: StoreService,
              private toastService: ToastService) { }

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

    this.auth();
  }

  private auth(): void {
    this.load = true;
    const {email, password} = this.authForm.value;
    this.subscribe = from(this.authFireBase.signInWithEmailAndPassword(email, password))
      .pipe(
        map(res => res.user.uid),
        switchMap(uid => this.db.object(`/users/${uid}/info`).valueChanges())
      )
      .subscribe(userInfo => {
        this.storeService.setUserInfo(userInfo);
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
