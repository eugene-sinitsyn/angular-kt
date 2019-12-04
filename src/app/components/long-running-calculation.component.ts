import { Component, NgZone, AfterViewInit, OnDestroy } from "@angular/core";
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
export class LongRunningCalculationComponent implements AfterViewInit, OnDestroy {
  private readonly fiftyMilTotal = 50000000;
  private readonly halfMilChunkSize = 500000;
  private fiftyMilRandomNumbers: number[] = [];

  public numberOfNines: string = 'GENERATING 50 MIL RANDOM NUMBERS . . .';

  public constructor(private readonly ngZone: NgZone) {}

  public ngAfterViewInit(): void {
    setTimeout(() => {
      for (let i = 0; i < this.fiftyMilTotal; i++)
        this.fiftyMilRandomNumbers.push(Math.round(Math.random() * 10));
      this.numberOfNines = '0';
    }, 0);
  }

  public ngOnDestroy(): void {
    this.fiftyMilRandomNumbers = null;
  }

  public justCountThem() {
    this.numberOfNines = this.fiftyMilRandomNumbers
      .filter(n => n === 9).length.toString();
    console.log(`Number of nines: ${this.numberOfNines}`);
  }

  public countNinesPrettyWay(): void {
    this.numberOfNines = 'counting . . .';
    this.ngZone.runOutsideAngular(async () => {
      let counter = 0;
      for (const chunk of this.splitOnChunks())
        counter += await this.countNinesInRangeAsync(chunk.start, chunk.end);

      this.ngZone.run(() => this.numberOfNines = counter.toString());
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