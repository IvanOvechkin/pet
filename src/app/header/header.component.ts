import { Component, OnInit } from '@angular/core';
import {HiddenHavService} from '../services/nav/hidden-hav.service';
import {Router} from '@angular/router';
import {LocalStorageService} from "../services/local-storage/local-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public selectOptions = [
    {id: 1, value: 'Профиль', icon: 'account_circle', url: 'main/profile'},
    {id: 2, value: 'Выйти', icon: 'assignment_return', url: 'auth/authentication'}
  ];

  public selectorPlaceholder = 'Меню';
  public date = new Date();

  constructor(
    private hiddenHavService: HiddenHavService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
  }

  toggleHiddenNav(): void {
    this.hiddenHavService.setHiddenState();
  }

  onChangedSelect($event): void {
    // if ($event.id === 2) this.localStorageService.clear();
    this.router.navigate([$event.url]).then(
      (val) => {
        console.log('redirect', val);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
