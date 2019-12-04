import { Component, ViewChild, ElementRef, OnInit, NgZone, OnDestroy } from "@angular/core";

@Component({
  selector: 'kt-js-logo',
  template: `
    <img #logo width="200" alt="Angular Logo" src="/assets/angular.svg">
  `,
  styles: [':host { display: inline-block; } img { margin: 40px; }']
})
export class JsLogoComponent implements OnInit, OnDestroy {
  public constructor(private readonly ngZone: NgZone) { }

  private alive: boolean;
  private readonly rotationSpeed = 60; // deg/sec
  @ViewChild('logo', { static: false }) public logo: ElementRef;

  public ngOnInit(): void {
    this.alive = true;
    this.ngZone.runOutsideAngular(() =>
      requestAnimationFrame(time => this.renderFrame(time))
    );
  }

  public ngOnDestroy(): void {
    this.alive = false;
  }

  private renderFrame(time: number): void {
    const timeSeconds = time / 1000
    const angle = (this.rotationSpeed * timeSeconds) % 360;
    this.logo.nativeElement.style.transform = `rotate(${angle}deg)`;
    if (this.alive)
      requestAnimationFrame(time => this.renderFrame(time));
  }
}