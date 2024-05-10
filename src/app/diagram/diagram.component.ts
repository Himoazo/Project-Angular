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
courseArr: Course [] = [];
  /* ngOnInit() {
    this.getSavedCourses();
  } */
  //Get saved courses
  
  getSavedCourses() :Course[] {
    this.courseArr = this.saveCourse.getCourses("savedCourses");
    return this.courseArr;
  }
  /* points : number = 0;
  pointSum():void{
    for(let course of this.courseArr){
      this.points =+ course.points;
    }
  } */
  //Delete a course
  deleteCourse(code: string):void{
    console.log(code);
    this.saveCourse.clearCourse(code);
  }
}
