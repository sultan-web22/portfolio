import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Services {
  _id?: string; // Added id for identifying specific services
  type: string;
  availabilitydate: Date;
}

@Injectable({ providedIn: 'root' })
export class ServicesService {
  private apiUrl = 'https://localhost:3000/services';

  constructor(private http: HttpClient) {}

  // USED BY BOTH: To show the list
  getServices(): Observable<Services[]> {
    return this.http.get<Services[]>(this.apiUrl);
  }

  // USED BY FORM: To get the current details for editing
  getServiceById(id: string): Observable<Services> {
    return this.http.get<Services>(`${this.apiUrl}/${id}`);
  }

  // USED BY FORM: To save the updated details
  updateService(id: string, data: Services): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
  addService(data: Services): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  } 
}