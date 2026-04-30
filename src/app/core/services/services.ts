import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Services {
  type: string;
  availabilitydate: Date;
}

@Injectable({ providedIn: 'root' })
export class ServicesService {
  private apiUrl = 'https://localhost:3000/services';

  constructor(private http: HttpClient) {}

  getServices(): Observable<Services[]> {
    return this.http.get<Services[]>(this.apiUrl);
  }
}
