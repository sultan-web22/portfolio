import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Projects } from '../interfaces/projects.module';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private apiUrl = 'https://localhost:3000/projects';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Projects[]> {
    return this.http.get<Projects[]>(this.apiUrl);
  }

  getProjectById(id: string): Observable<Projects> {
    return this.http.get<Projects>(`${this.apiUrl}/${id}`);
  }

  // ADD
  addProject(data: Projects): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // EDIT
  updateProject(id: string, data: Projects): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteProject(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}