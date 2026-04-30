// src/app/components/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService } from '../../core/services/home';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  imports: [CommonModule, RouterLink]
})
export class Home implements OnInit {
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