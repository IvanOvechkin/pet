import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: 'auth', loadChildren: () => import("./layouts/layout-auth/layout-auth.module").then(m => m.LayoutAuthModule)
  },
  {
    path: 'main', loadChildren: () => import("./layouts/layout-main/layout-main.module").then(m => m.LayoutMainModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
