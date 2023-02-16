import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import EventData from '../shared/event';
import Folders from '../shared/services/folders.service';
import Observer from '../shared/services/observer.service';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css']
})
export class SidePanelComponent implements OnInit {
  sidePanelBGColor$: Observable<string>;
  sidePanelTextColor$: Observable<string>;  
  ifShowSubBtns: boolean = true;
  ifShowFoldersSubBtns: boolean = true;
  folders!: string[];
  

  constructor(
    private observer: Observer,
    private store: Store<{ headerSidePanelBGColor: string, blackAquaTextColor: string }>,
    private foldersService: Folders
  ) {
    this.sidePanelBGColor$ = this.store.select('headerSidePanelBGColor');
    this.sidePanelTextColor$ = this.store.select('blackAquaTextColor');
  }

  ngOnInit(): void {
    this.folders = this.foldersService.get();
  }

  toggleSubBtns(folderName: string) {
    this.ifShowSubBtns = !this.ifShowSubBtns;
    this.observer.emit(new EventData('displayTasks', folderName));
  }
  
  toggleFoldersSubBtns(folderName: string) {
    this.ifShowFoldersSubBtns = !this.ifShowFoldersSubBtns;
    this.observer.emit(new EventData('displayTasks', folderName));
  }
  
  displayTasksInRecycleBin(folderName: string) {
    this.observer.emit(new EventData('displayRecycleBin', folderName));
  }

  displaySpecificTasks(folderName: string) {
    this.observer.emit(new EventData('displayTasks', folderName));
    //console.log(folderName)
  }

  displayFoldersTasks(folderName: string) {
    this.observer.emit(new EventData('displayNewFoldersTasks', folderName));
    //console.log(folderName)
  }

  onAddFolderBtnClick() {
    this.observer.emit(new EventData('showAddNewBtnWindow'));
  }

  onDeleteBtnClick(folderName: string) {
    this.observer.emit(new EventData('showIfDeleteFolderMsg', folderName));
  } 
}
