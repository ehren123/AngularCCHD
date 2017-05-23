import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CchdComponent } from './cchd.component';

describe('CchdComponent', () => {
  let component: CchdComponent;
  let fixture: ComponentFixture<CchdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CchdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CchdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
