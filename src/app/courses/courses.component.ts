import { Component, ViewChild } from '@angular/core';
import { Course } from '../model/course';
import { FetchcoursesService } from '../services/fetchcourses.service';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { SaveCourseService } from '../services/save-course.service';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSelectModule, MatPaginatorModule, MatPaginator, 
    MatTableModule, MatButtonModule, MatMenuModule, MatBadgeModule, MatSortModule, MatIconModule, MatTooltipModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})

export class CoursesComponent {
  //Properties
  courses: Course[] = [];
  searchedCourses: Course[] = [];
  searchCourse: string = "";
  ascending: boolean = true;
  selected = '';
  displayedColumns: string[] = ['courseCode', 'courseName', 'points', 'subject', 'syllabus', 'Lägg till'];
  
  constructor(private courseservice: FetchcoursesService, private saveCourse: SaveCourseService, 
    private _snackBar: MatSnackBar, private _liveAnnouncer: LiveAnnouncer){}
  
  
  ngOnInit() {
    this.courseservice.getCourses().subscribe(data => {
      this.courses = data;
      this.searchedCourses = data;
      this.initializePaginator();
    });
    this.courseWidget();
  }

  //Paginator
  pageSizes = [10, 20, 30, 40, 50];
  dataSource!: MatTableDataSource<Course>;
 @ViewChild('paginator') paginator!: MatPaginator; 

  //Pass paginator and sort to course data
  initializePaginator() {
    this.dataSource = new MatTableDataSource(this.searchedCourses);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
  
  //Save course to localStorage
  existingCourse: string = "";
  save(course: Course):void{
    this.existingCourse = "";
    //Check to prevent dublicates
    if(this.saveCourse.courseArr.some((item)=> item.courseCode === course.courseCode)){
      this.existingCourse = "Denna kurs är redan sparad";
      console.log(this.existingCourse);
    }else{
      this.saveCourse.courseArr.push(course);
      this.saveCourse.saveCourse("savedCourses", JSON.stringify(this.saveCourse.courseArr));
      this.courseWidget();
    }
  }

  //Saved courses widget (mini ramschema)
  savedCourseWidget: Course[] = [];
  courseWidget(): Course[] {
    return this.savedCourseWidget = this.saveCourse.courseArr;
  }

 //Snackbar
 durationInSeconds = 5000;
 openSnackBar(message: string) {
  if(this.existingCourse){
    this._snackBar.open(this.existingCourse, "X", {
      duration: this.durationInSeconds
    });
  }else{
    this._snackBar.open(message + " har lagts till", "X", {
    duration: this.durationInSeconds
  });
  }
}

//Sorting
@ViewChild(MatSort) sort!: MatSort;
announceSortChange(sortState: Sort) {
  if (sortState.direction) {
    this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  } else {
    this._liveAnnouncer.announce('Sorting cleared');
  }
}
}
