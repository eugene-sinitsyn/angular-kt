import { Component } from '@angular/core';
import { DumbWorkService } from '../services/dumb-work.service';

@Component({
  selector: 'kt-on-push',
  template: `
    <p class="heavy">{{heavyProperty}}</p>

    <button (click)="mutate()">Mutate</button>
    <button (click)="replace()">Replace</button>

    <kt-on-push-immutable [input]="immutableInput">
    </kt-on-push-immutable>
  `
})
export class OnPushComponent {
  public constructor(
    private readonly dumbWorkService: DumbWorkService
  ) {}

  public immutableInput: { date?: Date } = {};

  public get heavyProperty(): string {
    this.dumbWorkService.doABitOfDumbWork();
    return 'I am heavy to calculate!';
  }

  public mutate(): void {
    this.immutableInput.date = new Date();
    console.log('input mutated');
  }

  public replace(): void {
    this.immutableInput = {
      date: new Date
    };
    console.log('input replaced');
  }
}