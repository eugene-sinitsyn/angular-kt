import { Component } from "@angular/core";

@Component({
  selector: 'kt-unstable',
  template: `
    <p>Unstable property: {{unstableProperty}}</p>
    <button (click)="tryDetectChanges()">
      Try detect changes
    </button>
  `,
})
export class UnstableComponent {
  private counter: number = 0;

  public get unstableProperty(): number {
    return this.counter++;
  }

  public tryDetectChanges(): void {
    console.log('trying to detect changes...');
  }
}