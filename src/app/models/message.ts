import { Priority } from './priority';

export class Message {
    public constructor(
        public priority: Priority,
        public text: string
    ) {}
}