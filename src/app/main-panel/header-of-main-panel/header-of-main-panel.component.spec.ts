import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderOfMainPanelComponent } from './header-of-main-panel.component';

describe('HeaderOfMainPanelComponent', () => {
  let component: HeaderOfMainPanelComponent;
  let fixture: ComponentFixture<HeaderOfMainPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderOfMainPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderOfMainPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
