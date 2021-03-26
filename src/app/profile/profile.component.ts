import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {ToastService} from '../plugins/toast/toast.service';
import {StoreService} from "../services/store/store.service";
import {AngularFireDatabase} from "@angular/fire/database";
import {AngularFireAuth} from "@angular/fire/auth";
import {from, Subscription} from "rxjs";
import {map, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public updateNameForm: FormGroup;
  public load = false;
  private subscriptionUserInfo: Subscription;

  constructor(private db: AngularFireDatabase,
              private authFireBase: AngularFireAuth,
              private toastService: ToastService,
              private storeService: StoreService) { }

  ngOnInit(): void {
    this.storeService.getUserInfo().subscribe(user => {
      this.updateNameForm = new FormGroup({
        name: new FormControl(user.name, [
          Validators.required
        ])
      });
    });
  }

  public submit(): void {
    if (this.updateNameForm.invalid) {
      const controls = this.updateNameForm.controls;
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    this.initUpdateName();
  }

  private initUpdateName(): void {
    this.load = true;
    const {name} = this.updateNameForm.value;
    this.subscriptionUserInfo = from(this.authFireBase.currentUser).pipe(
      map(user => user.uid),
      switchMap(uid => from(this.db.object(`/users/${uid}/info/name`).set(name)).pipe(
        switchMap(val => from(this.authFireBase.currentUser).pipe(
          map(user => user.uid),
          switchMap(uid => from(this.db.object(`/users/${uid}/info`).valueChanges()))
        ))
      )),
    ).subscribe(userInfo => {
      this.storeService.setUserInfo(userInfo);
      this.load = false;
      this.toastService.show({text: 'Данные пользователя обновлены', type: 'success'});
    }, err => {
      this.load = false;
      console.error(err);
      this.toastService.show({text: err.message, type: 'warning'});
    });
  }

  ngOnDestroy(): void {
    this.subscriptionUserInfo?.unsubscribe();
  }
}
