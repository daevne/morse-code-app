import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class SoundService {
    short$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    long$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    /**
     * Convert to sound
     * @param char string
     * @returns void
     */
    convertToSound(char: string): void {
        if (char === '.') {
            this.short$.next(true);
        }

        if (char === '-') {
            this.long$.next(true);
        }
    }
}
