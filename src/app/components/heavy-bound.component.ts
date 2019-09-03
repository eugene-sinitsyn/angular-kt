import { Component, Input } from "@angular/core";
import { Item } from '../models/item';

@Component({
    selector: 'kt-heavy-bound',
    template: `
        <p>Items: {{itemsCount}}</p>
        <p>Awesome items: {{awesomeItemsCount}}</p>
        <p>Awesomness percentage: {{awesomnessPercentage}}</p>
        <p>Awesomeness rate: {{awesomenessRate}}</p>
    
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