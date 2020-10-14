import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';

interface IOption {
  id: number;
  value: string;
}

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss']
})
export class CustomSelectComponent implements OnInit {

  @Input() options: IOption[] = [];
  @Input() placeholder: string = 'Выбрать';
  @Input() startValue: any;

  @Output() selectOption = new EventEmitter<IOption>();
  change(selectedOption: IOption) {
    this.currentOption = selectedOption;
    this.selectOption.emit(selectedOption);
  }

  openSelector: boolean = false;
  currentOption: IOption;

  constructor() { }

  ngOnInit(): void {
    this.initCurrentOption();
  }

  public toogle() {
    if (this.openSelector) {
      this.close();
    } else {
      this.open();
    }
  }

  private open() {
    this.openSelector = true;
  }

  private close() {
    this.openSelector = false;
  }

  private initCurrentOption() {
    this.currentOption = this.options.find(option => option.id === this.startValue);
  }

}
