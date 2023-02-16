import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoldersSelectWindowComponent } from './folders-select-window.component';

describe('FoldersSelectWindowComponent', () => {
  let component: FoldersSelectWindowComponent;
  let fixture: ComponentFixture<FoldersSelectWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoldersSelectWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoldersSelectWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
