import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IfDeleteMsgComponent } from './if-delete-or-restore-msg.component';

describe('IfDeleteMsgComponent', () => {
  let component: IfDeleteMsgComponent;
  let fixture: ComponentFixture<IfDeleteMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IfDeleteMsgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IfDeleteMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
