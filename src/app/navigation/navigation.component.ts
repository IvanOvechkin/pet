import { Component, OnInit } from '@angular/core';

interface ILink {
  title: string;
  url: string
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  links: ILink[] = [
    {title: 'Счёт', url: 'score'},
    {title: 'История', url: 'history'},
    {title: 'Планирование', url: 'planning'},
    {title: 'Новая запись', url: 'record'},
    {title: 'Категории', url: 'categories'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
