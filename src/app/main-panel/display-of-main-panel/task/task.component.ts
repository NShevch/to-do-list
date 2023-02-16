import { Component, Input, OnInit, DoCheck } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import EventData from 'src/app/shared/event';
import DateFunctionality from 'src/app/shared/services/date-functionality.service';
import Observer from 'src/app/shared/services/observer.service';
import RecycleBin from 'src/app/shared/services/recycle-bin.service';
import TasksList from 'src/app/shared/services/tasks-list.service';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, DoCheck {
  @Input() task!: TaskInfo;
  ifChecked: string | null = null;
  textElemBGC$: Observable<string>;
  textElemTextColor$: Observable<string>;
  textElemBorder$: Observable<string>;
  tilesOrList: string = 'tiles';
  //displayDeleteMsg: string = 'none';

  constructor(
    private dateFunctionalityService: DateFunctionality,
    private observer: Observer,
    private tasksListService: TasksList,
    private recycleBinService: RecycleBin,
    private store: Store<{ 
      taskBGColor: string, 
      blackNavajowhiteTextColor: string,
      taskTextareaBorder: string
    }>
  ) {
    this.textElemBGC$ = this.store.select('taskBGColor');
    this.textElemTextColor$ = this.store.select('blackNavajowhiteTextColor');
    this.textElemBorder$ = this.store.select('taskTextareaBorder');
  }

  ngOnInit(): void { 
    console.log('ngOnInit')
    this.checkIfTaskExpiredOrDone();
  }
  
  ngDoCheck(): void { 
    //console.log('DoCheck')
    this.checkIfTaskExpiredOrDone();
  }

  checkboxChange(event: Event) {
    //console.log('checkboxChange')
    const checkbox: HTMLInputElement = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.task.done = true;
    } else {
     this.task.done = false;
    }
    //this.checkIfTaskExpired();
    this.tasksListService.saveTasksToLocalStorage();
    //this.observer.emit(new EventData('saveTasks'));
  }

  checkIfTaskExpiredOrDone() {
    this.checkIfTaskDone();
    this.checkIfTaskExpired();
  }

  checkIfTaskExpired() {
    //console.log('checkIfTaskExpired')
    const {currentDate, currentTime}: {
      currentDate: string,
      currentTime: string
    } = this.dateFunctionalityService.getCurrentDateAndTimeInFormat();
    const currentDateFull: string = currentDate + currentTime;
    const taskDateFull: string = this.task.date + this.task.time;
    if (
      taskDateFull <= currentDateFull
      && this.task.date !== ''
      && this.task.time !== ''
      /* && this.task.done !== true */
    ) {
      this.task.expired = true;
    } else {
      this.task.expired = false;
    }
  }

  checkIfTaskDone() {
   // console.log('checkIfTaskDone')
    if (this.task.done === true) {
      this.ifChecked = 'checked'
    } else {
      this.ifChecked = null;
    }
  }
}