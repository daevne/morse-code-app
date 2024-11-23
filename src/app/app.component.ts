import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CodeComponent } from './components/code/code.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CodeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'morse-code-app';
}
