import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayOfMainPanelComponent } from './display-of-main-panel.component';

describe('DisplayOfMainPanelComponent', () => {
  let component: DisplayOfMainPanelComponent;
  let fixture: ComponentFixture<DisplayOfMainPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayOfMainPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayOfMainPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
