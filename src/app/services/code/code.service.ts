import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  letters = [
    { char: "a", code: ".-" },
    { char: "á", code: ".--.-" },
    { char: "b", code: "-..." },
    { char: "c", code: "-.-." },
    { char: "d", code: "-.." },
    { char: "e", code: "." },
    { char: "é", code: "..-.." },
    { char: "f", code: "..-." },
    { char: "g", code: "--." },
    { char: "h", code: "...." },
    { char: "i", code: ".." },
    { char: "j", code: ".---" },
    { char: "k", code: "-.-" },
    { char: "l", code: ".-.." },
    { char: "m", code: "--" },
    { char: "n", code: "-." },
    { char: "o", code: "---" },
    { char: "ö", code: "---." },
    { char: "p", code: ".--." },
    { char: "q", code: "--.-" },
    { char: "r", code: ".-." },
    { char: "s", code: "..." },
    { char: "t", code: "-" },
    { char: "u", code: "..-" },
    { char: "ü", code: "..--" },
    { char: "v", code: "...-" },
    { char: "w", code: ".--" },
    { char: "x", code: "-..-" },
    { char: "y", code: "-.--" },
    { char: "z", code: "--.." },
    { char: "0", code: "-----" },
    { char: "1", code: ".----" },
    { char: "2", code: "..---" },
    { char: "3", code: "...--" },
    { char: "4", code: "....-" },
    { char: "5", code: "....." },
    { char: "6", code: "-...." },
    { char: "7", code: "--..." },
    { char: "8", code: "---.." },
    { char: "9", code: "----." },
    { char: "!", code: " -.-.-- " },
    { char: "?", code: " ..--.. " }
  ];

  specialCharacters = [
    { char: "space", code: "     " }
  ];

  /**
   * Get code by key
   * @param key string
   * @returns string
   */
  getCode(key: string): string {
    const characters = [...this.letters, ...this.specialCharacters];
    const charObj = characters.find(c => c.char === key.toLowerCase());
    return charObj ? charObj.code : '';
  }

  /**
   * Get character by code
   * @param code string
   * @returns string
   */
  getChar(code: string): string {
    const charObj = this.letters.find(c => c.code === code.trim());
    return charObj ? charObj.char : '';
  }

  /**
   * Check if the event is codable
   * @param event KeyboardEvent
   * @returns boolean
   */
  isCodable(event: KeyboardEvent): boolean {
    return this.letters.some(c => c.char === event.key.toLowerCase());
  }
}
