import { Component, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MatSlideToggleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Project-Angular';

  @HostBinding('class')
  currentTheme: 'lightTheme' | 'darkTheme' = 'lightTheme';

isDarkMode:boolean = false; 

themeSwitch() {
    this.isDarkMode=!this.isDarkMode;
    if(this.isDarkMode){
      this.currentTheme = 'darkTheme';
    } else {
      this.currentTheme = 'lightTheme'
    }
  }
}
