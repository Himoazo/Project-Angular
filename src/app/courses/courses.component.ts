import { Component, NgModule, ViewChild, viewChild, AfterViewInit } from '@angular/core';
import { Course } from '../model/course';
import { FetchcoursesService } from '../services/fetchcourses.service';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { SaveCourseService } from '../services/save-course.service';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
/* import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'; */
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
  displayedColumns: string[] = ['courseCode', 'courseName', 'points', 'subject', 'syllabus'];
  
  constructor(private courseservice: FetchcoursesService, private saveCourse: SaveCourseService){}
  
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

  dataSource = new MatTableDataSource<Course>(this.searchedCourses);
 /*  @ViewChild(MatPaginator) paginator!: MatPaginator; */
  @ViewChild(MatPaginator, { read: true }) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  /* length = 4328;
  pageSize = 20;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  } */
/* ngAfterViewInit() {
  this.dataSource = new MatTableDataSource(this.searchedCourses);
  this.dataSource.paginator = this.paginator;
} */
  //Paginator
  /* length = 500;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  } */
}
