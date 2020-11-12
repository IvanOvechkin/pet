import {Component, Input} from '@angular/core';
import {ToastService} from './toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {

  @Input() toast;

  constructor(private toastService: ToastService) { }

  public hide(): void {
    this.toastService.hide();
  }
}
