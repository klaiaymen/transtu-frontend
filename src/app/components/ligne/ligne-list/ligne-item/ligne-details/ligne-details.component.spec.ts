import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigneDetailsComponent } from './ligne-details.component';

describe('LigneDetailsComponent', () => {
  let component: LigneDetailsComponent;
  let fixture: ComponentFixture<LigneDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LigneDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LigneDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
