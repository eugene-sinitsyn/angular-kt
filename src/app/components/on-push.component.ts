import { Component } from '@angular/core';
import { DumbWorkService } from '../services/dumb-work.service';

@Component({
  selector: 'kt-on-push',
  template: `
    <p [style.color]="'red'">{{heavyProperty}}</p>

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

  public immutableInput: object = {};

  public get heavyProperty(): string {
    this.dumbWorkService.doDumbWork();
    return 'I am heavy to calculate!';
  }

  public mutate(): void {
    this.immutableInput['date'] = new Date();
    console.log('input mutated');
  }

  public replace(): void {
    this.immutableInput = {
      date: new Date
    };
    console.log('input replaced');
  }
}