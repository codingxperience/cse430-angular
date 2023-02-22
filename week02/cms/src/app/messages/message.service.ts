import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  //variable for event emiter
  messageChangeEvent = new EventEmitter<Message[]>();

  messages: Message[];

  constructor() { 
    this.messages = MOCKMESSAGES;
  }

  //method to get all messages
  getMessages(): Message[] {
    //return a copy of the array of messages
    return this.messages.slice();
  }

  //method to get a single specific message
  getMessage(id: string): Message {
    // //loop through all the contacts
    // this.contacts.forEach(contact => {
    //   //if ids match
    //   if (contact.id === id) {
    //     return contact;
    //   }
    // })
    // //if no id is found...
    // return null;

    //loop through all the messages
    this.messages.forEach(message => {
      // if ids match
      if (message.id === id){
        return message;
      }
    })
    // if no id is null
    return null;
  }

   //method to add a message
  addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangeEvent.emit(this.messages.slice());
  }
}
