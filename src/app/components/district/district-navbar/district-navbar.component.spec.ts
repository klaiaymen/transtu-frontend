import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictNavbarComponent } from './district-navbar.component';

describe('DistrictNavbarComponent', () => {
  let component: DistrictNavbarComponent;
  let fixture: ComponentFixture<DistrictNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistrictNavbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DistrictNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
