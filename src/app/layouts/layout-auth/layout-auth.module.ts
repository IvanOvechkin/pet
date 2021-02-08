import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutAuthRoutingModule} from './layout-auth-routing.module';
import {LayoutAuthComponent} from './layout-auth.component';
import {AuthComponent} from '../../auth/auth.component';
import {ReactiveFormsModule} from '@angular/forms';
import {PluginsModule} from '../../plugins/plugins.module';
import {RegistrationComponent} from '../../registration/registration.component';



@NgModule({
  declarations: [
    LayoutAuthComponent,
    AuthComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    LayoutAuthRoutingModule,
    ReactiveFormsModule,
    PluginsModule
  ]
})
export class LayoutAuthModule { }
