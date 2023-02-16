import { Injectable } from "@angular/core";
import LocalStorage from "./local-storage.service";
import TasksList from "./tasks-list.service";

@Injectable()

export default class RecycleBin {
  private tasks: TaskInfo[] = [];

  constructor(
    private localStorageService: LocalStorage
  ) {}

  getTasks() {
    return this.tasks;
  }

  loadTasks(key: string) {
    this.tasks = this.localStorageService.get(key) as TaskInfo[];
  }

  addTask(task: TaskInfo) {
    task.deleted = true;
    this.tasks.unshift(task);
    this.saveTasksToLocalStorage();
  }

  deleteTask(task: TaskInfo) {
    //console.log(this.tasks)
    const index = this.tasks.findIndex((item) => item === task);
    if (index !== -1) {
      this.tasks.splice(index, 1)
    }
    //this.tasksList = this.tasksList.filter((taskInList) => task !== taskInList)
    //console.log(this.tasks)
    this.saveTasksToLocalStorage();
    //this.observer.emit(new EventData('updateTasks'));
  }

  saveTasksToLocalStorage() {
    this.localStorageService.set('recycleBin', this.tasks);
  }
}