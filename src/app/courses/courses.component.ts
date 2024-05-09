import { Component, NgModule } from '@angular/core';
import { Course } from '../model/course';
import { FetchcoursesService } from '../services/fetchcourses.service';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
/* import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'; */
@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSelectModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  courses: Course[] = [];
  searchedCourses: Course[] = [];
  searchCourse: string = "";
  ascending: boolean = true;
  selected = '';

  constructor(private courseservice: FetchcoursesService){}

  ngOnInit(){
    this.courseservice.getCourses().subscribe(data =>{
      this.courses = data;
      this.searchedCourses = data;
    });
  }

  //Sökfunktionen
  courseSearch():void{
    this.searchedCourses = this.courses.filter((course)=>
      course.courseCode.toLowerCase().includes(this.searchCourse.toLowerCase()) ||
      course.courseName.toLowerCase().includes(this.searchCourse.toLowerCase())
    );
  }

  //Subject menu
  subjects(): String[] {
    const subSet = new Set<String>();
    this.courses.forEach(course =>{
      subSet.add(course.subject);
    });
    return Array.from(subSet);
  }

  //Show courses with selected subject from menu
  selectedSub(): void{
    if(this.selected){
      this.searchedCourses = this.courses.filter(course => course.subject === this.selected);
    }else if(this.selected == ""){
      this.searchedCourses = this.courses;
    }
  }
  //Sorteringsmetoder
  sortByName():void{
    if(this.ascending === true){
      this.searchedCourses.sort((a, b)=> (a.courseName > b.courseName)? 1 : -1);
    }else{
      this.searchedCourses.sort((a, b)=> (a.courseName < b.courseName)? 1 : -1);
    }
      this.ascending = !this.ascending;
  }

  sortByCode():void{
    if(this.ascending === true){
      this.searchedCourses.sort((a, b)=> (a.courseCode > b.courseCode)? 1 : -1);
    }else{
      this.searchedCourses.sort((a, b)=> (a.courseCode < b.courseCode)? 1 : -1);
    }
      this.ascending = !this.ascending;
  }

  sortByPoints():void{
    if(this.ascending === true){
      this.searchedCourses.sort((a, b)=> (a.points > b.points) ? 1 : -1);
    }else{
      this.searchedCourses.sort((a, b)=> (a.points < b.points) ? 1 : -1);
    }
      this.ascending = !this.ascending;
    }

    sortBySubject():void{
      if(this.ascending === true){
        this.searchedCourses.sort((a, b)=> (a.subject > b.subject) ? 1 : -1);
      }else{
        this.searchedCourses.sort((a, b)=> (a.subject < b.subject) ? 1 : -1);
      }
      this.ascending = !this.ascending;
    }

}
