import { Injectable } from "@angular/core";
import { Message } from '../models/message';
import { Observable, Subject } from 'rxjs';
import { Priority } from '../models/priority';

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

const messages: string[] = [
    'Morbi blandit id lectus et bibendum.',
    'Quisque faucibus nisl convallis felis posuere fermentum.',
    'Quisque efficitur purus nec dui rhoncus tempus.',
    'Quisque suscipit nec felis ac mattis.',
    'Nam eu risus ut dolor eleifend ultrices.',
    'Sed et lectus in ex tincidunt molestie.',
    'Aliquam sed nunc odio. Vivamus sapien tortor, semper pulvinar justo ut, luctus finibus nisi.',
    'Sed pretium, mi quis dictum placerat, lectus massa tincidunt turpis, non euismod nisl ex in odio.',
    'Morbi malesuada urna et ligula feugiat, sagittis rhoncus purus laoreet.',
    'Nunc ut ante sed leo aliquet aliquam nec vel nisl.',
    'Aenean dignissim lacinia efficitur.',
    'Morbi tempor erat semper eros posuere rutrum.',
    'Phasellus cursus lectus quis eleifend mattis.',
    'Vestibulum eleifend euismod metus, eu laoreet odio eleifend eget.',
    'Vivamus magna lorem, malesuada tempor purus in, varius sollicitudin libero.',
    'Donec luctus elit odio, ac iaculis tellus placerat ac.',
    'Praesent quis convallis lectus, at varius risus.',
    'Curabitur id consectetur ipsum. Vestibulum ut vestibulum odio, eget mollis felis.',
    'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
    'Integer condimentum, mi quis vehicula sollicitudin, magna libero bibendum ante, quis rhoncus sapien magna ut tortor.',
    'Etiam sem odio, consequat finibus tellus id, auctor viverra sem.',
    'Nullam nec nibh ante.',
    'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.',
    'Maecenas aliquet scelerisque urna, bibendum lacinia nunc ultrices ac.',
    'Praesent pulvinar interdum dui et mollis.',
    'Donec semper at tortor sed consectetur.',
    'Vivamus non ullamcorper quam.',
    'Morbi ornare finibus nibh quis eleifend.',
    'Curabitur venenatis lectus at urna sollicitudin gravida.',
    'In enim nisl, interdum quis tortor in, scelerisque scelerisque risus.',
    'Vivamus massa lectus, semper non facilisis et, fermentum id sem.',
    'Nam sed justo ac dui placerat mattis. Donec efficitur aliquet leo, vitae scelerisque nisl volutpat sed.',
    'In ac euismod lorem, ac maximus nulla. Vestibulum at felis a ligula euismod malesuada.',
    'Duis consequat libero ac turpis bibendum, sed consectetur ex malesuada.',
    'Fusce sodales elit sit amet mauris viverra mattis.',
    'Nulla nec magna finibus, accumsan dui porttitor, volutpat magna.',
    'Pellentesque vitae sapien eu purus semper blandit sed pulvinar velit',
    'Mauris elit turpis, semper et fringilla at, bibendum eu magna',
    'Quisque nunc sem, hendrerit fermentum felis commodo, consectetur dapibus orci',
    'Nam consectetur elementum diam non suscipit.'
];

const priorities: Priority[] = [
    Priority.lowest,
    Priority.low,
    Priority.average,
    Priority.high,
    Priority.urgent,
    Priority.critical
];