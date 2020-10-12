import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutAuthRoutingModule} from "./layout-auth-routing.module";
import {LayoutAuthComponent} from "./layout-auth.component";



@NgModule({
  declarations: [
    LayoutAuthComponent,
  ],
  imports: [
    CommonModule,
    LayoutAuthRoutingModule
  ]
})
export class LayoutAuthModule { }
