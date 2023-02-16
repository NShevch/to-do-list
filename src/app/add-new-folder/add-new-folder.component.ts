import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Folders from '../shared/services/folders.service';
import Observer from '../shared/services/observer.service';

@Component({
  selector: 'app-add-new-folder',
  templateUrl: './add-new-folder.component.html',
  styleUrls: ['./add-new-folder.component.css']
})
export class AddNewFolderComponent implements OnInit {
  @ViewChild('newFolderNameInput') folderNameInput!: ElementRef;
  folderName: string = '';
  displayNewFolderName: string = 'none';
  //folders!: string[];

  constructor(
    private observer: Observer,
    private foldersService: Folders
  ) { 
    this.showAddNewBtnWindow = this.showAddNewBtnWindow.bind(this);
  }

  ngOnInit(): void {
    //this.folders = this.foldersService.get();
    this.observer.on('showAddNewBtnWindow', this.showAddNewBtnWindow);
  }

  showAddNewBtnWindow() {
    this.displayNewFolderName = 'flex';
    setTimeout(() => this.folderNameInput.nativeElement.focus());
  }

  hideAddNewBtnWindow() {
    this.displayNewFolderName = 'none';
    this.folderName = '';
  }

  onCreateBtnClick() {
    const nameIsValid = this.checkFolderName(this.folderName.trim());
    if (nameIsValid) {
      //console.log('nameIsValid');
      this.foldersService.add(this.folderName.trim());
      this.hideAddNewBtnWindow();
    }
    //console.log(this.folders)
  }

  checkFolderName(name: string) {
    console.log('checkFolderName');
    console.log(name);
    if (name.trim() === '') {
      this.folderName = 'Введите название папки!!!';
      this.folderNameInput.nativeElement.setAttribute('maxlength', '1');
      this.folderNameInput.nativeElement.style.color = 'red';
      //this.folderNameInput.removeEventListener('keydown', this.addNewFolderBinded);
      setTimeout(() => {
        this.folderName = '';
        this.folderNameInput.nativeElement.removeAttribute('maxlength');
        this.folderNameInput.nativeElement.style.color = 'black';
        this.folderNameInput.nativeElement.focus();
        //this.folderNameInput.addEventListener('keydown', this.addNewFolderBinded);
      }, 1500);
      return false;
    } 
    const existedName = this.foldersService.check(name);
    console.log('existedName')
    console.log(existedName)
    if (existedName) {
      this.folderName = 'Такая папка уже создана!!!';
      this.folderNameInput.nativeElement.setAttribute('maxlength', '1');
      this.folderNameInput.nativeElement.style.color = 'red';
      //this.folderNameInput.removeEventListener('keydown', this.addNewFolderBinded);
      setTimeout(() => {
        this.folderName = '';
        this.folderNameInput.nativeElement.removeAttribute('maxlength');
        this.folderNameInput.nativeElement.style.color = 'black';
        this.folderNameInput.nativeElement.focus();
        //this.folderNameInput.addEventListener('keydown', this.addNewFolderBinded);
      }, 1500);
      return false;
    }
    return true;
  }

}
