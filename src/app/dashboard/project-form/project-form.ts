import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProjectsService } from '../../core/services/projects.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './project-form.html'
})
export class ProjectFormComponent implements OnInit, OnDestroy {
  projectForm: FormGroup;
  isEditMode = false;
  projectId: string | null = null;
  private subs = new Subscription();

  constructor(
    private fb: FormBuilder,
    private _projectsService: ProjectsService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    // Exactly matches your Projects interface
    this.projectForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      myrole: ['', [Validators.required]],
      imageURL: ['', [Validators.required]],
      projectLink: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id');
    
    if (this.projectId) {
      this.isEditMode = true;
      this.subs.add(
        this._projectsService.getProjectById(this.projectId).subscribe(data => {
          this.projectForm.patchValue(data);
        })
      );
    }
  }

  onSubmit() {
    if (this.projectForm.valid) {
      if (this.isEditMode && this.projectId) {
        this._projectsService.updateProject(this.projectId, this.projectForm.value).subscribe(() => {
          this.router.navigate(['/dashboard/project']);
        });
      } else {
        this._projectsService.addProject(this.projectForm.value).subscribe(() => {
          this.router.navigate(['/dashboard/project']);
        });
      }
    }
  }

  // Added delete logic directly in the form for convenience
  onDelete() {
    if (this.projectId && confirm('Are you sure you want to delete this project?')) {
      this._projectsService.deleteProject(this.projectId).subscribe(() => {
        this.router.navigate(['/dashboard/project']);
      });
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}