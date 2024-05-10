import { Component } from '@angular/core';
import { SaveCourseService } from '../services/save-course.service';
import { Course } from '../model/course';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-diagram',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './diagram.component.html',
  styleUrl: './diagram.component.scss'
})
export class DiagramComponent {

  constructor(private saveCourse: SaveCourseService){}

  //Save course
  save(course: Course):void{
    this.saveCourse.courseArr.push(course);
    this.saveCourse.saveCourse("savedCourses", JSON.stringify(this.saveCourse.courseArr));
  }
  //Get saved courses
  getSavedCourses() :Course[] {
    return this.saveCourse.getCourses("savedCourses");
  }
}
