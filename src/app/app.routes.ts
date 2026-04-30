import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { ProjectsComponent } from './layout/projects/projects';
import { AboutComponent } from './layout/about/about';
import { Home } from './layout/home/home';
import { services } from './layout/services/services';

export const routes: Routes = [
{path:'',component:Layout,children:[ 
 {path:'portfolio',component:ProjectsComponent} ,
 {path:'about',component:AboutComponent} ,
 {path:'home',component:Home},
 {path:'services',component:services}
 ] }
];
