import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidetestComponent } from './sidetest.component';

describe('SidetestComponent', () => {
  let component: SidetestComponent;
  let fixture: ComponentFixture<SidetestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidetestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidetestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
