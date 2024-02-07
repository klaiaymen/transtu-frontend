import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDistrictComponent } from './new-district.component';

describe('NewDistrictComponent', () => {
  let component: NewDistrictComponent;
  let fixture: ComponentFixture<NewDistrictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewDistrictComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewDistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
