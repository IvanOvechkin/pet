import { Component, OnInit } from '@angular/core';
import {HiddenHavService} from '../services/hidden-hav.service';
import {Router} from '@angular/router';

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

  constructor(
    private hiddenHavService: HiddenHavService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  toggleHiddenNav(): void {
    this.hiddenHavService.setHiddenState();
  }

  onChangedSelect($event): void {
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
