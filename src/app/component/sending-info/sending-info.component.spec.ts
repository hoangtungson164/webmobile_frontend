import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendingInfoComponent } from './sending-info.component';

describe('SendingInfoComponent', () => {
  let component: SendingInfoComponent;
  let fixture: ComponentFixture<SendingInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendingInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
