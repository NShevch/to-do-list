import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Folders from '../shared/services/folders.service';
import LocalStorage from '../shared/services/local-storage.service';
import Observer from '../shared/services/observer.service';
import TasksList from '../shared/services/tasks-list.service';

@Component({
  selector: 'app-folders-select-window',
  templateUrl: './folders-select-window.component.html',
  styleUrls: ['./folders-select-window.component.css']
})
export class FoldersSelectWindowComponent implements OnInit {
  @ViewChild('input') input!: ElementRef;
  folders!: string[];
  currentTask!: TaskInfo;
  displayFoldersList: string = 'none';
  taskFoldersToSave: string[] = [];

  constructor(
    private foldersService: Folders,
    private observer: Observer,
    private tasksListService: TasksList
  ) { 
    this.showFoldersListAndRememberCurrentTask = this.showFoldersListAndRememberCurrentTask.bind(this);
  }

  ngOnInit(): void {
    this.folders = this.foldersService.get();
    this.observer.on('showFoldersList', this.showFoldersListAndRememberCurrentTask);
  }

  ifChecked(folderInList: string) {
    //console.log('ifChecked')
    if (this.currentTask === undefined) {
      return null;
    }
    //console.log(this.currentTask.text)
    if (this.currentTask.folders!.includes(folderInList)) {
      //console.log(this.currentTask.folders!.includes(folderInList))
      //console.log('checked')
      return 'checked';
    } 
    return null;
  }

  showFoldersList() {
    this.displayFoldersList = 'flex';
  }

  hideFoldersList() {
    this.displayFoldersList = 'none';
  }

  showFoldersListAndRememberCurrentTask(task: TaskInfo) {
    this.currentTask = task;
    this.taskFoldersToSave = [...task.folders!];
    this.showFoldersList();
  }

  onSaveFoldersBtnClick() {
    this.currentTask.folders = this.taskFoldersToSave;
    this.hideFoldersList();
    this.tasksListService.saveTasksToLocalStorage();
  }

  onCheckboxChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      //console.log('checked')
      this.taskFoldersToSave.push(input.value);
    } else {
      //console.log('not checked')
      this.taskFoldersToSave = this.taskFoldersToSave.filter((folder) => folder !== input.value);
    }
    //console.log(this.currentTask.folders)
  }
}
