import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CchdResultComponent } from './cchd-result.component';

describe('CchdResultComponent', () => {
  let component: CchdResultComponent;
  let fixture: ComponentFixture<CchdResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CchdResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CchdResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
