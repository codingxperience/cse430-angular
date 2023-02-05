import { Injectable, EventEmitter } from '@angular/core';
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";
import { Document } from "./document.model";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  //variable for event emiter
  documentSelectedEvent = new EventEmitter<Document>();
  documents: Document [] = [];

  constructor() { 
    this.documents = MOCKDOCUMENTS;
  }

   //method to get all documents
   getDocuments(): Document[] {
    //return a copy of the array of documents
    return this.documents.slice();
  }

  //method to get a single specific document
  getDocument(id: string): Document {
    // //loop through all the contacts
    // this.contacts.forEach(contact => {
    //   //if ids match
    //   if (contact.id === id) {
    //     return contact;
    //   }
    // })
    // //if no id is found...
    // return null;

    for (let document of this.documents){
      // if ids match
      if (document.id === id) {
        return document;
      }
    }
    // if no id is found
    return null;
  }
}


