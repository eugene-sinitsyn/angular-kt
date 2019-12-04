import { Component, Input } from "@angular/core";
import { Item } from '../models/item';

@Component({
    selector: 'kt-heavy-bound',
    template: `
        <!-- binding 1 -->
        <p [style.color]="'green'">Items: {{itemsCount}}</p>
        <!-- binding 2 (heavy) -->
        <p [style.color]="'red'">Awesome items: {{awesomeItemsCount}}</p>
        <!-- binding 3 (heavy) -->
        <p [style.color]="'red'">Awesomness percentage: {{awesomnessPercentage}}</p>
        <!-- binding 4 (heavy) -->
        <p [style.color]="'red'">Awesomeness rate: {{awesomenessRate}}</p>
    `
})
export class HeavyBoundComponent {
    @Input() public items: Item[];

    public get itemsCount(): number {
        return this.items.length;
    }

    public get awesomeItemsCount(): number {
        return this.items.filter(item => item.awesome).length;
    }

    public get awesomnessPercentage(): number {
        const rate = this.awesomeItemsCount / this.itemsCount;
        return Math.round(rate * 100);
    }

    public get awesomenessRate(): number {
        return this.awesomnessPercentage / 100;
    }
}