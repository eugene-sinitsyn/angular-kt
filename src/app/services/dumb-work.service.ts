import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DumbWorkService {
    public doDumbWork(): void {
        const array = [];
        for(let i = 0; i < 100000; i++) array.unshift(i);
        console.log(array.sort().find(i => i === 99999))
    }
}