import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangeDetectionComponent } from './components/change-detection.component';
import { HomeComponent } from './components/home.component';
import { HeavyBindingComponent } from './components/heavy-binding.component';
import { EventQueueComponent } from './components/event-queue.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'event-queue', component: EventQueueComponent },
  { path: 'change-detection', component: ChangeDetectionComponent },
  { path: 'heavy-binding', component: HeavyBindingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
