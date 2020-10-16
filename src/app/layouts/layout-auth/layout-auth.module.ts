import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutAuthRoutingModule} from './layout-auth-routing.module';
import {LayoutAuthComponent} from './layout-auth.component';
import {AuthComponent} from '../../auth/auth.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    LayoutAuthComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    LayoutAuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class LayoutAuthModule { }
