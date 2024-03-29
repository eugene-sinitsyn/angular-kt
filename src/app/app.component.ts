import { Component } from '@angular/core';

@Component({
  selector: 'kt-root',
  template: `
    <a [routerLink]="['']">Home</a>
    <a [routerLink]="['event-queue']">Event loop & event queue</a>
    <a [routerLink]="['change-detection']">Change detection</a>
    <a [routerLink]="['unstable']">Unstable property</a>
    <a [routerLink]="['heavy-binding']">Heavy binding</a>
    <a [routerLink]="['global-listeners']">Global listeners</a>
    <a [routerLink]="['long-running']">Long running calculation</a>
    <a [routerLink]="['async']">Async</a>
    <a [routerLink]="['on-push']">On-push strategy</a>

    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: ['a { padding: 5px; } .content { padding: 20px 5px; }']
})
export class AppComponent {}