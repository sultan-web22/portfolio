import { TestBed } from '@angular/core/testing';

import { DashboardProjects } from './dashboard.projects';

describe('DashboardProjects', () => {
  let service: DashboardProjects;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardProjects);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
