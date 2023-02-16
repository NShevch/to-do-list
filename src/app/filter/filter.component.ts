import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import TasksList from 'src/app/shared/services/tasks-list.service';
import EventData from '../shared/event';
import Observer from '../shared/services/observer.service';
import RecycleBin from '../shared/services/recycle-bin.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  searchText!: string;
  tasks!: TaskInfo[];
  tasksDeleted!: TaskInfo[];
  loopImage$: Observable<string>;
  filterTextColor$: Observable<string>;
  ifRecycleBin: boolean = false;

  constructor(
    private tasksListService: TasksList,
    private recycleBinService: RecycleBin,
    private observer: Observer,
    private store: Store<{ loopImage: string, blackNavajowhiteTextColor: string }>
  ) {
    this.loopImage$ = this.store.select('loopImage');
    this.filterTextColor$ = this.store.select('blackNavajowhiteTextColor');

    this.whatToFilter = this.whatToFilter.bind(this);
  }

  ngOnInit(): void {
    this.tasks = this.tasksListService.getTasks();
    this.tasksDeleted = this.recycleBinService.getTasks();
    this.observer.on('displayFolderName', this.whatToFilter);
  }

  whatToFilter(folder: string) {
    if (folder === 'Корзина') {
      this.ifRecycleBin = true;
    } else {
      this.ifRecycleBin = false;
    }
  }

  onInput() {
    if (this.ifRecycleBin) {
      this.tasksDeleted.forEach((task) => {
        if (new RegExp(this.searchText.trim(), "i").test(task.text)) {
          task.ifDisplay = true;
        } else {
          task.ifDisplay = false;
        }
      });
      return;
    }
    if (this.searchText.length === 1) {
      this.observer.emit(new EventData('displayFolderName', 'Задачи'));
    }
    this.tasks.forEach((task) => {
      if (new RegExp(this.searchText.trim(), "i").test(task.text)) {
        task.ifDisplay = true;
      } else {
        task.ifDisplay = false;
      }
    });
  }

  onFocus() {
    this.searchText = '';
  }
}
