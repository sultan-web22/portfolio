import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Serices } from './serices';

describe('Serices', () => {
  let component: Serices;
  let fixture: ComponentFixture<Serices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Serices],
    }).compileComponents();

    fixture = TestBed.createComponent(Serices);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
