import { Urgency } from './urgency';

export class Message {
    public constructor(
        public urgency: Urgency,
        public text: string
    ) {}
}