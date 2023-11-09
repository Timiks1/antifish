import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { MainComponent } from './main/main.component';
import { InfoPanelComponent } from './info-panel/info-panel.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [MainComponent, InfoPanelComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [MainComponent],
})
export class AppModule {}
