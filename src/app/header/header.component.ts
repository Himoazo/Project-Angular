import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
    logo = "assets/logo.png"
  //Hamburger menu
  openBtn = document.getElementById("open-menu");
  closeBtn = document.getElementById("close-menu");

  toggleMenu(): void {
      let navMenuEl: HTMLElement | null = document.getElementById("nav-menu");
  
      if(navMenuEl !== null){
          let style = window.getComputedStyle(navMenuEl);
  
      if(style.display === "none") {
          navMenuEl.style.display = "block";
      } else {
          navMenuEl.style.display = "none";
      }
      }
      }
}
