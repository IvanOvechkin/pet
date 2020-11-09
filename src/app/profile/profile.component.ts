import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {AbstractApiService} from "../api/services/abstract-api.service.";
import {LocalStorageService} from "../services/local-storage/local-storage.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public updateNameForm: FormGroup;
  public load = false;

  constructor(private api: AbstractApiService, private localStorageService: LocalStorageService) { }

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

    this.initUpdateName();
  }

  private initUpdateName(): void {

  }
}
