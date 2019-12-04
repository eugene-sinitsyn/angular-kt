import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ColorsService {
  private index = 0;
  private readonly colors: string[] = [
    '#FAEBD7', '#00FFFF', '#7FFFD4', '#8A2BE2', '#7FFF00',
    '#FF7F50', '#6495ED', '#DC143C', '#A9A9A9', '#B8860B',
    '#FF1493', '#ADFF2F', '#20B2AA', '#800080', '#008080'
  ];

  public getNextColor(): string {
    this.index++;
    if (this.index >= this.colors.length) this.index = 0;
    return this.colors[this.index];
  }
}