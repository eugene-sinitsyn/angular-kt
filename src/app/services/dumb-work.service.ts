import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DumbWorkService {
  public doABitOfDumbWork(): void {
    console.log('A bit of dumb work is done');
  }

  public doDumbWork(): void {
    const array = [];
    for(let i = 0; i < 50000; i++) array.unshift(i);
    const result = array.sort().find(i => i === 49999)
    console.log(`Dumb work is done, result is ${result}`);
  }

  public doaLotOfDumbWork(): void {
    const array = [];
    for(let i = 0; i < 100000; i++) array.unshift(i);
    const result = array.sort().find(i => i === 99999)
    console.log(`A lot of dumb work is done, result is ${result}`);
  }
}