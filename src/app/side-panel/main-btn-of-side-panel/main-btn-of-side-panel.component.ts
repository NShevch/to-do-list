import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-main-btn-of-side-panel',
  templateUrl: './main-btn-of-side-panel.component.html',
  styleUrls: ['./main-btn-of-side-panel.component.css']
})
export class MainBtnOfSidePanelComponent implements OnInit {
  @Input() dropListArrowNeeded: boolean = false;
  @Input() addImageNeeded: boolean = false;
  @Output() onClickEvent = new EventEmitter();
  @Output() onAddFolderBtnClickEvent = new EventEmitter();
  @Input() dropListArrow_aqua!: boolean;
  @Input() dropListArrow_black!: boolean;
  plusImage$: Observable<string>;

  constructor(
    private store: Store<{ plusImage: string }>
  ) { 
    this.plusImage$ = this.store.select('plusImage');
  }

  ngOnInit(): void {
  }

  onClick(folderName: string) {
    this.onClickEvent.emit(folderName.trim());
  }

  onAddFolderBtnClick(event: Event) {
    event.stopPropagation();
    this.onAddFolderBtnClickEvent.emit();
  }

}
