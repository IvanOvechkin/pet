import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authForm: FormGroup;

  constructor(private router: Router) { }

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
    console.log(this.authForm.value);
    this.router.navigate(['/main/profile']).then(
      (val) => {
        console.log('redirect', val);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
