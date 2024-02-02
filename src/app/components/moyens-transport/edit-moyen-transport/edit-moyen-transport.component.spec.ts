import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMoyenTransportComponent } from './edit-moyen-transport.component';

describe('EditMoyenTransportComponent', () => {
  let component: EditMoyenTransportComponent;
  let fixture: ComponentFixture<EditMoyenTransportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMoyenTransportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditMoyenTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
