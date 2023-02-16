import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import EventData from 'src/app/shared/event';
import Observer from 'src/app/shared/services/observer.service';
import RecycleBin from 'src/app/shared/services/recycle-bin.service';
import TasksList from 'src/app/shared/services/tasks-list.service';

@Component({
  selector: 'app-task-settings',
  templateUrl: './task-settings.component.html',
  styleUrls: ['./task-settings.component.css']
})
export class TaskSettingsComponent implements OnInit {
  @Input() taskElems!: TaskInfoElems;
  @Input() task!: TaskInfo;

  //@Output() ifDeleteMsgEvent = new EventEmitter<boolean>();

  displayStyle: string = 'none';

  constructor(
    private observer: Observer,
    private tasksListService: TasksList,
    private recycleBinService: RecycleBin
  ) {
    this.hideSettings = this.hideSettings.bind(this);
    this.hideSettingsIf = this.hideSettingsIf.bind(this);
  }

  ngOnInit(): void {
    this.observer.on('closeTasksSettingsMenu', this.hideSettingsIf)
  }

  hideSettingsIf(target: Element) {
    const settingWrap = this.taskElems.taskTime.parentElement?.nextElementSibling?.nextElementSibling?.children[0];
    if (target !== settingWrap) {
      this.hideSettings();
    }
  }

  showSettings() {
    //console.log('showSettings')
    this.displayStyle = 'flex';
    //setTimeout(() => this.observer.on('closeTasksSettingsMenu', this.hideSettings));
    //setTimeout(this.hideSettings, 2000);
  }

  hideSettings() {
    //console.log('hideSettings')
    this.displayStyle = 'none';
    //this.observer.unsubscribe('hideSettings');
    //console.log(this.displayStyle)
  }

  editTask(event: Event) {
    //event.stopPropagation();
    this.observer.emit(new EventData('editBtnClick', this.task));
    this.hideSettings();
  }  

  deleteTask(event: Event) {
    //event.stopPropagation();
    if (this.task.deleted) {
      //this.ifDeleteMsgEvent.emit(true);
      //console.log('deleteTask')
      /* this.recycleBinService.deleteTask(this.task);
      console.log(this.recycleBinService.getTasks()) */
      this.observer.emit(new EventData('showIfDeleteMsg', this.task));
    } else {
      this.tasksListService.deleteTask(this.task);
      console.log(this.tasksListService.getTasks())
    }
    this.hideSettings();
  }

  restoreTask() {
    this.observer.emit(new EventData('showIfRestoreMsg', this.task));
  }

  folderTask() {
    this.observer.emit(new EventData('showFoldersList', this.task));
  }
}
