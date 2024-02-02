import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoyensTransportComponent } from './moyens-transport.component';

describe('MoyensTransportComponent', () => {
  let component: MoyensTransportComponent;
  let fixture: ComponentFixture<MoyensTransportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoyensTransportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoyensTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
