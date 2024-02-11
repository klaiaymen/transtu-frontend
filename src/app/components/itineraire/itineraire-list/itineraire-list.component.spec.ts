import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItineraireListComponent } from './itineraire-list.component';

describe('ItineraireListComponent', () => {
  let component: ItineraireListComponent;
  let fixture: ComponentFixture<ItineraireListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItineraireListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItineraireListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
