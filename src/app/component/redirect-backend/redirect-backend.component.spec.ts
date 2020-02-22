import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectBackendComponent } from './redirect-backend.component';

describe('RedirectBackendComponent', () => {
  let component: RedirectBackendComponent;
  let fixture: ComponentFixture<RedirectBackendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirectBackendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectBackendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
