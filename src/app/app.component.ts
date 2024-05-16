import { Component, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FooterComponent } from './footer/footer.component';
import { MatTooltip } from '@angular/material/tooltip';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, MatSlideToggleModule, MatTooltip],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Project-Angular';

  @HostBinding('class')
  currentTheme: 'lightTheme' | 'darkTheme' = 'lightTheme';

isDarkMode:boolean = false; 

// Darl/Light theme Switch
themeSwitch() {
    this.isDarkMode=!this.isDarkMode;
    if(this.isDarkMode){
      this.currentTheme = 'darkTheme';
      document.body.style.backgroundColor = '#121212';
    } else {
      this.currentTheme = 'lightTheme';
      document.body.style.backgroundColor = '#f5f0e1';
    }
  }
}
