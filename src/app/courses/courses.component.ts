import { Component, ViewChild } from '@angular/core';
import { Course } from '../model/course';
import { FetchcoursesService } from '../services/fetchcourses.service';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { SaveCourseService } from '../services/save-course.service';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSelectModule, MatPaginatorModule, MatPaginator, MatTableModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  courses: Course[] = [];
  searchedCourses: Course[] = [];
  searchCourse: string = "";
  ascending: boolean = true;
  selected = '';
  displayedColumns: string[] = ['courseCode', 'courseName', 'points', 'subject', 'syllabus', 'Lägg till'];
  
  constructor(private courseservice: FetchcoursesService, private saveCourse: SaveCourseService){}
  
  ngOnInit(){
    this.courseservice.getCourses().pipe(
      tap(data =>{
      this.courses = data;
      this.searchedCourses = data;
      this.initializePaginator();
    })).subscribe();
  }
  initializePaginator() {
    this.dataSource = new MatTableDataSource(this.searchedCourses);
    this.dataSource.paginator = this.paginator;
  } 
  
  //Sökfunktionen
  courseSearch():void{
    this.searchedCourses = this.courses.filter((course)=>
      course.courseCode.toLowerCase().includes(this.searchCourse.toLowerCase()) ||
      course.courseName.toLowerCase().includes(this.searchCourse.toLowerCase())
    );
    this.initializePaginator();
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
      this.initializePaginator();
    }else if(this.selected == ""){
      this.searchedCourses = this.courses;
      this.initializePaginator();
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
      this.initializePaginator();
  }

  sortByCode():void{
    if(this.ascending === true){
      this.searchedCourses.sort((a, b)=> (a.courseCode > b.courseCode)? 1 : -1);
    }else{
      this.searchedCourses.sort((a, b)=> (a.courseCode < b.courseCode)? 1 : -1);
    }
      this.ascending = !this.ascending;
      this.initializePaginator();
  }

  sortByPoints():void{
    if(this.ascending === true){
      this.searchedCourses.sort((a, b)=> (a.points > b.points) ? 1 : -1);
    }else{
      this.searchedCourses.sort((a, b)=> (a.points < b.points) ? 1 : -1);
    }
      this.ascending = !this.ascending;
      this.initializePaginator();
    }

    sortBySubject():void{
      if(this.ascending === true){
        this.searchedCourses.sort((a, b)=> (a.subject > b.subject) ? 1 : -1);
      }else{
        this.searchedCourses.sort((a, b)=> (a.subject < b.subject) ? 1 : -1);
      }
      this.ascending = !this.ascending;
      this.initializePaginator();
    }
  //Save course to localStorage
  existingCourse: string = "";
  save(course: Course):void{
    //Check to prevent dublicates
    if(this.saveCourse.courseArr.some((item)=> item.courseCode === course.courseCode)){
      this.existingCourse = "Denna kurs är redan sparad";
      console.log(this.existingCourse);
    }else{
      this.saveCourse.courseArr.push(course);
    this.saveCourse.saveCourse("savedCourses", JSON.stringify(this.saveCourse.courseArr));
    }
  }

  pageSizes = [10, 20, 30, 40, 50];
  dataSource!: MatTableDataSource<Course>;
 @ViewChild('paginator') paginator!: MatPaginator; 
}
