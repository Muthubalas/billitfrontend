import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaloninventComponent } from './saloninvent.component';

describe('SaloninventComponent', () => {
  let component: SaloninventComponent;
  let fixture: ComponentFixture<SaloninventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaloninventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaloninventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
