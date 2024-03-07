import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItineraireMapsComponent } from './itineraire-maps.component';

describe('ItineraireMapsComponent', () => {
  let component: ItineraireMapsComponent;
  let fixture: ComponentFixture<ItineraireMapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItineraireMapsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItineraireMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
