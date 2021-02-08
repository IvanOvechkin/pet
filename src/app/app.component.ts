import {Component, OnInit} from '@angular/core';
import {ToastService, IToast} from './plugins/toast/toast.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'crm';

  public toast$: Observable<IToast> = this.toastService.getToast();

  constructor(private toastService: ToastService,
              private router: Router,
              private authFireBase: AngularFireAuth) {}

  ngOnInit(): void {
    this.authFireBase.authState.subscribe(val => {
      // if (!val) {
      //   this.router.navigate(['/auth/']);
      // } else {
      //   this.router.navigate(['/main/profile']);
      // }
    });
  }

}
