import { Component, NgZone } from "@angular/core";
import { Chunk } from '../models/chunk';

@Component({
  selector: 'kt-long-running-calculation',
  template: `
    <kt-js-logo></kt-js-logo>
    <p>Number of nines: {{numberOfNines}}</p>

    <button (click)="justCountThem()">
      Just count them!
    </button>
    <button (click)="countNinesPrettyWay()">
      Count nines pretty way
    </button>
  `
})
export class LongRunningCalculationComponent {
  private readonly fiftyMilTotal = 50000000;
  private readonly fiftyMilRandomNumbers: number[] = [];
  private readonly halfMilChunkSize = 500000;


  public numberOfNines: number = 0;

  public constructor(private readonly ngZone: NgZone) {
    for (let i = 0; i < this.fiftyMilTotal; i++)
      this.fiftyMilRandomNumbers
        .push(Math.round(Math.random() * 10));
  }

  public justCountThem() {
    this.numberOfNines = this.fiftyMilRandomNumbers
      .filter(n => n === 9).length;
    console.log(`Number of nines: ${this.numberOfNines}`);
  }

  public countNinesPrettyWay(): void {
    this.numberOfNines = 0;
    this.ngZone.runOutsideAngular(async () => {
      let counter = 0;
      for (const chunk of this.splitOnChunks())
        counter += await this.countNinesInRangeAsync(chunk.start, chunk.end);

      this.ngZone.run(() => this.numberOfNines = counter);
    });
  }

  private async countNinesInRangeAsync(
    start: number,
    end: number
  ): Promise<number> {
    return new Promise(resolve => setTimeout(() => {
      const numberOfNines = this.fiftyMilRandomNumbers
        .slice(start, end)
        .filter(n => n === 9)
        .length;
      resolve(numberOfNines);
    }, 0));
  }

  private splitOnChunks(): Chunk[] {
    const chunks: Chunk[] = [];
    const iterations = Math.ceil(this.fiftyMilTotal / this.halfMilChunkSize);
    for (let iteration = 0; iteration < iterations; iteration++) {
      chunks.push({
        start: iteration * this.halfMilChunkSize,
        end: (iteration + 1) * this.halfMilChunkSize
      });
    }

    return chunks;
  }
}