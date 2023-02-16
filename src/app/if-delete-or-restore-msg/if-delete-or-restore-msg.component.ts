import { Component, ElementRef, Host, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import EventData from '../shared/event';
import Folders from '../shared/services/folders.service';
import Observer from '../shared/services/observer.service';
import RecycleBin from '../shared/services/recycle-bin.service';
import TasksList from '../shared/services/tasks-list.service';


@Component({
  selector: 'app-if-delete-or-restore-msg',
  templateUrl: './if-delete-or-restore-msg.component.html',
  styleUrls: ['./if-delete-or-restore-msg.component.css']
})
export class IfDeleteMsgComponent implements OnInit {
  //@Input() ifDisplay: boolean = false;
  //@Output() btnEvent = new EventEmitter();
  @Input() kindOfMsg!: string;
  currentTask!: TaskInfo;
  currentFolderName!: string;
  display: string = 'none';
  
  constructor(
    private observer: Observer,
    private recycleBinService: RecycleBin,
    private taskListService: TasksList,
    private foldersService: Folders,
  ) { 
    this.showIfDeleteFolderMsg = this.showIfDeleteFolderMsg.bind(this);
    this.showIfDeleteOrRestoreMsg = this.showIfDeleteOrRestoreMsg.bind(this);
   }

  ngOnInit(): void {
    if (this.kindOfMsg === 'deleteMsg') {
      this.observer.on('showIfDeleteMsg', this.showIfDeleteOrRestoreMsg);
    } else if (this.kindOfMsg === 'restoreMsg') {
      this.observer.on('showIfRestoreMsg', this.showIfDeleteOrRestoreMsg);
    } else if (this.kindOfMsg === 'deleteFolderMsg') {
      this.observer.on('showIfDeleteFolderMsg', this.showIfDeleteFolderMsg);
    }
  }

  showMsg() {
    this.display = 'flex';
  }

  showIfDeleteOrRestoreMsg(task: TaskInfo) {
    console.log('showIfDeleteMsg');
    this.currentTask = task;
    this.showMsg();
  }

  showIfDeleteFolderMsg(folderName: string) {
    this.currentFolderName = folderName;
    this.showMsg();
  }

  hideMsg() {
    console.log('hideIfDeleteMsg');
    this.display = 'none';
  }

  onYesClick() {
    //this.btnEvent.emit('yes');
    //console.log('onYesClick');
    if (this.kindOfMsg === 'deleteMsg') {
      this.recycleBinService.deleteTask(this.currentTask)
    } else if (this.kindOfMsg === 'restoreMsg') {
      this.recycleBinService.deleteTask(this.currentTask);
      this.currentTask.deleted = false;
      this.currentTask.done = false;
      this.currentTask.expired = false;
      this.taskListService.addTask(this.currentTask);
      //console.log('taskrestored')
      //console.log(this.currentTask)
    } else if (this.kindOfMsg === 'deleteFolderMsg') {
      console.log(this.currentFolderName)
      this.foldersService.delete(this.currentFolderName);
      this.observer.emit(new EventData('displayTasks', 'Задачи'));
    }
    this.hideMsg();
  }

}
