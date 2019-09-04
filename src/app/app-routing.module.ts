import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangeDetectionComponent } from './components/change-detection.component';
import { HomeComponent } from './components/home.component';
import { HeavyBindingComponent } from './components/heavy-binding.component';
import { EventQueueComponent } from './components/event-queue.component';
import { GlobalListenersComponent } from './components/global-listeners.component';
import { AsyncComponent } from './components/async.component';
import { UnstableComponent } from './components/unstable.component';
import { OnPushComponent } from './components/on-push.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'event-queue', component: EventQueueComponent },
  { path: 'change-detection', component: ChangeDetectionComponent },
  { path: 'heavy-binding', component: HeavyBindingComponent },
  { path: 'global-listeners', component: GlobalListenersComponent },
  { path: 'async', component: AsyncComponent },
  { path: 'unstable', component: UnstableComponent },
  { path: 'on-push', component: OnPushComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
