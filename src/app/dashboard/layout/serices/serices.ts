import { Component, OnInit } from '@angular/core';
import { Services } from '../../../core/interfaces/services';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  services: Services [] = [];

  constructor(private _service: Services) {}

  ngOnInit(): void {
    this._service.getServices().subscribe(data => {
      this.services = data;
    });
  }
}
