import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }   from '@angular/common/http';

import {NewsListComponent} from "./newsList/news-list.component";
import { AppComponent } from './app.component';
import {PanelComponent} from "./panel/panel.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {PagerComponent} from "./pager/pager.component";

@NgModule({
  declarations: [
    AppComponent,
    NewsListComponent,
    PanelComponent,
    PagerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
