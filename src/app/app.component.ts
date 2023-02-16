import { Component, HostListener, OnInit, OnChanges, /* DoCheck */ } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import EventData from './shared/event';
import Folders from './shared/services/folders.service';
import Observer from './shared/services/observer.service';
import RecycleBin from './shared/services/recycle-bin.service';
import TasksList from './shared/services/tasks-list.service';
import Themes from './shared/services/themes.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit/*,  DoCheck */ {
  headerBGC$: Observable<string>;

  @HostListener('click', ['$event.target']) 
  closeTasksSettingsMenuEvent(target: Element) {
    this.observer.emit(new EventData('closeTasksSettingsMenu', target));
  }

  constructor(
    private tasksListService: TasksList,
    private recycleBinService: RecycleBin,
    private foldersService: Folders,
    private observer: Observer,
    private themesService: Themes,
    private store: Store<{ headerSidePanelBGColor: string }>
  ) {
    this.headerBGC$ = this.store.select('headerSidePanelBGColor');
  }

  ngOnInit(): void {
    this.tasksListService.loadTasks('tasks');
    this.recycleBinService.loadTasks('recycleBin');
    this.foldersService.load('folders');
    //this.headerBG = this.themesService.headerBGC;
  }

  /* ngDoCheck() {
    console.log('app do check')
    //this.headerBG = this.themesService.headerBGC;
  } */
  
}
