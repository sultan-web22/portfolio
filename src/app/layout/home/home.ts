// src/app/components/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/home';

@Component({
  selector: 'app-home',
  template: `
    <div class="home-container">
      <h1>Welcome to my Portfolio</h1>
      <p *ngIf="apiMessage; else loading">{{ apiMessage }}</p>
      <ng-template #loading>
        <p>Loading message from API...</p>
      </ng-template>
    </div>
  `
})
export class HomeComponent implements OnInit {
  apiMessage: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getMessage().subscribe({
      next: (data) => {
        this.apiMessage = data.message;
      },
      error: (err) => {
        console.error('API Error:', err);
        this.apiMessage = 'Failed to load message.';
      }
    });
  }
}