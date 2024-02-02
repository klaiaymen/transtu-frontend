import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MtNavbarComponent } from './mt-navbar.component';

describe('MtNavbarComponent', () => {
  let component: MtNavbarComponent;
  let fixture: ComponentFixture<MtNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MtNavbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MtNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
