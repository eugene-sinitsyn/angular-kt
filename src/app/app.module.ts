import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChangeDetectionComponent } from './components/change-detection.component';
import { HomeComponent } from './components/home.component';
import { HeavyBindingComponent } from './components/heavy-binding.component';
import { EventQueueComponent } from './components/event-queue.component';
import { LogoComponent } from './components/logo.component';
import { JsLogoComponent } from './components/js-logo.component';
import { HeavyBoundComponent } from './components/heavy-bound.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LogoComponent,
    JsLogoComponent,
    ChangeDetectionComponent,
    HeavyBindingComponent,
    EventQueueComponent,
    HeavyBoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
