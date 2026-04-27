import { Injectable } from '@angular/core';
import { Educatation, skills } from '../interfaces/about.module';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({ providedIn: 'root' })
export class About {
  private apiUrl = 'https://api.yourdomain.com';

  constructor(private http: HttpClient) {}

  getSkills(): Observable<skills> {
    return this.http.get<skills>(`${this.apiUrl}/skills`);
  }

  getEducation(): Observable<Educatation[]> {
    return this.http.get<Educatation[]>(`${this.apiUrl}/education`);
  }
}