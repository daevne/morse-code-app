import { map } from 'rxjs/operators';

import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { SoundService } from '../../services/sound/sound.service';

@Component({
    selector: 'app-sound',
    standalone: true,
    templateUrl: './sound.component.html',
    styleUrls: ['./sound.component.scss']
})
export class SoundComponent implements AfterViewInit {
    @ViewChild('short') short!: ElementRef<any>;
    @ViewChild('long') long!: ElementRef<any>;

    constructor(private soundService: SoundService) {}

    ngAfterViewInit(): void {
        this.soundService.short$.pipe(
            map((value: boolean) => {
                if (value) {
                    this.short.nativeElement.play();
                } else {
                    this.short.nativeElement.pause();
                    this.short.nativeElement.currentTime = 0;
                }
                return value;
            })
        ).subscribe();

        this.soundService.long$.pipe(
            map((value: boolean) => {
                if (value) {
                    this.long.nativeElement.play();
                } else {
                    this.long.nativeElement.pause();
                    this.long.nativeElement.currentTime = 0;
                }
                return value;
            })
        ).subscribe();
    }
}
