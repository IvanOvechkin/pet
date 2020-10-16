import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutAuthComponent} from './layout-auth.component';
import {AuthComponent} from '../../auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutAuthComponent,
    children: [
      {path: 'authentication', component: AuthComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutAuthRoutingModule { }
