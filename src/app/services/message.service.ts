import { Injectable } from "@angular/core";
import { Message } from '../models/message';
import { Observable, Subject } from 'rxjs';
import { priorities, messages } from '../data/messages-data';

@Injectable({ providedIn: 'root' })
export class MessageService {
    private runningTimer: number;
    private readonly messageEmitter: Subject<Message> = new Subject<Message>();

    public connect(): Observable<Message> {
        if (!this.runningTimer)
            this.runningTimer = window.setInterval(() => this.sendMessage(), 250);
        return this.messageEmitter.asObservable();
    }

    public disconnect(): void {
        clearInterval(this.runningTimer);
        this.runningTimer = null;
    }

    private sendMessage(): void {
        const priority = priorities[Math.round(Math.random() * (priorities.length - 1))];
        const text = messages[Math.round(Math.random() * (messages.length - 1))];
        this.messageEmitter.next(new Message(priority, text));
    }
}