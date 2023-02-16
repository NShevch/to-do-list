import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { reducers } from './shared/store/index';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPanelModule } from './main-panel/main-panel.module';
import { SidePanelModule } from './side-panel/side-panel.module';
import { SettingsComponent } from './settings/settings.component';
import { ErrorMessageComponent } from './settings/error-message/error-message.component';
import Observer from './shared/services/observer.service';
import TasksList from './shared/services/tasks-list.service';
import DateFunctionality from './shared/services/date-functionality.service';
import SortTasks from './shared/services/sort-tasks.service';
import LocalStorage from './shared/services/local-storage.service';
import RecycleBin from './shared/services/recycle-bin.service';
import { IfDeleteMsgComponent } from './if-delete-or-restore-msg/if-delete-or-restore-msg.component';
import { DarkLightThemeComponent } from './dark-light-theme/dark-light-theme.component';
import { FilterComponent } from './filter/filter.component';
import Themes from './shared/services/themes.service';
import { AddNewFolderComponent } from './add-new-folder/add-new-folder.component';
import Folders from './shared/services/folders.service';
import { FoldersSelectWindowComponent } from './folders-select-window/folders-select-window.component';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    ErrorMessageComponent,
    IfDeleteMsgComponent,
    DarkLightThemeComponent,
    FilterComponent,
    AddNewFolderComponent,
    FoldersSelectWindowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainPanelModule,
    SidePanelModule,
    FormsModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [
    Observer,
    TasksList,
    DateFunctionality,
    SortTasks,
    LocalStorage,
    RecycleBin,
    Themes,
    Folders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
