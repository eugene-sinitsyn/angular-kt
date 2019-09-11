import { Component, NgZone, OnInit, OnDestroy } from "@angular/core";
import { DumbWorkService } from '../services/dumb-work.service';
import { Subject, Subscription, BehaviorSubject } from 'rxjs';

@Component({
    selector: 'kt-async',
    template: `
        <p [style.color]="'red'">{{heavyProperty}}</p>
        <button (click)="doSomething()">Do something</button>
        <button (click)="doSomethinSetTimeout0()">Set timeout 0</button>
        <button (click)="doSomethingPromise()">Promise</button>
        <button (click)="doSomethingObservable()">Observable</button>
        <button (click)="doSomethingOutsideNgZone()">Outside Angular zone</button>
        <button (click)="doSomethingAsyncAwait()">Immediate async/await</button>
        <button (click)="doSomethingAsyncLongAwait()">Long running async/await</button>
        <button (click)="subscribeOnBehaviorSubject()">Subscribe on behavior subject</button>
    `,
    styles: ['button { margin: 5px; }']
})
export class AsyncComponent implements OnInit, OnDestroy {
    public constructor(
        private readonly ngZone: NgZone,
        private readonly dumbWorkService: DumbWorkService
    ) {}

    private readonly subject: Subject<string> = new Subject<string>();
    private subscription1: Subscription;
    private behaviorSubject: BehaviorSubject<string> = new BehaviorSubject<string>('initial value');
    private subscription2: Subscription;

    public get heavyProperty(): string {
        this.dumbWorkService.doDumbWork();
        return 'I am heavy to calculate!';
    }

    public ngOnInit(): void {
        this.subscription1 = this.subject
            .subscribe(value => this.handleSubscription(value));
    }

    public ngOnDestroy(): void {
        this.subscription1.unsubscribe();
        this.subscription1 = null;
        this.subscription2.unsubscribe();
        this.subscription2 = null;
    }

    public doSomething(): void {
        this.dumbWorkService.doDumbWork();
    }

    public doSomethinSetTimeout0(): void {
        this.dumbWorkService.doDumbWork();
        setTimeout(() => this.dumbWorkService.doDumbWork(), 0);
    }

    public doSomethingPromise(): void {
        this.dumbWorkService.doDumbWork();
        Promise.resolve().then(() => this.dumbWorkService.doDumbWork());
    }

    public doSomethingObservable(): void {
        this.dumbWorkService.doDumbWork();
        this.subject.next('observable value');
        this.dumbWorkService.doDumbWork();
    }

    public doSomethingOutsideNgZone(): void {
        this.dumbWorkService.doDumbWork();
        this.ngZone.runOutsideAngular(() =>
            setTimeout(() => this.dumbWorkService.doDumbWork(), 0)
        );
    }

    public async doSomethingAsyncAwait(): Promise<void> {
        this.dumbWorkService.doDumbWork();
        await this.shortAsyncFunction();
        this.dumbWorkService.doDumbWork();
    }

    public async doSomethingAsyncLongAwait(): Promise<void> {
        this.dumbWorkService.doDumbWork();
        await this.longAsyncFunction();
        this.dumbWorkService.doDumbWork();
    }

    public subscribeOnBehaviorSubject(): void {
        this.dumbWorkService.doDumbWork();
        this.behaviorSubject.subscribe(s => {
            console.log(s);
            this.dumbWorkService.doDumbWork();
        });
        this.dumbWorkService.doDumbWork();
    }

    private async shortAsyncFunction(): Promise<void> {
        this.dumbWorkService.doDumbWork();
    }

    private async longAsyncFunction(): Promise<void> {
        return new Promise(resolve => {
            this.dumbWorkService.doDumbWork();
            setTimeout(resolve, 1000);
        });
    }

    private handleSubscription(value: string): void {
        this.dumbWorkService.doDumbWork();
        console.log(value);
    }
}