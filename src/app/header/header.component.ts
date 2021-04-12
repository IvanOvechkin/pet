import { Component, OnInit } from '@angular/core';
import {HiddenHavService} from '../services/nav/hidden-hav.service';
import {Router} from '@angular/router';
import {interval, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';
import {Store} from "@ngrx/store";
import {AppState} from "../store/state/app.state";
import {IUserInfo} from "../api/services/abstract-api.service.";
import {selectUserInfo} from "../store/selectors/app.selectors";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public selectOptions = [
    {id: 1, title: 'Профиль', icon: 'account_circle', url: 'main/profile'},
    {id: 2, title: 'Выйти', icon: 'assignment_return', url: 'auth/'}
  ];

  public date = interval(1000).pipe(map(() => new Date()));
  userInfo$: Observable<IUserInfo> = this.store.select(selectUserInfo);

  constructor(
    private hiddenHavService: HiddenHavService,
    private router: Router,
    private authFireBase: AngularFireAuth,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
  }

  toggleHiddenNav(): void {
    this.hiddenHavService.setHiddenState();
  }

  onChangedSelect($event): void {
    if ($event.id === 2) {
      this.authFireBase.signOut()
        .then(val => console.log('signOut'));
    }
    this.router.navigate([$event.url]);
  }
}
