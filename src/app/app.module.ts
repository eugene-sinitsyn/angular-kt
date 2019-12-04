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
import { GlobalListenersComponent } from './components/global-listeners.component';
import { AsyncComponent } from './components/async.component';
import { UnstableComponent } from './components/unstable.component';
import { OnPushImmutableComponent } from './components/on-push-immutable.component';
import { OnPushComponent } from './components/on-push.component';
import { LongRunningCalculationComponent } from './components/long-running-calculation.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LogoComponent,
    JsLogoComponent,
    ChangeDetectionComponent,
    HeavyBindingComponent,
    EventQueueComponent,
    HeavyBoundComponent,
    GlobalListenersComponent,
    AsyncComponent,
    UnstableComponent,
    OnPushImmutableComponent,
    OnPushComponent,
    LongRunningCalculationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
