import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {LocalStorageService} from '../services/local-storage/local-storage.service';
import {ApiService} from '../api/services/api.service';
import {ToastService} from '../plugins/toast/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public updateNameForm: FormGroup;
  public load = false;

  constructor(private api: ApiService,
              private localStorageService: LocalStorageService, private toastService: ToastService) { }

  ngOnInit(): void {
    const user = this.localStorageService.getItem('user');
    this.updateNameForm = new FormGroup({
      userName: new FormControl(user.userName, [
        Validators.required
      ])
    });
  }

  public submit(): void {
    if (this.updateNameForm.invalid) {
      const controls = this.updateNameForm.controls;
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    this.initUpdateName(this.updateNameForm.value);
  }

  private initUpdateName(params): void {
    this.load = true;
    this.api.updateUserData(params).subscribe(res => {
      this.load = false;
      this.toastService.show({text: 'Данные пользователя обновлены', type: 'success'});
    }, err => {
      this.load = false;
      console.error(err);
      this.toastService.show({text: err.message, type: 'warning'});
    });
  }
}
