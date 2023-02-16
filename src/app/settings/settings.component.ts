import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import EventData from '../shared/event';
import DateFunctionality from '../shared/services/date-functionality.service';
import Observer from '../shared/services/observer.service';
import RecycleBin from '../shared/services/recycle-bin.service';
import TasksList from '../shared/services/tasks-list.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  @ViewChild('text') taskText!: ElementRef;
  @ViewChild('date') taskDate!: ElementRef;
  @ViewChild('time') taskTime!: ElementRef;
  @Input() settingsName!: string;
  displayStyle: string = 'none';
  errorMessageDisplayStyle: string = 'none';
  ifTextAreaDisabled: string = 'enabled';
  //currentTaskElems!: TaskInfoElems;
  currentTask!: TaskInfo;

  constructor(
    private observer: Observer,
    private tasksListService: TasksList,
    private dateFunctionalityService: DateFunctionality,
    private recycleBinService: RecycleBin
  ) { 
    this.showSettings = this.showSettings.bind(this);
  }

  ngOnInit(): void {
    if (this.settingsName === 'addBtnSettings') {
      /* this.observer.addBtnClick.subscribe((value) => {
        this.displayStyle = 'flex';
        //this.observer.addBtnClick.unsubscribe();
      }); */
      this.observer.on('addBtnClick', this.showSettings);
    } else if (this.settingsName === 'editBtnSettings') {
      this.observer.on('editBtnClick', this.showSettings);
      /* this.observer.editBtnClick.subscribe((value) => {
        this.displayStyle = 'flex';
        //this.observer.addBtnClick.unsubscribe();
      }); */
      /* this.observer.on('editBtnClick' , (data: string) => {
        console.log(data)
        this.displayStyle = 'flex';
      }); */
    } else if (this.settingsName === 'restoreBtnSettings') {
      this.observer.on('restoreBtnClick', this.showSettings);
    }
  }

  showSettings(task: TaskInfo) {
    console.log('showSettings')
    this.dateFunctionalityService.setMinAttributeWithCurrentDate(this.taskDate.nativeElement);
    this.displayStyle = 'flex';
    setTimeout(() => this.taskText.nativeElement.focus(), 0);
    if (
      this.settingsName === 'editBtnSettings'
      || this.settingsName === 'restoreBtnSettings'
      || task.deleted
    ) {
      this.loadTaskInfo(task);
      this.currentTask = task;
    }
  }

  loadTaskInfo({text, date, time}: TaskInfo) {
    this.taskText.nativeElement.value = text || '';
    this.taskDate.nativeElement.value = date || '';
    this.taskTime.nativeElement.value = time || '';
  }

  onOkBtnClick(taskInfo: TaskInfo) {
    if (this.settingsName === 'editBtnSettings') {
      const date = this.infoCheck(taskInfo);
      if (typeof date === 'object') {
        this.taskUpdate(date);
        this.hideSettings();
        if (this.currentTask.deleted) {
          this.recycleBinService.saveTasksToLocalStorage();
        } else {
          this.tasksListService.saveTasksToLocalStorage();
        }
      }      
    } else if (this.settingsName === 'addBtnSettings') {
      this.infoCheckAndTaskCreation(taskInfo);
    }
  }

  taskUpdate({date, time}: {date: string, time: string}) {
    this.currentTask.text = this.taskText.nativeElement.value;
    this.currentTask.date = date;
    this.currentTask.time = time;
  }

  infoCheck({text, date, time}: TaskInfo): boolean | {date: string, time: string} {
    if (text.trim() === '') {
      this.showErrorMessage();
      return false;
    } 
    const dateChecked: {
      date: string,
      time: string
    } = this.checkDate({date, time});
    return dateChecked;
  }

  infoCheckAndTaskCreation(taskInfo: TaskInfo): boolean | void {
    const date = this.infoCheck(taskInfo);
    if (typeof date === 'object') {
      const taskInfoObj: TaskInfo = this.createTaskInfoObj(date);
      this.createTask(taskInfoObj);
      this.hideSettings();
      //setTimeout(() => this.observer.emit(new EventData('displayTasks', 'Текущие')));
    }        
  }

  checkDate({date, time}: {date: string, time: string}): {date: string, time: string} {
    return this.dateFunctionalityService.checkDateEntered({
      date: date,
      time: time
    });
  }

  createTaskInfoObj(dateChecked: { date: string, time: string }): TaskInfo {
    return {
      text: this.taskText.nativeElement.value,
      date: dateChecked.date,
      time: dateChecked.time
    }
  }

  createTask({text, date, time}: TaskInfo) {
    this.tasksListService.addTask({
      ifDisplay: true,
      text: text,
      date: date,
      time: time,
      done: false,
      expired: false,
      deleted: false,
      folders: []
    });
  }

  changeTextareaDisability(msg: boolean) {
    this.taskText.nativeElement.disabled = msg;
  }

  showErrorMessage() {
    this.errorMessageDisplayStyle = 'flex';
    this.taskText.nativeElement.disabled = true;
  }

  hideErrorMesssage() {
    this.errorMessageDisplayStyle = 'none';
    this.taskText.nativeElement.disabled = false;
  }

  hideSettings() {
    console.log('hideSettings')
    this.displayStyle = 'none';
    this.clearSettings();
    this.hideErrorMesssage();
    //this.observer.emit(new EventData('showTasks'));
    //setTimeout(() => this.observer.emit(new EventData('saveTasks')));
  }

  clearSettings() {
    this.taskText.nativeElement.value = '';
    this.clearDateAndTime();
  }

  clearDateAndTime() {
    this.taskDate.nativeElement.value = '';
    this.taskTime.nativeElement.value = '';
  }

}
