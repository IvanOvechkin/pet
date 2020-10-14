import { Component, OnInit } from '@angular/core';
import {HiddenHavService} from '../services/hidden-hav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public selectOptions = [
    {id: 1, value: 'One'},
    {id: 2, value: 'Two'},
    {id: 3, value: 'Tree'},
    {id: 4, value: 'Four'},
    {id: 5, value: 'Five'},
    {id: 6, value: 'Six'},
  ];

  selectorPlaceholder: string = 'Выбрать';

  constructor(private hiddenHavService: HiddenHavService) { }

  ngOnInit(): void {
  }

  toggleHiddenNav() {
    this.hiddenHavService.setHiddenState();
  }

  onChangedSelect($event) {
    console.log($event);
  }
}
