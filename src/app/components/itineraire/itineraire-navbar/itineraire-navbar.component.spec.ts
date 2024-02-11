import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItineraireNavbarComponent } from './itineraire-navbar.component';

describe('ItineraireNavbarComponent', () => {
  let component: ItineraireNavbarComponent;
  let fixture: ComponentFixture<ItineraireNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItineraireNavbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItineraireNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
