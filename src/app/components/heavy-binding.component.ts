import { Component } from "@angular/core";
import { Item } from '../models/item';

@Component({
    selector: 'kt-heavy-binding',
    template: `
        <kt-logo></kt-logo>
        <kt-js-logo (mousemove)="doSomething()"></kt-js-logo>
        <br />

        <button (click)="generateItems()">Generate Items</button>
        <button *ngIf="randomItems" (click)="randomItems = null">Reset</button>
        <kt-heavy-bound *ngIf="randomItems" [items]="randomItems"></kt-heavy-bound>
    `
})
export class HeavyBindingComponent {
    private randomItems: Item[];

    public generateItems(): void {
        this.randomItems = [];
        for (let index = 0; index < 1000000; index++)
            this.randomItems.push(new Item(!!Math.round(Math.random())));
    }

    public doSomething(): void {
        console.log(`I'm pretending hard that I'm doing something.`);
    }
}