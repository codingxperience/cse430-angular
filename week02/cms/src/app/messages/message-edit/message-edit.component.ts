import { Component, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent {
  currentSender: string = "Sam Dickens"
  @ViewChild('subject') subjectInputRef: ElementRef;
  @ViewChild('msgText') msgTextInputRef: ElementRef;
  @Output() messageAdded = new EventEmitter<Message>();
  
  onSendMessage() {
    // const msgSubject = this.subjectInputRef.nativeElement.value;
    // const msg = this.msgTextInputRef.nativeElement.value;
    // const newMessage = new Message ('3', "Sam Dickens", msgSubject, msg);
    this.messageAdded.emit(
      new Message (
        '3',
        this.subjectInputRef.nativeElement.value,
        this.msgTextInputRef.nativeElement.value,
        this.currentSender
      )
    )
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = "";
    this.msgTextInputRef.nativeElement.value = "";
  }
}
