import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBtnOfSidePanelComponent } from './main-btn-of-side-panel.component';

describe('MainBtnOfSidePanelComponent', () => {
  let component: MainBtnOfSidePanelComponent;
  let fixture: ComponentFixture<MainBtnOfSidePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainBtnOfSidePanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainBtnOfSidePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
