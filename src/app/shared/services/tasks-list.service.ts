import { Injectable } from "@angular/core";
import EventData from "../event";
import LocalStorage from "./local-storage.service";
import Observer from "./observer.service";
import RecycleBin from "./recycle-bin.service";
import SortTasks from "./sort-tasks.service";

@Injectable()

export default class TasksList {
  private tasksList: TaskInfo[] = [];

  constructor(
    private localStorage: LocalStorage,
    private recycleBinService: RecycleBin,
    private observer: Observer,
    private sortingService: SortTasks
  ) {}

  loadTasks(key: string) {
    this.tasksList = this.localStorage.get(key) as TaskInfo[];
  }

  getTasks() {
    return this.tasksList;
  }

  addTask(task: TaskInfo) {
    this.tasksList.push(task);
    this.saveTasksToLocalStorage();
    this.observer.emit(new EventData('displayTasks', 'Текущие'));
  }

  deleteTask(task: TaskInfo) {
    //console.log(this.tasksList)
    task.folders = [];
    const index = this.tasksList.findIndex((item) => item === task);
    if (index !== -1) {
      this.tasksList.splice(index, 1)
    }
    //this.tasksList = this.tasksList.filter((taskInList) => task !== taskInList)
    console.log('task deleted')
    console.log(task)
    this.recycleBinService.addTask(task);
    this.saveTasksToLocalStorage();
    //this.observer.emit(new EventData('updateTasks'));
  }

  saveTasksToLocalStorage() {
    this.localStorage.set('tasks', this.tasksList);
  }

  sortTasksByDateInAscendingOrder() {
    this.tasksList.sort(this.sortingService.sortByDateInAscendingOrder);
  }
  sortTasksByDateInDescendingOrder() {
    this.tasksList.sort(this.sortingService.sortByDateInDescendingOrder);
  }

  deleteFolderInTasks(folderName: string) {
    this.tasksList.forEach((task) => {
      const index = task.folders!.indexOf(folderName);
      if (index !== -1) {
        task.folders?.splice(index, 1);
      }
      console.log(task.folders);
    });
    this.saveTasksToLocalStorage();
  }
}