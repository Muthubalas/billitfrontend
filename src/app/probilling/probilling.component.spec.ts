import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbillingComponent } from './probilling.component';

describe('ProbillingComponent', () => {
  let component: ProbillingComponent;
  let fixture: ComponentFixture<ProbillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProbillingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProbillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
