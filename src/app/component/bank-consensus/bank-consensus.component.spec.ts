import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankConsensusComponent } from './bank-consensus.component';

describe('BankConsensusComponent', () => {
  let component: BankConsensusComponent;
  let fixture: ComponentFixture<BankConsensusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankConsensusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankConsensusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
