import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewItineraireComponent } from './new-itineraire.component';

describe('NewItineraireComponent', () => {
  let component: NewItineraireComponent;
  let fixture: ComponentFixture<NewItineraireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewItineraireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewItineraireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
