import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutAuthComponent} from './layout-auth.component';
import {AuthComponent} from '../../auth/auth.component';
import {RegistrationComponent} from "../../registration/registration.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutAuthComponent,
    children: [
      {path: 'authentication', component: AuthComponent},
      {path: 'registration', component: RegistrationComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutAuthRoutingModule { }
