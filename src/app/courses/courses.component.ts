import { Component, NgModule } from '@angular/core';
import { Course } from '../model/course';
import { FetchcoursesService } from '../services/fetchcourses.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  courses: Course[] = [];

  constructor(private courseservice: FetchcoursesService){}

  ngOnInit(){
    this.courseservice.getCourses().subscribe(data =>{
      this.courses = data;
    });
  }
}
