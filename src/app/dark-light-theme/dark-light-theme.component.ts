import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import LocalStorage from '../shared/services/local-storage.service';
import { setDark, setWhite } from '../shared/store/actions/header-sidepanel-BGC.actions';
import * as TextColor from '../shared/store/actions/black-aqua-text-color.actions';
import * as DisplayBGC from '../shared/store/actions/display.actions';
import * as DisplayHeaderBGC from '../shared/store/actions/display-header.actions';
import * as TaskBGC from '../shared/store/actions/task-BGC.actions';
import * as NavajowhiteTextColor from '../shared/store/actions/black-navajowhite-text-color.actions';
import * as TaskTextareaBorder from '../shared/store/actions/task-textarea-border.actions';
import * as LoopImage from '../shared/store/actions/loop-image.actions';
import * as PlusImage from '../shared/store/actions/plus-image.actions';
//import Themes from '../shared/services/themes.service';

@Component({
  selector: 'app-dark-light-theme',
  templateUrl: './dark-light-theme.component.html',
  styleUrls: ['./dark-light-theme.component.css']
})
export class DarkLightThemeComponent implements OnInit {
  //BGImage: string = 'url(./assets/images/themes/light.png)'
  ifchecked: boolean = false;

  constructor(
    //private themesService: Themes,
    private store: Store,
    private localStorageService: LocalStorage
  ) { }

  ngOnInit(): void {
    const theme: boolean | TaskInfo[] = this.localStorageService.get('theme');
    if (typeof theme === 'boolean') {
      this.ifchecked = theme;
    }
    setTimeout(() => this.changeTheme());
  }

  changeTheme() {
    //console.log('changeTheme')
    if (this.ifchecked) {
      this.store.dispatch(setDark());
      this.store.dispatch(TextColor.setAqua());
      this.store.dispatch(DisplayHeaderBGC.setDark());
      this.store.dispatch(DisplayBGC.setDark());
      this.store.dispatch(TaskBGC.setDark());
      this.store.dispatch(NavajowhiteTextColor.setNavajowhite());
      this.store.dispatch(TaskTextareaBorder.set());
      this.store.dispatch(LoopImage.setWhite());
      this.store.dispatch(PlusImage.setAqua());
      //this.themesService.headerBGC = 'hsl(165deg 23% 25%)';
    } else {
      //this.themesService.headerBGC = 'white';
      this.store.dispatch(setWhite());
      this.store.dispatch(TextColor.setBlack());
      this.store.dispatch(DisplayHeaderBGC.setStandart());
      this.store.dispatch(DisplayBGC.setStandart());
      this.store.dispatch(TaskBGC.setStandart());
      this.store.dispatch(NavajowhiteTextColor.setBlack());
      this.store.dispatch(TaskTextareaBorder.unset());
      this.store.dispatch(LoopImage.setDark());
      this.store.dispatch(PlusImage.setBlack());
    }
    this.localStorageService.set('theme', this.ifchecked);
    //console.log(this.themesService.headerBGC)
  }

}
