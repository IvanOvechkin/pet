import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LayoutMainComponent} from "./layout-main.component";
import {ScoreComponent} from "../../score/score.component";
import {HistoryComponent} from "../../history/history.component";
import {PlanningComponent} from "../../planning/planning.component";
import {RecordComponent} from "../../record/record.component";
import {CategoriesComponent} from "../../categories/categories.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutMainComponent,
    children: [
      {path: 'score', component: ScoreComponent},
      {path: 'history', component: HistoryComponent},
      {path: 'planning', component: PlanningComponent},
      {path: 'record', component: RecordComponent},
      {path: 'categories', component: CategoriesComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutMainRoutingModule { }
