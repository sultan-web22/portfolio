import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { skills, Educatation } from '../../core/interfaces/aboutmodule';

@Injectable({ providedIn: 'root' })
export class AboutService {
  private skillsUrl = 'https://localhost:3000/skills';
  private educationUrl = 'https://localhost:3000/education';

  constructor(private http: HttpClient) {}

  getSkills(): Observable<skills> {
    return this.http.get<skills>(this.skillsUrl);
  }

  updateSkills(data: skills): Observable<any> {
    return this.http.put(this.skillsUrl, data);
  }
 
  getEducation(): Observable<Educatation[]> {
    return this.http.get<Educatation[]>(this.educationUrl);
  }

  addEducation(data: Educatation): Observable<any> {
    return this.http.post(this.educationUrl, data);
  }

updateEducationByDetails(oldData: Educatation, newData: Educatation): Observable<any> {

  return this.http.put(`${this.educationUrl}/update-by-details`, { oldData, newData });
}

deleteEducationByDetails(data: Educatation): Observable<any> {

  return this.http.request('delete', this.educationUrl, { body: data });
}
}