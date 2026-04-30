import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { ProjectsService } from '../../core/services/projects.service';
import { Projects } from '../../core/interfaces/projects.module';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projects!: Projects[];
  private projectSub!: Subscription;

  constructor(
    private _projectService: ProjectsService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.projectSub = this._projectService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this._cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
      }
    });
  }

  ngOnDestroy(): void {
    // Crucial: Clean up to prevent memory leaks
    if (this.projectSub) {
      this.projectSub.unsubscribe();
    }
  }
}
