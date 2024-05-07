import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { HomeComponent } from './home/home.component';
import { DiagramComponent } from './diagram/diagram.component';
import { NotfoundComponent } from './notfound/notfound.component';

export const routes: Routes = [
    {path: "home", component: HomeComponent},
    {path: "courses", component: CoursesComponent},
    {path: "diagram", component: DiagramComponent},
    {path: "", redirectTo: "home", pathMatch: "full"},
    {path: "404", component: NotfoundComponent},
    {path: "**", component: NotfoundComponent}
];
