# Morse Code Translator App

This project is a Morse Code Translator built with Angular. It provides an interactive interface for encoding messages to Morse code and decoding Morse code back into text. The app also includes sound playback for Morse code.

## Features

- **Interactive Translation Modes**:
  - Encode messages into Morse code.
  - Decode Morse code into readable text.
- **Real-time Input Handling**:
  - Dynamically updates translations as you type.
- **Sound Playback**:
  - Play Morse code sequences as audio signals.
- **Error Handling**:
  - Displays helpful error messages for invalid Morse code inputs.
- **Reset and Delete Options**:
  - Clear all inputs and translations or delete specific characters.

## Technologies Used

- **Frontend Framework**: Angular
- **Reactive Programming**: RxJS (e.g., `BehaviorSubject`, `pipe`, `map`, `switchMap`)
- **Form Control**: Angular Reactive Forms (`FormControl`)

## How to Use

1. **Input Mode**:
   - Switch between "Message" mode for text-to-Morse conversion and "Code" mode for Morse-to-text conversion.
2. **Text Input**:
   - Type a message in the input field. The Morse code translation updates automatically.
3. **Manual Controls**:
   - Use buttons to add dots (`.`), dashes (`-`), and spaces to the Morse code.
4. **Playback**:
   - Click the "Play" button to hear the Morse code as audio.
5. **Reset**:
   - Clear the input field and translations using the "Reset" button.

## Future Enhancements

- Add unit tests for key components.

