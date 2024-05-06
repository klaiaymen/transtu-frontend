import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleNabvarComponent } from './role-nabvar.component';

describe('RoleNabvarComponent', () => {
  let component: RoleNabvarComponent;
  let fixture: ComponentFixture<RoleNabvarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleNabvarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoleNabvarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
