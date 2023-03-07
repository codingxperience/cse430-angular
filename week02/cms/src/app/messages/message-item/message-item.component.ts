import { Component, Input, OnInit } from '@angular/core';
import { ContactService } from 'src/app/contacts/contact.service';
import { Message } from "../message.model";
import { Contact } from "src/app/contacts/contact.model";

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit{
  @Input() message: Message;
  messageSender: string;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    //get single contact
    let contact: Contact = this.contactService.getContact(this.message.sender);
    //console.log('this is ' + contact);
    //assign name of contact to message sender
    this.messageSender = contact ? contact.name : 'Contact not found';
  }
}
