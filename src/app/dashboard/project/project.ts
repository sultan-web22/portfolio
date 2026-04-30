import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectsService } from '../../core/services/projects.service';
import { Projects } from '../../core/interfaces/projects.module';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project.html',
  styleUrls: ['./project.css']
})
export class ProjectComponent implements OnInit, OnDestroy {
  allProjects: Projects[] = [];
  private subs = new Subscription();

  constructor(
    private _projectsService: ProjectsService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.subs.add(
      this._projectsService.getProjects().subscribe({
        next: (data) => this.allProjects = data,
        error: (err) => console.error('Could not load projects', err)
      })
    );
  }

  // Navigates to the blank form
  goToAdd() {
    this.router.navigate(['/dashboard/project-form']);
  }

  // Navigates to the form with the project ID
  goToEdit(id: string) {
    this.router.navigate(['/dashboard/project-form'], { queryParams: { id } });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}