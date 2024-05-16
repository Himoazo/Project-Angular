import { Component, ViewChild } from '@angular/core';
import { SaveCourseService } from '../services/save-course.service';
import { Course } from '../model/course';
import { CommonModule } from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
@Component({
  selector: 'app-diagram',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTableModule, MatSortModule, MatIconModule, MatTooltip],
  templateUrl: './diagram.component.html',
  styleUrl: './diagram.component.scss'
})
export class DiagramComponent {
  //Properties
courseArr: Course [] = [];
points : number = 0;
displayedColumns: string[] = ['courseCode', 'courseName', 'points', 'subject', 'syllabus', 'Ta bort'];
dataSource = new MatTableDataSource(this.getSavedCourses());
constructor(private saveCourse: SaveCourseService, private _snackBar: MatSnackBar, private _liveAnnouncer: LiveAnnouncer){}

  ngOnInit() {
    this.courseArr = this.getSavedCourses();
  }

  //Get saved courses
  getSavedCourses() :Course[] {
    this.courseArr = this.saveCourse.getCourses("savedCourses");
    this.pointSum();
    return this.courseArr;
  }
  //Summan högskolepoäng
  pointSum():void{
    this.points = this.courseArr.reduce((total, course) => total + course.points, 0);
  }
  //Delete a course
  deleteCourse(code: string):void{
    this.saveCourse.clearCourse(code);
    this.ngOnInit();
    this.ngAfterViewInit();
  }

  //Snackbar
 durationInSeconds = 5000;
 openSnackBar(message: string) {
  this._snackBar.open(message + " har tagits bort", "X", {
    duration: this.durationInSeconds
  });
}
//Sorting
ngAfterViewInit() {
  this.dataSource = new MatTableDataSource(this.getSavedCourses());
  this.dataSource.sort = this.sort;
}
@ViewChild(MatSort) sort!: MatSort;
announceSortChange(sortState: Sort) {
  if (sortState.direction) {
    this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  } else {
    this._liveAnnouncer.announce('Sorting cleared');
  }
}
}
