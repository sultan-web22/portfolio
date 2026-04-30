import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServicesService, Services } from '../../core/services/services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './service-form.html'
})
export class ServiceFormComponent implements OnInit, OnDestroy {
  serviceForm: FormGroup;
  isEditMode = false;
  serviceId: string | null = null;
  private subs = new Subscription();

  constructor(
    private fb: FormBuilder,
    private _servicesService: ServicesService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    // Initialize the form with your Services interface fields
    this.serviceForm = this.fb.group({
      type: ['', [Validators.required]],
      availabilitydate: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Check if there is an ID in the URL
    this.serviceId = this.route.snapshot.paramMap.get('id');
    
    if (this.serviceId) {
      this.isEditMode = true;
      // Fetch current details for Editing
      this.subs.add(
        this._servicesService.getServiceById(this.serviceId).subscribe(data => {
          // Use patchValue to fill the form with existing data
          this.serviceForm.patchValue(data);
        })
      );
    }
  }

  onSubmit() {
    if (this.serviceForm.valid) {
      if (this.isEditMode && this.serviceId) {
        // Call the UPDATE service
        this._servicesService.updateService(this.serviceId, this.serviceForm.value).subscribe(() => {
          this.router.navigate(['/dashboard/services']);
        });
      } else {
        // Call the ADD service
        this._servicesService.addService(this.serviceForm.value).subscribe(() => {
          this.router.navigate(['/dashboard/services']);
        });
      }
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}