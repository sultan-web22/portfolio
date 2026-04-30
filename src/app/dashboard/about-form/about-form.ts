import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AboutService } from '../../core/services/about';
import { Educatation } from '../../core/interfaces/aboutmodule'; //
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './about-form.html'
})
export class AboutFormComponent implements OnInit, OnDestroy {
  aboutForm: FormGroup;
  isEditMode = false;
  originalEduData: Educatation | null = null; // Store the initial data to identify the record
  private subs = new Subscription();

  constructor(
    private fb: FormBuilder,
    private _aboutService: AboutService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.aboutForm = this.fb.group({
      degree: ['', Validators.required],
      institution: ['', Validators.required],
      year: ['', Validators.required],
      skills: this.fb.array([])
    });
  }

  get skillsArray() {
    return this.aboutForm.get('skills') as FormArray;
  }

  ngOnInit(): void {
    // 1. Load Skills immediately
    this.subs.add(
      this._aboutService.getSkills().subscribe(data => {
        data.skills.forEach(skill => this.addSkill(skill));
      })
    );

    // 2. Check for Route Params
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        // Load education by id
        this._aboutService.getEducation().subscribe(educations => {
          const edu = educations.find(e => e._id === params['id']);
          if (edu) {
            this.originalEduData = edu;
            this.aboutForm.patchValue(edu);
          }
        });
      }
    });
  }

  addSkill(skillValue: string = '') {
    this.skillsArray.push(this.fb.control(skillValue, Validators.required));
  }

  removeSkill(index: number) {
    this.skillsArray.removeAt(index);
  }

  onSubmit() {
    if (this.aboutForm.valid) {
      const { skills, ...eduFormValue } = this.aboutForm.value;

      // Update Skills
      this._aboutService.updateSkills({ skills }).subscribe();

      // Update or Add Education
      if (this.isEditMode && this.originalEduData) {
        this._aboutService.updateEducationByDetails(this.originalEduData, eduFormValue).subscribe(() => {
          this.router.navigate(['/dashboard/about']);
        });
      } else {
        this._aboutService.addEducation(eduFormValue).subscribe(() => {
          this.router.navigate(['/dashboard/about']);
        });
      }
    }
  }

  cancel() {
    this.router.navigate(['/dashboard/about']);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}