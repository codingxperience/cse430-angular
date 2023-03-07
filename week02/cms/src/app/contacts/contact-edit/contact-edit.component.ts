import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Contact } from "../contact.model";
import { ContactService } from "../contact.service";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
	selector: 'app-contact-edit',
	templateUrl: './contact-edit.component.html',
	styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

	//property for contact copy and original contact
	contact: Contact = null;

	originalContact: Contact;
	//array of contacts
	groupContacts: Contact[] = [];
	//booleans to check if editmode is on nd if contact has a group
	editMode: boolean = false;
	hasGroup: boolean = false;
	invalidGroupContact: boolean;

	//inject contact service, router and current route
	constructor
		(
			private contactService: ContactService,
			private router: Router,
			private route: ActivatedRoute
		) {

	}


	//   ngOnInit() {
	//     route.subscribe (
	//       (params: Params) => {
	//          id = value of id parameter in params list
	//          if id parameter is undefined or null then
	//             editMode = false
	//             return
	//          endif
	//          originalContact = contactService.getContact(id)
	//          if originalContact is undefined or null then
	//              return
	//          endif
	//          editMode = true
	//          contact = clone originalContact

	//          if the contact has a group then
	//             groupContacts = clone the contact’s group
	//          endif
	//     }) 
	//  }

	ngOnInit(): void {
		//subscribe to changes in the route
		this.route.params.subscribe(
			(params: Params) => {
				//retrieve id from params
				const id = params['id'];

				//if id doesn't exist...
				if (!id) {
					//we are not on edit mode, exit
					this.editMode = false;
					return;
				}

				//if it does exist, retrieve contact by id from service and store in original
				this.originalContact = this.contactService.getContact(id);

				//if a contact with tht id does not exists...
				if (!this.originalContact) {
					//exit
					return;
				}

				//if it does exists, then we ar eon edit mode
				this.editMode = true;
				//clone original contact into copy contact
				this.contact = JSON.parse(JSON.stringify(this.originalContact));

				//check if contact has a group
				if (this.contact.group !== null && this.contact.group !== undefined) {
					//set has group to true
					this.hasGroup = true;
					// //make a clone of the original contact group property by sstoring into conntact
					// this.contact = JSON.parse(JSON.stringify(this.originalContact.group));
					// //make a clone of that contact group property and store into group ccontacts prop
					// this.groupContacts = this.contact.group.slice();

					//the approach above didn't work so I used spread to make a copy
					this.groupContacts = [...this.contact.group];
				}
			}
		)
	}

	onSubmit(form: NgForm) {
		//get values from form
		const values = form.value;

		//use values to populate new contact object
		const newContact = new Contact(null, values.name, values.email, values.phone, values.imageUrl, this.groupContacts);

		//if edit mode is true
		if (this.editMode === true) {
			//then update
			this.contactService.updateContact(this.originalContact, newContact);
		} else {
			//if not, then add new
			this.contactService.addContact(newContact);
		}

		//navigate away after submiting
		this.router.navigate(['/contacts'], { relativeTo: this.route });
	}

	onCancel() {
		this.router.navigate(['/contacts'], { relativeTo: this.route });
	}

	isInvalidContact(newContact: Contact) {
		// Check if newContact parameter is falsy
		if (!newContact) {
			return true;
		}

		// Check if newContact id is the same as the id of the current contact
		if (this.contact && newContact.id === this.contact.id) {
			return true;
		}

		// Check if newContact id is the same as any contact in the groupContacts array
		for (let i = 0; i < this.groupContacts.length; i++) {
			if (newContact.id === this.groupContacts[i].id) {
				return true;
			}
		}

		// If none of the above conditions are met, return false
		return false;
	}

	// This method adds a selected contact to the group contact list
	addToGroup($event: any) {
		// Get the selected contact from the event dragData
		const selectedContact: Contact = $event.dragData;

		// Check if the selected contact is invalid for the group
		const invalidGroupContact = this.isInvalidContact(selectedContact);
		if (invalidGroupContact) {
			// If the selected contact is invalid, return early and do not add it to the group
			return;
		}

		// If the selected contact is valid, add it to the groupContacts array
		this.groupContacts.push(selectedContact);
	}

	// This method removes an item from the groupContacts array at the given index
	onRemoveItem(index: number) {
		// Check if the index is valid
		if (index < 0 || index >= this.groupContacts.length) {
			// If the index is invalid, return early and do nothing
			return;
		}

		// If the index is valid, remove the item at the index from the groupContacts array
		this.groupContacts.splice(index, 1);
	}

}
