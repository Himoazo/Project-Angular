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
courseArr: Course [] = [];
points : number = 0;

constructor(private saveCourse: SaveCourseService){}

  ngOnInit() {
    this.getSavedCourses();
  }
  //Get saved courses
  
  getSavedCourses() :Course[] {
    this.courseArr = this.saveCourse.getCourses("savedCourses");
    this.pointSum();
    return this.courseArr;
  }
  
  pointSum():void{
    this.points = this.courseArr.reduce((total, course) => total + course.points, 0);
  }
  //Delete a course
  deleteCourse(code: string):void{
    this.saveCourse.clearCourse(code);
  }
}
