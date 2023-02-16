import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sub-btn-of-side-panel',
  templateUrl: './sub-btn-of-side-panel.component.html',
  styleUrls: ['./sub-btn-of-side-panel.component.css']
})
export class SubBtnOfSidePanelComponent implements OnInit {
  @Input() subBtnStyles!: BtnStyles;
  @Input() dotStyles!: BtnStyles;
  @Output() onClickEvent = new EventEmitter();
  @Output() onDeleteBtnClickEvent = new EventEmitter();
  @Input() deleteImageNeeded: boolean = false;

  constructor() { }

  ngOnInit(): void {}

  onClick(folderName: string) {
    this.onClickEvent.emit(folderName.trim());
  }

  onDeleteFolderBtnClick(folderName: string) {
    this.onDeleteBtnClickEvent.emit(folderName.trim());
  }


}
