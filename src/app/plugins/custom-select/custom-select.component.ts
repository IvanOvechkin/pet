import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';

interface IOption {
  id: number;
  title: string;
  icon?: string;
}

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss']
})

export class CustomSelectComponent implements OnInit {

  @Input() options: IOption[] = [];
  @Input() placeholder = 'Выбрать';
  @Input() startValue: any;
  @Input() currentSelected = false;

  @Output() selectOption = new EventEmitter<IOption>();

  public openSelector = false;
  public currentOption: IOption;

  change(selectedOption: IOption): void {
    this.currentOption = selectedOption;
    this.selectOption.emit(this.currentOption);
  }

  constructor() { }

  ngOnInit(): void {
    if (this.currentSelected) {
      this.initCurrentOption();
    }
  }

  public toogle(): void {
    if (this.openSelector) {
      this.close();
    } else {
      this.open();
    }
  }

  private open(): void {
    this.openSelector = true;
  }

  private close(): void {
    this.openSelector = false;
  }

  private initCurrentOption(): void {
    if (this.options && this.options.length) {
      this.currentOption = this.options.find(option => option.id === this.startValue) || this.options[0];
      this.selectOption.emit(this.currentOption);
    }
  }

}
