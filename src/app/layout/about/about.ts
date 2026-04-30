import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { About } from '../../core/services/about'; // Assume this exists
import { Educatation, skills } from '../../core/interfaces/about.module';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit, OnDestroy {
  skills!: skills;

education!: Educatation[];
  private subs = new Subscription();

  constructor(private _aboutService: About) {}

  ngOnInit(): void {
    // Fetch Skills
    this.subs.add(
      this._aboutService.getSkills().subscribe(data => this.skills = data)
    );
    // Fetch Education
    this.subs.add(
      this._aboutService.getEducation().subscribe(data => this.education = data)
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
