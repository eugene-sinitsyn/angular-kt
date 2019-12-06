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
    <button onclick="Promise.resolve().then(() => document.getElementById('paragraph').innerText = 'JS MT!')">
      MT from vanilla JS!
    </button>
    <button (click)="doSomething()">Do some angular</button>
    <button (click)="doMicroTask()">Do some angular in microtask</button>
    <button (click)="scheduleMtFromMt()">Schedule MT from MT</button>
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

  public scheduleMtFromMt(): void {
    const self = this;
    Promise.resolve().then(function printFirstMt() {
      self.print('First MT!');
      Promise.resolve().then(function printSecondMt() {
        self.print('Second MT!');
      })
    });
  }

  private print(value: string): void {
    console.log(new Date());
    document.getElementById('paragraph').innerText = value;
  }
}