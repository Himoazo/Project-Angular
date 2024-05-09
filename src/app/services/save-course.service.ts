import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaveCourseService {

  constructor() { }

  //Save in localStorage
  saveCourse(key: string, value: string) :void {
    localStorage.setItem(key, value);
  }

  //Retrive data from LS
  getCourses(key: string): string | null {
    return localStorage.getItem(key);
  }

  //Delete course from LS
  clearCourse(key: string) :void {
    localStorage.removeItem(key);
  }

  //Delete all saved courses
  clearAll() :void{
    localStorage.clear();
  }
}
