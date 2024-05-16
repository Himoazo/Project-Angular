import { Injectable } from '@angular/core';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class SaveCourseService {
  courseArr: Course[] = [];
  constructor() { }

  //Save in localStorage
  saveCourse(key: string, value: string) :void {
    localStorage.setItem(key, value);
  }

  //Retrive data from LS
  getCourses(key: string): Course[] {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      return this.courseArr = JSON.parse(storedData) as Course[]; 
      
    }else{
      return [];
    }
  }

  //Delete course from LS
  clearCourse(code: string) :void {
    this.courseArr = this.courseArr.filter((course) => course.courseCode !== code);
    localStorage.setItem("savedCourses", JSON.stringify(this.courseArr));
    this.getCourses("savedCourses");
  }
}
