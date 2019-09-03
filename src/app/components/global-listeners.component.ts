import { Component } from "@angular/core";
import { Subscription } from 'rxjs';
import { MessageService } from '../services/message.service';
import { Message } from '../models/message';
import { Priority } from '../models/priority';
import { DumbWorkService } from '../services/dumb-work.service';

@Component({
    selector: 'kt-global-listeners',
    template: `
        <kt-logo></kt-logo>
        <kt-js-logo></kt-js-logo>
        <br />
        <p [style.color]="'red'">{{heavyProperty}}</p> <!-- heavy binding -->

        <button
            (click)="connect()"
            [disabled]="!!messageSubscription"
        >Connect</button>
        <button
            (click)="disconnect()"
            [disabled]="!messageSubscription"
        >Disconnect</button>

        <h2>Critical messages</h2>
        <p *ngFor="let message of criticalMessages">
            {{message.text}}
        </p>
    `
})
export class GlobalListenersComponent {
    public constructor(
        private readonly dumbWorkService: DumbWorkService,
        private readonly messageService: MessageService
    ) {}

    public messageSubscription: Subscription;
    public criticalMessages: Message[] = [];

    public get heavyProperty(): string {
        this.dumbWorkService.doDumbWork();
        return 'I am heavy to calculate!';
    }

    public connect(): void {
        this.messageSubscription = this.messageService.connect()
            .subscribe(message => this.handleMessage(message));
    }

    public disconnect(): void {
        this.messageService.disconnect();
        this.messageSubscription.unsubscribe();
        this.messageSubscription = null;
    }

    private handleMessage(message: Message): void {
        console.log(`[${Priority[message.priority]}]: ${message.text}`);
        if (message.priority === Priority.critical)
            this.criticalMessages.push(message);
    }
}