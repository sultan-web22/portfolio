import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AboutService } from '../../core/services/about'; 
import { Educatation, skills } from '../../core/interfaces/aboutmodule';

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  imports: [CommonModule]
})
export class about implements OnInit, OnDestroy {
  myskills!: skills;
  education!: Educatation[];
  private subs = new Subscription();

  constructor(private _aboutService: AboutService) {}

  ngOnInit(): void {
    this.subs.add(
      this._aboutService.getSkills().subscribe((data: skills) => this.myskills = data)
    );
    this.subs.add(
      this._aboutService.getEducation().subscribe((data: Educatation[]) => this.education = data)
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}