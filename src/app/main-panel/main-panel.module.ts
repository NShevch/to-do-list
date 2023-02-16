import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderOfMainPanelComponent } from './header-of-main-panel/header-of-main-panel.component';
import { DisplayOfMainPanelComponent } from './display-of-main-panel/display-of-main-panel.component';
import { MainPanelComponent } from './main-panel.component';
import { AddTaskBtnComponent } from './header-of-main-panel/add-task-btn/add-task-btn.component';
import { TaskComponent } from './display-of-main-panel/task/task.component';
import { FormsModule } from '@angular/forms';
import { TaskSettingsComponent } from './display-of-main-panel/task/task-settings/task-settings.component';


@NgModule({
  declarations: [
    HeaderOfMainPanelComponent,
    DisplayOfMainPanelComponent,
    MainPanelComponent,
    AddTaskBtnComponent,
    TaskComponent,
    TaskSettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    MainPanelComponent
  ]
})
export class MainPanelModule { }
