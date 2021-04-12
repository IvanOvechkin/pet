import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {ApiModule} from './api/api.module';
import { AppComponent } from './app.component';
import {PluginsModule} from './plugins/plugins.module';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from '../environments/environment.prod';
import {EffectsModule} from "@ngrx/effects";
import {AppEffects} from "./store/effects/app.effects";
import {StoreModule} from "@ngrx/store";
import {appReducer} from "./store/reducers/app.reducer";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApiModule,
    PluginsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    StoreModule.forRoot({app: appReducer}),
    EffectsModule.forRoot([AppEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
