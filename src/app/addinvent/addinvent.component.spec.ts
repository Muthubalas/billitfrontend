import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddinventComponent } from './addinvent.component';

describe('AddinventComponent', () => {
  let component: AddinventComponent;
  let fixture: ComponentFixture<AddinventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddinventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddinventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
