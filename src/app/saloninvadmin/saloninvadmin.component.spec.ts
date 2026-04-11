import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaloninvadminComponent } from './saloninvadmin.component';

describe('SaloninvadminComponent', () => {
  let component: SaloninvadminComponent;
  let fixture: ComponentFixture<SaloninvadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaloninvadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaloninvadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
