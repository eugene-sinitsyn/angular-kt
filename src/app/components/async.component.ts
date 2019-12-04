import { Component, NgZone, OnInit, OnDestroy } from "@angular/core";
import { DumbWorkService } from '../services/dumb-work.service';
import { Subject, Subscription, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'kt-async',
  template: `
    <p class="heavy">{{heavyProperty}}</p>
    <button (click)="doSomething()">Do something</button>
    <button (click)="doSomethinSetTimeout0()">Set timeout 0</button>
    <button (click)="doSomethingPromise()">Immediate Promise</button>
    <button (click)="doSomethingLongRunningPromise()">Long running Promise</button>
    <button (click)="doSomethingObservable()">Emit Observable</button>
    <button (click)="subscribeOnBehaviorSubject()">Subscribe on behavior subject</button>
    <button (click)="doSomethingOutsideNgZone()">Run outside Angular zone</button>
    <button (click)="doSomethingAsyncAwait()">Immediate async/await</button>
    <button (click)="doSomethingAsyncLongAwait()">Long running async/await</button>
  `,
  styles: ['button { margin: 5px; }']
})
export class AsyncComponent implements OnInit, OnDestroy {
  public constructor(
    private readonly ngZone: NgZone,
    private readonly dumbWorkService: DumbWorkService
  ) {}

  private readonly subject: Subject<string> = new Subject<string>();
  private behaviorSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('observable value');
  private subscription: Subscription;

  public get heavyProperty(): string {
    this.dumbWorkService.doABitOfDumbWork();
    return 'I am heavy to calculate!';
  }

  public ngOnInit(): void {
    this.subscription = this.subject
      .subscribe(value => this.runObservableHandler(value));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription = null;
  }

  public doSomething(): void {
    this.dumbWorkService.doABitOfDumbWork();
  }

  public doSomethinSetTimeout0(): void {
    setTimeout(() => this.runTimerHandler('hello from timer'), 0);
    this.dumbWorkService.doABitOfDumbWork();
  }

  public doSomethingPromise(): void {
    Promise.resolve().then(() => this.dumbWorkService.doABitOfDumbWork());
    this.dumbWorkService.doABitOfDumbWork();
  }

  public doSomethingLongRunningPromise(): void {
    new Promise(resolve => setTimeout(resolve, 10))
      .then(() => this.dumbWorkService.doABitOfDumbWork());
    this.dumbWorkService.doABitOfDumbWork();
  }

  public doSomethingObservable(): void {
    this.dumbWorkService.doABitOfDumbWork();
    this.subject.next('observable value');
    this.dumbWorkService.doABitOfDumbWork();
  }

  public subscribeOnBehaviorSubject(): void {
    this.dumbWorkService.doABitOfDumbWork();
    this.subscription.add(
      this.behaviorSubject.subscribe(value => this.runObservableHandler(value))
    );
    this.dumbWorkService.doABitOfDumbWork();
  }

  public doSomethingOutsideNgZone(): void {
    this.ngZone.runOutsideAngular(() =>
      setTimeout(() => this.runTimerHandler('hello from timer'), 0)
    );
    this.dumbWorkService.doABitOfDumbWork();
  }

  public async doSomethingAsyncAwait(): Promise<void> {
    this.dumbWorkService.doABitOfDumbWork();
    const delayedResult = await this.shortAsyncFunction();
    this.runDelayedHandler(delayedResult);
  }

  public async doSomethingAsyncLongAwait(): Promise<void> {
    this.dumbWorkService.doABitOfDumbWork();
    const delayedResult = await this.longAsyncFunction();
    this.runDelayedHandler(delayedResult);
  }

  // - - - - - - - -

  private async shortAsyncFunction(): Promise<string> {
    this.dumbWorkService.doABitOfDumbWork();
    return 'delayed result';
  }

  private async longAsyncFunction(): Promise<string> {
    return new Promise(resolve => {
      this.dumbWorkService.doABitOfDumbWork();
      setTimeout(() => resolve('delayed result'), 10);
    });
  }

  private runTimerHandler(value: string): void {
    this.dumbWorkService.doABitOfDumbWork();
    console.log(value);
  }

  private runObservableHandler(value: string): void {
    this.dumbWorkService.doABitOfDumbWork();
    console.log(value);
  }

  private runDelayedHandler(value: string): void {
    this.dumbWorkService.doABitOfDumbWork();
    console.log(value);
  }
}