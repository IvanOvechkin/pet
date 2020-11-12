import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../api/services/api.service';
import {switchMap, tap} from 'rxjs/operators';
import {LocalStorageService} from '../services/local-storage/local-storage.service';
import {IRegistrationUserParams} from '../api/services/abstract-api.service.';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public registrationForm: FormGroup;
  public load = false;

  constructor(private router: Router, private api: ApiService, private localStorage: LocalStorageService) { }

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

    const {email, password, userName} = this.registrationForm.value;
    const requestParams = {email, password, userName};

    this.initRegistrationUser(requestParams);
  }

  private initRegistrationUser(requestParams: IRegistrationUserParams): void {
    this.load = true;
    this.api.createUser(requestParams)
      .pipe(
        tap((val) => {
          this.load = false;
        }),
        switchMap(response => {
          return response ? this.redirectToProfile() : new Observable<never>();
        })
      )
      .subscribe(val => {
        console.log('redirect', val);
      }, error => {
        console.log(error);
      });
  }

  private redirectToProfile(): Promise<boolean> {
    return this.router.navigate(['/main/profile']);
  }
}
