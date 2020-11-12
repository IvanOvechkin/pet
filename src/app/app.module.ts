import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {ApiModule} from './api/api.module';
import { AppComponent } from './app.component';
import {PluginsModule} from './plugins/plugins.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApiModule,
    PluginsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
