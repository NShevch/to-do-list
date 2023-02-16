import { Component, OnInit } from '@angular/core';
import EventData from 'src/app/shared/event';
import Observer from 'src/app/shared/services/observer.service';

@Component({
  selector: 'app-add-task-btn',
  templateUrl: './add-task-btn.component.html',
  styleUrls: ['./add-task-btn.component.css']
})
export class AddTaskBtnComponent implements OnInit {

  constructor(private observer: Observer) { }

  ngOnInit(): void {
  }

  openAddSettings() {
    //this.observer.addBtnClick.next('Событие вызвано первым компонентом');
    this.observer.emit(new EventData('addBtnClick'));
  }

}
