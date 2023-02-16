import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubBtnOfSidePanelComponent } from './sub-btn-of-side-panel.component';

describe('SubBtnOfSidePanelComponent', () => {
  let component: SubBtnOfSidePanelComponent;
  let fixture: ComponentFixture<SubBtnOfSidePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubBtnOfSidePanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubBtnOfSidePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
