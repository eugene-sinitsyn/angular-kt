import { Component } from '@angular/core';
import { DumbWorkService } from '../services/dumb-work.service';

@Component({
  selector: 'kt-event-queue',
  template: `
    <kt-logo></kt-logo>
    <kt-js-logo></kt-js-logo>
    <p id="paragraph">I'm a paragraph.</p>

    <p>Vanilla JS</p>
    <button onclick="document.getElementById('paragraph').innerText = 'JS!'">
      Do some vanilla JS
    </button>
    <button onclick="Promise.resolve().then(function MT() { document.getElementById('paragraph').innerText = 'JS MT!'; })">
      Do some vanilla JS in microtask
    </button>
    <button onclick="Promise.resolve().then(function MT1() { document.getElementById('paragraph').innerText = 'JS MT1!'; Promise.resolve().then(function MT2() { document.getElementById('paragraph').innerText = 'JS MT2!' + new Date(); console.dir(new Date()); }); })">
      Schedule microtask from vanilla JS microtask
    </button>

    <p>Ng</p>
    <button (click)="doSomething()">Do some Angular</button>
    <button (click)="doMicroTask()">Do some Angular in microtask</button>
    <button (click)="scheduleMtFromMt()">Schedule microtask from Angular microtask</button>

    <p>Loop starvation</p>
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