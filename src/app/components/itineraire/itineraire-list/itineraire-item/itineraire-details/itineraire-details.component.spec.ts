import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItineraireDetailsComponent } from './itineraire-details.component';

describe('ItineraireDetailsComponent', () => {
  let component: ItineraireDetailsComponent;
  let fixture: ComponentFixture<ItineraireDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItineraireDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItineraireDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
