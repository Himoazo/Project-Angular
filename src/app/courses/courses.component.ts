import { Component, NgModule } from '@angular/core';
import { Course } from '../model/course';
import { FetchcoursesService } from '../services/fetchcourses.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  courses: Course[] = [];
  searchedCourses: Course[] = [];
  searchCourse: string = "";
  ascending: boolean = true;

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
