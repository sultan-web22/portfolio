import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class home {
  constructor(private router: Router) {}

  // Navigation methods
  goToEditHome() {
    this.router.navigate(['/dashboard/about-form']);
  }

  goToProjects() {
    this.router.navigate(['/dashboard/project']);
  }

  goToServices() {
    this.router.navigate(['/dashboard/services']);
  }

  goToContact() {
    this.router.navigate(['/dashboard/contact']);
  }

  goToAbout() {
    this.router.navigate(['/dashboard/about']);
  }
}