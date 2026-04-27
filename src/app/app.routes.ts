import { Routes } from '@angular/router';
import { Layout } from './dashboard/layout/layout';
import { ProjectsComponent } from './dashboard/layout/projects/projects';

export const routes: Routes = [
{path:'',component:Layout,children:[ 
 {path:'portfolio',component:ProjectsComponent}
 ] }
];
