import { Injectable } from "@angular/core";
import LocalStorage from "./local-storage.service";
import TasksList from "./tasks-list.service";

@Injectable()

export default class Folders {
  private folders: string[] = [];

  constructor(
    private localStorage: LocalStorage,
    private tasksListService: TasksList
  ) {}

  load(key: string) {
    this.folders = this.localStorage.get(key);
  }

  get() {
    return this.folders;
  }

  add(folderName: string) {
    this.folders.push(folderName);
    this.saveToLocalStorage();
  }

  check(folderName: string): boolean {
    return this.folders.includes(folderName);
  }

  delete(folderName: string) {
    const index = this.folders.indexOf(folderName);
    if (index !== -1) {
      this.folders.splice(index, 1)
    }
    this.saveToLocalStorage();
    this.tasksListService.deleteFolderInTasks(folderName);
  }

  saveToLocalStorage() {
    this.localStorage.set('folders', this.folders);
  }
}