import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AboutService } from '../../core/services/about';
import { skills, Educatation } from '../../core/interfaces/aboutmodule';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html'
})
export class AboutDashboardComponent implements OnInit, OnDestroy {
  mySkills: skills = { skills: [] };
  educationList: Educatation[] = [];
  private subs = new Subscription();

  constructor(private _aboutService: AboutService, private router: Router) {}

  ngOnInit(): void {
    this.subs.add(
      this._aboutService.getSkills().subscribe(data => this.mySkills = data)
    );
    this.subs.add(
      this._aboutService.getEducation().subscribe(data => this.educationList = data)
    );
  }

  goToEditSkills() {
    this.router.navigate(['/dashboard/about-form']);
  }

  goToAddEducation() {
    this.router.navigate(['/dashboard/about-form']);
  }

  goToEditEducation(edu: Educatation) {
    this.router.navigate(['/dashboard/about-form'], {
      queryParams: { id: edu._id }
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  } 
  
}