import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../api/services/api.service';
import {switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {LocalStorageService} from '../services/local-storage/local-storage.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public authForm: FormGroup;
  public load = false;

  constructor(private router: Router, private api: ApiService, private localStorage: LocalStorageService) { }

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

    this.initAuth();
  }

  private initAuth(): void {
    this.load = true;
    this.api.authUser(this.authForm.value)
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
