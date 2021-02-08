import { Component, OnInit } from '@angular/core';
import {HiddenHavService} from '../services/nav/hidden-hav.service';
import {Router} from '@angular/router';
import {interval, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {StoreService} from '../services/store/store.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public selectOptions = [
    {id: 1, value: 'Профиль', icon: 'account_circle', url: 'main/profile'},
    {id: 2, value: 'Выйти', icon: 'assignment_return', url: 'auth/'}
  ];

  public date = interval(1000).pipe(map(() => new Date()));
  public userInfo$: Observable<any> = this.storeService.getUserInfo();

  constructor(
    private hiddenHavService: HiddenHavService,
    private router: Router,
    private storeService: StoreService,
    private authFireBase: AngularFireAuth
  ) { }

  ngOnInit(): void {
  }

  toggleHiddenNav(): void {
    this.hiddenHavService.setHiddenState();
  }

  onChangedSelect($event): void {
    if ($event.id === 2) {
      // this.storeService.clearUserInfo();
      this.authFireBase.signOut()
        .then(val => console.log('signOut'));
    }
    this.router.navigate([$event.url]);
  }
}
