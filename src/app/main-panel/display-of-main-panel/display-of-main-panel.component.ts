import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import EventData from 'src/app/shared/event';
import DateFunctionality from 'src/app/shared/services/date-functionality.service';
import LocalStorage from 'src/app/shared/services/local-storage.service';
import Observer from 'src/app/shared/services/observer.service';
import RecycleBin from 'src/app/shared/services/recycle-bin.service';
import TasksList from 'src/app/shared/services/tasks-list.service';

@Component({
  selector: 'app-display-of-main-panel',
  templateUrl: './display-of-main-panel.component.html',
  styleUrls: ['./display-of-main-panel.component.css']
})
export class DisplayOfMainPanelComponent implements OnInit {
  tasksList!: TaskInfo[]
  deletedTasksList!: TaskInfo[]
  tasksOrRecycleBin: string = 'tasks';
  displayBGC$: Observable<string>;

  constructor(
    private tasksListService: TasksList,
    private recycleBinService: RecycleBin,
    private observer: Observer,
    private localStorageService: LocalStorage,
    private dateFunctionalityService: DateFunctionality,
    private store: Store< { displayBGColor: string} >
  ) { 
    //this.updateTasks = this.updateTasks.bind(this);
    this.displayTasks = this.displayTasks.bind(this);
    this.displayRecycleBin = this.displayRecycleBin.bind(this);
    this.displayNewFoldersTasks = this.displayNewFoldersTasks.bind(this);
    this.displayBGC$ = this.store.select('displayBGColor');
  }

  ngOnInit(): void {
    console.log('display ngoninit')
    this.tasksList = this.tasksListService.getTasks();
    this.deletedTasksList = this.recycleBinService.getTasks();

    this.observer.on('displayRecycleBin', this.displayRecycleBin);
    this.observer.on('displayTasks', this.displayTasks);
    this.observer.on('displayNewFoldersTasks', this.displayNewFoldersTasks);

    this.showTodayOrCurrentOrExpiredTasks();
    console.log(this.deletedTasksList)
    //this.tasksList = this.tasksListService.loadTasks('tasks');
   // this.observer.on('saveTasks', this.saveTasksToLocalStorage);
    //this.observer.on('showTasks', () => console.log(this.tasksList));
    //this.observer.on('updateTasks', this.updateTasks);
  }

  showTodayOrCurrentOrExpiredTasks() {
		const {currentDate: todayDate} = this.dateFunctionalityService.getCurrentDateAndTimeInFormat();
		const ifTodayTasksExist: TaskInfo | undefined = this.tasksList.find((todayTask: TaskInfo) => {
			return todayTask.date === todayDate;
		});
		const ifExpiredTasksExist: TaskInfo | undefined = this.tasksList.find((taskObj: TaskInfo) => {
			return taskObj.expired === true;
		});
		if (ifTodayTasksExist) {
			this.displayTasks('На сегодня');
		} else if (ifExpiredTasksExist) {
			this.displayTasks('Просроченные');
		} else {
			this.displayTasks('Текущие');
		}
	}

  displayTasks(whichTasks: string) {
    this.tasksOrRecycleBin = 'tasks';
    switch (whichTasks) {
      case 'На сегодня':{
        this.displayTasksForToday();
        this.tasksListService.sortTasksByDateInAscendingOrder();
        this.observer.emit(new EventData('displayFolderName', whichTasks));
        break;
      }
      case 'Текущие': {
        this.displayCurrentTasks();
        this.tasksListService.sortTasksByDateInAscendingOrder();
        this.observer.emit(new EventData('displayFolderName', whichTasks));
        break;
      }
      case 'Просроченные': {
        this.displayExpiredTasks();
        this.tasksListService.sortTasksByDateInDescendingOrder();
        this.observer.emit(new EventData('displayFolderName', whichTasks));
        break;
      }
      case 'Завершённые': {
        this.displayDoneTasks();
        this.tasksListService.sortTasksByDateInDescendingOrder();
        this.observer.emit(new EventData('displayFolderName', whichTasks));
        break;
      }
      case 'Задачи': {
        this.displayAllTasks();
        this.tasksListService.sortTasksByDateInAscendingOrder();
        this.observer.emit(new EventData('displayFolderName', 'Задачи'));
        break;
      }
    }
  }

  displayNewFoldersTasks(whichFolder: string) {
    this.tasksOrRecycleBin = 'tasks';
    this.displayTasksInSpecificNewFolder(whichFolder);
    this.tasksListService.sortTasksByDateInAscendingOrder();
    this.observer.emit(new EventData('displayFolderName', whichFolder));
  }

  displayTasksInSpecificNewFolder(folderName: string) {
    console.log('displayTasksInFolder')
    this.tasksList.forEach((task) => {
      //console.log(task.done)
      //console.log(task.expired)
      if (task.folders?.includes(folderName)) {
        task.ifDisplay = true;
      } else {
        task.ifDisplay = false;
      }          
    });
  }

  displayAllTasks() {
    this.tasksList.forEach((task) => task.ifDisplay = true);
  }

  displayTasksForToday() {
    const {currentDate}: {currentDate: string} = this.dateFunctionalityService.getCurrentDateAndTimeInFormat();
    this.tasksList.forEach((task) => {
      if (
        task.date === currentDate
        && task.done === false 
      ) {
        task.ifDisplay = true;
      } else {
        task.ifDisplay = false;
      }          
    });
  }

  displayCurrentTasks() {
    console.log('displayCurrentTasks')
    this.tasksList.forEach((task) => {
      //console.log(task.done)
      //console.log(task.expired)
      if (
        task.done === false
				&& task.expired === false
      ) {
        task.ifDisplay = true;
      } else {
        task.ifDisplay = false;
      }          
    });
    //console.log(this.tasksList)
  }

  displayExpiredTasks() {
    this.tasksList.forEach((task) => {
      if (
        task.expired === true
				&& task.done === false
      ) {
        task.ifDisplay = true;
      } else {
        task.ifDisplay = false;
      }          
    });
  }

  displayDoneTasks() {
    this.tasksList.forEach((task) => {
      if (task.done === true) {
        task.ifDisplay = true;
      } else {
        task.ifDisplay = false;
      }          
    });
  }

  displayDeletedTasks() {
    this.deletedTasksList.forEach((task) => {
      if (task.deleted) {
        task.ifDisplay = true;
      } else {
        task.ifDisplay = false;
      }          
    });
  }

  displayRecycleBin(whichTasks: string) {
    this.tasksOrRecycleBin = 'recycleBin';
    this.displayDeletedTasks();
    this.observer.emit(new EventData('displayFolderName', whichTasks));
  }

/*   saveTasksToLocalStorage() {
    console.log('saveTasksToLocalStorage')
    //console.log(this.tasksList)
    this.localStorageService.set('tasks', this.tasksList);
  } */
/* 
  updateTasks() {
    this.tasksList = this.tasksListService.getTasks();
  } */

}
