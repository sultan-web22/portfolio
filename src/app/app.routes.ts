import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { ProjectsComponent } from './layout/projects/projects';
import { about} from './layout/about/about';
import { Home } from './layout/home/home';
import { services } from './layout/services/services';
import { Dashboard } from './dashboard/dashboard';
import { Component } from '@angular/core';
import { ContactDashboardComponent } from './dashboard/contact/contact';
import { AboutDashboardComponent } from './dashboard/about/about';
import { AboutFormComponent } from './dashboard/about-form/about-form';
import { home } from './dashboard/home/home';
import { ProjectComponent } from './dashboard/project/project';
import { ProjectFormComponent } from './dashboard/project-form/project-form';
import { ServiceFormComponent } from './dashboard/service-form/service-form';
import { ServicesDashboard } from './dashboard/services-dashboard/services-dashboard';

export const routes: Routes = [
{path:'',component:Layout,children:[ 
{path:'',redirectTo:'home',pathMatch:'full'},
 {path:'portfolio',component:ProjectsComponent} ,
 {path:'about',component:about} ,
 {path:'home',component:Home},
 {path:'services',component:services}
 ] } ,{
    path:'dashboard',component:Dashboard,children:[
        {path:'',redirectTo:'home',pathMatch:'full'},
        {path:'home',component:home},
        {path:'about',component:AboutDashboardComponent},
        {path:'about-form',component:AboutFormComponent},
        {path:'contact',component:ContactDashboardComponent},
        {path:'project',component:ProjectComponent},
        {path:'project-form',component:ProjectFormComponent},
        {path:'service-form',component:ServiceFormComponent},
        {path:'services',component:ServicesDashboard}
    ]
 }
];
