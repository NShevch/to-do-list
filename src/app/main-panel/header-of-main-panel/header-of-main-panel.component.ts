import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import Observer from 'src/app/shared/services/observer.service';

@Component({
  selector: 'app-header-of-main-panel',
  templateUrl: './header-of-main-panel.component.html',
  styleUrls: ['./header-of-main-panel.component.css']
})
export class HeaderOfMainPanelComponent implements OnInit {
  folder!: string;
  headerBGC$: Observable<string>;
  headerTextColor$: Observable<string>;

  constructor(
    private observer: Observer,
    private store: Store<{ displayHeaderBGColor: string, blackAquaTextColor: string }>
  ) {
    this.displayFolderName = this.displayFolderName.bind(this);
    this.headerBGC$ = this.store.select('displayHeaderBGColor');
    this.headerTextColor$ = this.store.select('blackAquaTextColor');
  }

  ngOnInit(): void {
    this.observer.on('displayFolderName', this.displayFolderName)
  }

  displayFolderName(folderName: string) {
    //console.log(folderName)
    this.folder = folderName;
  }
}
