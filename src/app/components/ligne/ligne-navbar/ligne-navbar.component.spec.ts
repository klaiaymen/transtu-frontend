import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigneNavbarComponent } from './ligne-navbar.component';

describe('LigneNavbarComponent', () => {
  let component: LigneNavbarComponent;
  let fixture: ComponentFixture<LigneNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LigneNavbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LigneNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
