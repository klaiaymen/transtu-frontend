import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLigneComponent } from './edit-ligne.component';

describe('EditLigneComponent', () => {
  let component: EditLigneComponent;
  let fixture: ComponentFixture<EditLigneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLigneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditLigneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
