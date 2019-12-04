import { Component } from '@angular/core';
import { DumbWorkService } from '../services/dumb-work.service';

@Component({
  selector: 'kt-event-queue',
  template: `
    <kt-logo></kt-logo>
    <kt-js-logo></kt-js-logo>
    <p id="paragraph">I'm a paragraph.</p>

    <button onclick="document.getElementById('paragraph').innerText = 'JS!'">
      Do some javascript
    </button>
    <button (click)="doSomething()">Do some angular</button>
    <button (click)="doMicroTask()">Do some angular in microtask</button>
    <button (click)="doDumbWork()">Starve the event loop!</button>
  `,
  styles: ['button { margin: 5px; } #paragraph { border: 1px solid black; padding: 5px; }']
})
export class EventQueueComponent {
  public constructor(private readonly dumbWorkService: DumbWorkService) {}

  public doSomething(): void {
    this.print('Angular!');
  }

  public doMicroTask(): void {
    Promise.resolve().then(() => this.print('Angular from microtask!'));
  }

  public doDumbWork(): void {
    this.print('Take that, loop!');
    this.dumbWorkService.doaLotOfDumbWork();
  }

  private print(value: string): void {
    document.getElementById('paragraph').innerText = value;
  }
}