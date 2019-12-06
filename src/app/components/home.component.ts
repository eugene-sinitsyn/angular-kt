import { Component } from "@angular/core";

@Component({
  selector: 'kt-home',
  template: `
    <div style="text-align:center">
      <h1>Welcome to KT session!</h1>
      <kt-js-logo></kt-js-logo>
    </div>
  `
})
export class HomeComponent {}