import { Component } from '@angular/core';
import { DumbWorkService } from '../services/dumb-work.service';

@Component({
    selector: 'kt-event-queue',
    template: `
        <kt-logo></kt-logo>
        <kt-js-logo></kt-js-logo>
        <p id="paragraph">I'm a paragraph.</p>

        <button onclick="document.getElementById('paragraph').innerText = 'JS!'">
            Do something javascript'ish
        </button>
        <button (click)="doSomething()">Do something angular</button>
        <button (click)="doDumbWork()">Starve the event loop!</button>
    `,
    styles: ['button { margin: 5px; } #paragraph { border: 1px solid black; padding: 5px; }']
})
export class EventQueueComponent {
    public constructor(private readonly dumbWorkService: DumbWorkService) {}

    public doSomething(): void {
        document.getElementById('paragraph').innerText = 'Angular!'
    }

    public doDumbWork(): void {
        this.dumbWorkService.doaLotOfDumbWork();
    }
}