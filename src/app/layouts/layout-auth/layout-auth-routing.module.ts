import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LayoutAuthComponent} from "./layout-auth.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutAuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutAuthRoutingModule { }
