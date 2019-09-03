import { Component } from '@angular/core';
import { ColorsService } from '../services/colors.service';

@Component({
    selector: 'kt-binding',
    template: `
        <button (click)="count()">Count!</button>
        <br />
        <p [style.background-color]="boundColor"> <!-- binding 1 -->
            Bound property: {{boundCounter}} <!-- binding 2 -->
        </p>
    `,
    styles: ['p { display: inline-block; padding: 10px; }']
})
export class ChangeDetectionComponent {
    public constructor(private readonly colorsService: ColorsService) {}

    private color = '#ffffff';
    private counter = 0;

    public get boundColor(): string {
        console.log('get ChangeDetectionComponent.boundColor');
        return this.color;
    }

    public get boundCounter(): number {
        console.log('get ChangeDetectionComponent.boundCounter');
        return this.counter;
    }

    public count(): void {
        this.color = this.colorsService.getNextColor();
        this.counter++;
        console.log('ChangeDetectionComponent.count()');
    }
}