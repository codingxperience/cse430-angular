import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { Subscription } from "rxjs";
import { ContactService } from "../contact.service";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit, OnDestroy {
   //list of contacts
  contacts: Contact[] = [];

    //property for search term
    searchterm: string;

  private subscription: Subscription;
  // //event emitter
  // @Output() selectedContactEvent = new EventEmitter<Contact>();

  //inject contact service
  constructor(private contactService: ContactService) {}


  ngOnInit(): void {
    this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
        // console.log(this.contacts)
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  search(value: string) {

    this.searchterm = value;

  }

}


