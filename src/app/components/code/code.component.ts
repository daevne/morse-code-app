import { BehaviorSubject, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { concatMap, delay, last, map, pairwise, startWith, switchMap, tap } from 'rxjs/operators';
import { CodeService } from '../../services/code/code.service';
import { SoundService } from '../../services/sound/sound.service';
import { SoundComponent } from '../sound/sound.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-code',
  standalone: true,
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
  imports: [CommonModule, FormsModule, SoundComponent, AsyncPipe, ReactiveFormsModule]
})
export class CodeComponent implements OnInit {
  inputControl = new FormControl('');
  inputMode = 'message';
  codeTable = this.codeService.letters;
  errorMessage = '';

  message$ = new BehaviorSubject<string>('');
  code$ = new BehaviorSubject<string>('');

  constructor(
    private codeService: CodeService,
    private soundService: SoundService
  ) {}

  ngOnInit() {
    this.inputControl.valueChanges.pipe(
      startWith(''),
      pairwise(),
      tap(([previousValue, currentValue]) => console.log([previousValue, currentValue]))
    ).subscribe(([previousValue, currentValue]) => {
      if (previousValue !== null && currentValue !== null) {
        this.handleInputChange(previousValue, currentValue);
      }
    });
  }

  play$ = this.code$.pipe(
    switchMap(char => char),
    map(char => this.getCharDelay(char)),
    concatMap(value => of(value.char).pipe(delay(value.ms))),
    map(char => this.soundService.convertToSound(char))
  );

  /**
   * Handle input change
   * @param previousValue string
   * @param currentValue string
   * @returns void
   */
  handleInputChange(previousValue: string, currentValue: string): void {
    const lastChar = currentValue ? currentValue.slice(-1) : '';
    if (this.inputMode === 'message') {
      this.handleMessageMode(previousValue, currentValue, lastChar);
    } else if (this.inputMode === 'code') {
      this.handleCodeMode(previousValue, lastChar);
    }
  }

  /**
   * Handle message mode
   * @param previousValue string
   * @param currentValue string
   * @param lastChar string
   * @returns void
   */
  handleMessageMode(previousValue: string, currentValue: string, lastChar: string): void {
    if (currentValue.length < previousValue.length) {
      this.handleBackSpace(previousValue);
    } else {
      this.code$.next(this.code$.value + this.codeService.getCode(lastChar) + ' ');
      this.message$.next(this.message$.value + lastChar);
    }
  }

  /**
   * Handle code mode
   * @param previousValue string
   * @param lastChar string
   * @returns void
   */
  handleCodeMode(previousValue: string, lastChar: string): void {
    if (lastChar === ' ' && previousValue !== null) {
      this.code$.next(this.code$.value + ' ' + previousValue);
      this.message$.next(this.message$.value + this.codeService.getChar(previousValue));
    }
  }

  /**
   * Get the delay time for each character
   * @param char string
   * @returns object
   */
  getCharDelay(char: string): { ms: number, char: string } {
    if (char === '.') {
      return { ms: 600, char };
    } else if (char === '-') {
      return { ms: 1200, char };
    } else {
      return { ms: 500, char: '' };
    }
  }

  /**
   * Reset the message and code
   * Set the input value to empty
   * @returns void
   */
  reset(): void {
    this.resetMessageAndCode();
    this.inputControl.setValue('');
  }

  /**
   * Play the sound
   * @returns void
   */
  play() {
    this.play$.subscribe();
  }

  /**
   * Add a dot to the code
   * @returns void
   */
  addDot(): void {
    this.code$.next(this.code$.value + '.');
  }

  /**
   * Add a hyphen to the code
   * @returns void
   */
  addHyphen(): void {
    this.code$.next(this.code$.value + '-');
  }

  /**
   * Add a space to the specified observable
   * @param target - The target observable ('code' or 'message')
   * @returns void
   */
  addSpace(target: 'code' | 'message'): void {
    this[`${target}$`].next(this[`${target}$`].value + ' ');
  }

  /**
   * Add space to the code, it means a code block is finished
   * If the code is existed, add the corresponding character to the message
   * If added another space, add a space to the message. This means a word is finished.
   * Otherwise, delete the invalid code
   * @returns void
   */
  findCode(): void {
    const currentCode = this.code$.value.slice(this.code$.value.lastIndexOf(' ') + 1);
    if (this.isExistedCode(currentCode)) {
      this.addSpace('code');
      this.message$.next(this.message$.value + this.codeService.getChar(currentCode));
    } else {
      this.handleInvalidCode();
    }

    if (this.code$.value.endsWith('  ')) {
      this.addSpace('message');
    }
  }

  /**
   * Delete the invalid code
   * @returns void
   */
  handleInvalidCode(): void {
    this.deleteLastCode();
    this.errorMessage = 'Invalid morse code';
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }

  /**
   * Handle backspace in message mode
   * @param currentValue string
   * @returns void
   */
  handleBackSpace(previousValue: string): void {
    if (this.message$.value.length === 1) {
      this.resetMessageAndCode();
    } else if (previousValue.endsWith(' ')) {
      return;
    } else {
      this.deleteLastCode();
    }
  }

  /**
   * Handle delete in code mode
   * @returns void
   */
  handleDelete(): void {
    if (this.getLastSpaceIndex() === -1) {
      this.resetMessageAndCode();
    } else {
      this.message$.next(this.message$.value.slice(0, -1));
      this.message$.next(this.message$.value.trim());
      this.deleteLastCode();
    }
  }

  /**
   * Delete the last code block from $code
   * @returns void
   */
  deleteLastCode(): void {
    this.code$.next(this.code$.value.slice(0, this.getLastSpaceIndex() + 1));
  }

  /**
   * Get index of the last space in code$
   * @returns number
   */
  getLastSpaceIndex(): number {
    return this.code$.value.trim().lastIndexOf(' ');
  }

  /**
   * Reset the message and code
   * @returns void
   */
  resetMessageAndCode(): void {
    this.message$.next('');
    this.code$.next('');
  }

  /**
   * Check if code is existed in code table
   * @param code string
   * @returns boolean
   */
  isExistedCode(code: string): boolean {
    return this.codeTable.some(item => item.code === code) || code === '';
  }
}
