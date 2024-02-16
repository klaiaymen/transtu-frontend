import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditItineraireComponent } from './edit-itineraire.component';

describe('EditItineraireComponent', () => {
  let component: EditItineraireComponent;
  let fixture: ComponentFixture<EditItineraireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditItineraireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditItineraireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
