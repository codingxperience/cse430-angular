import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from "../contact.service";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
   //list of contacts
  contacts: Contact[] = [];

  //inject contact service
  constructor(private contactService: ContactService) {}

  
  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
  }

  //method to emit event
  onSelected(contact: Contact) {
    //emit event passing the contact as data
    this.contactService.contactSelectedEvent.emit(contact);
  }

}


