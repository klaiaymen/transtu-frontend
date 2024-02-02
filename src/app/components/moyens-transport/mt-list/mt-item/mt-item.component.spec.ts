import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MtItemComponent } from './mt-item.component';

describe('MtItemComponent', () => {
  let component: MtItemComponent;
  let fixture: ComponentFixture<MtItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MtItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MtItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
