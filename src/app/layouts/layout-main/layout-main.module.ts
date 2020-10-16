import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutMainRoutingModule} from './layout-main-routing.module';
import {CustomSelectModule} from '../../plugins/custom-select/custom-select.module';
import {LayoutMainComponent} from './layout-main.component';
import {NavigationComponent} from '../../navigation/navigation.component';
import {HeaderComponent} from '../../header/header.component';
import {FooterComponent} from '../../footer/footer.component';
import {ScoreComponent} from '../../score/score.component';
import {HistoryComponent} from '../../history/history.component';
import {PlanningComponent} from '../../planning/planning.component';
import {RecordComponent} from '../../record/record.component';
import {CategoriesComponent} from '../../categories/categories.component';
import {ProfileComponent} from '../../profile/profile.component';


@NgModule({
  declarations: [
    LayoutMainComponent,
    NavigationComponent,
    HeaderComponent,
    FooterComponent,
    ScoreComponent,
    HistoryComponent,
    PlanningComponent,
    RecordComponent,
    CategoriesComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    LayoutMainRoutingModule,
    CustomSelectModule
  ],
  entryComponents: [
    NavigationComponent
  ]
})
export class LayoutMainModule { }
