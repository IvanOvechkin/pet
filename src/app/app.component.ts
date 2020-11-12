import { Component } from '@angular/core';
import {ToastService, IToast} from './plugins/toast/toast.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crm';

  public toast$: Observable<IToast> = this.toastService.getToast();

  constructor(private toastService: ToastService) {}
}
