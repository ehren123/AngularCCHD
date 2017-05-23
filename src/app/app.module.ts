import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CchdComponent } from './cchd/cchd.component';
import { CchdResultComponent } from './cchd/cchd-result/cchd-result.component';
import {CchdDataService} from "./cchd/services/cchd-data.service";
import {CchdEvalService} from "./cchd/services/cchd-eval.service";



@NgModule({
  declarations: [
    AppComponent,
    CchdComponent,
    CchdResultComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [CchdDataService, CchdEvalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
