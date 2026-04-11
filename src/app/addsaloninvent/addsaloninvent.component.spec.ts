import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsaloninventComponent } from './addsaloninvent.component';

describe('AddsaloninventComponent', () => {
  let component: AddsaloninventComponent;
  let fixture: ComponentFixture<AddsaloninventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddsaloninventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddsaloninventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
