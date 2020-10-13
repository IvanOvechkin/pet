import { Component, OnInit } from '@angular/core';
import {HiddenHavService} from '../services/hidden-hav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private hiddenHavService: HiddenHavService) { }

  ngOnInit(): void {
  }

  toggleHiddenNav() {
    this.hiddenHavService.setHiddenState();
  }
}
