import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {
  @Input() showErrorMessage: string = 'none';
  @Output() showErrorMessageChange = new EventEmitter<string>();
  @Output() ifTextAreaDisabled = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  closeErrorWindow() {
    this.showErrorMessage = 'none';
    this.showErrorMessageChange.emit(this.showErrorMessage);
    this.ifTextAreaDisabled.emit(false);
  }

}
