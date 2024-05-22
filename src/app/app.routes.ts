import { Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { HomeComponent } from './home/home.component';
import { DiagramComponent } from './diagram/diagram.component';
import { NotfoundComponent } from './notfound/notfound.component';

export const routes: Routes = [
    {path: "home", component: HomeComponent, title: "Kunskapsuniversitetet"},
    {path: "courses", component: CoursesComponent, title: "Kurser"},
    {path: "diagram", component: DiagramComponent, title: "Ramschema"},
    {path: "", redirectTo: "home", pathMatch: "full"},
    {path: "404", component: NotfoundComponent, title: "404"},
    {path: "**", component: NotfoundComponent}
];
