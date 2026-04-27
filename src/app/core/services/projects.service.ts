import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Projects } from '../interfaces/projects.module';


@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  @Injectable({ providedIn: 'root' })

  private apiUrl = 'https://localhost:3000/projects'; 

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Projects[]> {
    return this.http.get<Projects[]>(this.apiUrl);
  }
} 

  

