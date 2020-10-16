import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {HiddenHavService} from '../../services/hidden-hav.service';

@Component({
  selector: 'app-layout-main',
  templateUrl: './layout-main.component.html',
  styleUrls: ['./layout-main.component.scss']
})
export class LayoutMainComponent implements OnInit {

  public navHidden: Observable<boolean> = this.hiddenHavService.getHiddenState();

  constructor(private hiddenHavService: HiddenHavService) { }

  ngOnInit(): void {
  }

}
