import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from "../message.service";

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  //list of contacts
  messages: Message[] = [];

  //inject contact service
  constructor(private messageService: MessageService) {}

  
  ngOnInit(): void {
    this.messages = this.messageService.getMessages();
    this.messageService.messageChangeEvent.subscribe((messages: Message[]) => {
      this.messages = messages;
    });
  }

   //method to emit event
  onAddMessage(message: Message) {
    //push message to array of messages
    this.messages.push(message);
  }

}
