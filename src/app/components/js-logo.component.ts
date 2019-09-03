import { Component, ViewChild, ElementRef, OnInit, NgZone } from "@angular/core";

@Component({
    selector: 'kt-js-logo',
    template: `
        <img #logo width="200" alt="Angular Logo" src="/assets/angular.svg">
    `,
    styles: [':host { display: inline-block; } img { margin: 80px; }']
})
export class JsLogoComponent implements OnInit {
    public constructor(private readonly ngZone: NgZone) { }

    private readonly rotationSpeed = 60; // deg/sec
    @ViewChild('logo', { static: false }) public logo: ElementRef;

    public ngOnInit(): void {
        this.ngZone.runOutsideAngular(() =>
            requestAnimationFrame(time => this.renderFrame(time))
        );
    }

    public renderFrame(time: number): void {
        const timeSeconds = time / 1000
        const angle = (this.rotationSpeed * timeSeconds) % 360;
        this.logo.nativeElement.style.transform = `rotate(${angle}deg)`;
        requestAnimationFrame(time => this.renderFrame(time));
    }
}