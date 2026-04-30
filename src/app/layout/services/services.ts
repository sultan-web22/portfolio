import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServicesService, Services } from '../../core/services/services';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html'
})
export class services implements OnInit, OnDestroy {
  services: Services[] = [];
  private sub!: Subscription;

  constructor(
    private _svc: ServicesService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.sub = this._svc.getServices().subscribe({
      next: (data) => {
        this.services = data;
        this._cdr.detectChanges();
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}