import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomSelectComponent} from './custom-select/custom-select.component';
import { ToastComponent } from './toast/toast.component';



@NgModule({
  declarations: [
    CustomSelectComponent,
    ToastComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CustomSelectComponent,
    ToastComponent
  ]
})
export class PluginsModule { }
