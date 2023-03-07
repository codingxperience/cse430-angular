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

    this.messageService.messageListChangedEvent.subscribe((messages: Message[]) => {
      this.messages = messages;
    });

    this.messageService.getMessages();
  }

   //method to emit event
  onAddMessage(message: Message) {
    //push message to array of messages
    this.messages.push(message);
  }

}
