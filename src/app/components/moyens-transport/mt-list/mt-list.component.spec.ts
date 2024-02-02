import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MtListComponent } from './mt-list.component';

describe('MtListComponent', () => {
  let component: MtListComponent;
  let fixture: ComponentFixture<MtListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MtListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MtListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
