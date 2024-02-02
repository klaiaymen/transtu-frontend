import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMoyenTransportComponent } from './new-moyen-transport.component';

describe('NewMoyenTransportComponent', () => {
  let component: NewMoyenTransportComponent;
  let fixture: ComponentFixture<NewMoyenTransportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewMoyenTransportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewMoyenTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
