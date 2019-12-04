import { Component } from "@angular/core";

@Component({
  selector: 'kt-logo',
  template: `
    <img width="200" alt="Angular Logo" src="/assets/angular.svg">
  `,
  styles: [`
    :host { display: inline-block; }
    img { animation: rotation 5s infinite linear; margin: 40px; }
    @keyframes rotation {
      from { transform: rotate(0deg); }
      to { transform: rotate(359deg); }
    }
  `]
})
export class LogoComponent {}