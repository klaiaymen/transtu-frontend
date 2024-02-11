import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointNavbarComponent } from './point-navbar.component';

describe('PointNavbarComponent', () => {
  let component: PointNavbarComponent;
  let fixture: ComponentFixture<PointNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PointNavbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PointNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
