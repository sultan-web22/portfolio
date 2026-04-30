import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Services, ServicesService } from '../../core/services/services';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services-dashboard.html'
})
export class ServicesDashboard implements OnInit, OnDestroy {
  allServices: Services[] = [];
  private subs = new Subscription();

  constructor(private _servicesService: ServicesService, private router: Router) {}

  ngOnInit(): void {
    this.subs.add(
      this._servicesService.getServices().subscribe(data => this.allServices = data)
    );
  }

  // This function redirects to the edit form with the service ID
  goToEdit(id: string) {
    this.router.navigate(['/dashboard/service-form'], { queryParams: { id } });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}