import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationNavbarComponent } from './reclamation-navbar.component';

describe('ReclamationNavbarComponent', () => {
  let component: ReclamationNavbarComponent;
  let fixture: ComponentFixture<ReclamationNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReclamationNavbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReclamationNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
