import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMoyensTransportComponent } from './search-moyens-transport.component';

describe('SearchMoyensTransportComponent', () => {
  let component: SearchMoyensTransportComponent;
  let fixture: ComponentFixture<SearchMoyensTransportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchMoyensTransportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchMoyensTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
