import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../interfaces/contact.module'; // Adjust path to where your interface is saved

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  // Replace with your actual backend URL
  private apiUrl = 'https://your-api.com/api/contact';

  constructor(private http: HttpClient) {}

  // USED BY CONTACT FORM: To send the data
  sendContact(data: Contact): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // USED BY DASHBOARD: To see all messages sent by users
  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl);
  }


// Inside your ContactService
updateContactStatus(id: string, isRead: boolean): Observable<any> {
  // This sends a partial update to the backend
  return this.http.patch(`${this.apiUrl}/${id}`, { read: isRead });
} }