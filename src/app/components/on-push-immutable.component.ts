import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef } from "@angular/core";
import { DumbWorkService } from '../services/dumb-work.service';

@Component({
  selector: 'kt-on-push-immutable',
  template: `
    <p [style.color]="'red'">{{heavyProperty}}</p>
    <p>{{input?.date}}</p>

    <button (click)="markForCheck()">
      Mark for check
    </button>
    <button (click)="detectChanges()">
      Detect changes
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnPushImmutableComponent {
  public constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly dumbWorkService: DumbWorkService
  ) {}

  @Input() public input: object = {};

  public get heavyProperty(): string {
    this.dumbWorkService.doDumbWork();
    return 'I am heavy to calculate!';
  }

  public markForCheck(): void {
    this.input['date'] = new Date();
    this.changeDetectorRef.markForCheck();
    console.log('marked for check');
  }

  public detectChanges(): void {
    this.input['date'] = new Date();
    console.log('running change detection');
    this.changeDetectorRef.detectChanges();
  }
}