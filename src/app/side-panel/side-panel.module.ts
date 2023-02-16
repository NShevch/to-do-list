import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidePanelComponent } from './side-panel.component';
import { MainBtnOfSidePanelComponent } from './main-btn-of-side-panel/main-btn-of-side-panel.component';
import { SubBtnOfSidePanelComponent } from './sub-btn-of-side-panel/sub-btn-of-side-panel.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SidePanelComponent,
    MainBtnOfSidePanelComponent,
    SubBtnOfSidePanelComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SidePanelComponent
  ]
})
export class SidePanelModule { }
