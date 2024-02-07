import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictItemComponent } from './district-item.component';

describe('DistrictItemComponent', () => {
  let component: DistrictItemComponent;
  let fixture: ComponentFixture<DistrictItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistrictItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DistrictItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
