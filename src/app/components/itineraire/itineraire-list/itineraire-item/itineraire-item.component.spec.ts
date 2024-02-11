import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItineraireItemComponent } from './itineraire-item.component';

describe('ItineraireItemComponent', () => {
  let component: ItineraireItemComponent;
  let fixture: ComponentFixture<ItineraireItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItineraireItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItineraireItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
