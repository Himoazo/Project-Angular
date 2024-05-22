import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatTooltip, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  //img & video properties
  uniStudents = "assets/uniStudents.jpg";
  uniPic = "assets/uni2.jpg";
  gradStudents = "assets/graduation.jpg";
  books = "assets/courseBooks.jpg";
  video = "assets/videoAngular.mp4";
}
