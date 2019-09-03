import { Injectable } from "@angular/core";
import { Message } from '../models/message';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessageService {
    private runningTimer: number;
    private readonly messageEmitter: Subject<Message> = new Subject<Message>();

    public connect(): Observable<Message> {
        if (!this.runningTimer)
            this.runningTimer = window.setInterval(() => this.sendMessage(), 1000);
        return this.messageEmitter.asObservable();
    }

    public disconnect(): void {
        clearInterval(this.runningTimer);
        this.runningTimer = null;
    }

    private sendMessage(): void {
        // TODO: implement
    }
}