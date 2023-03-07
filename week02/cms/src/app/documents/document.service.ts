import { Injectable } from '@angular/core';
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";
import { Document } from "./document.model";
import { catchError, tap } from "rxjs/operators";
import { Subject, throwError } from "rxjs";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documents: Document[] = [];

  //property for max id
  maxDocumentId: number;

   // //event emiter for changes in the document
  // documentChangedEvent = new EventEmitter<Document[]>();

  //event emiter for changes in the document
  documentListChangedEvent = new Subject<Document[]>();

  constructor( private http: HttpClient) {
    //init documents to be the ones coming from mock
    // this.documents = MOCKDOCUMENTS;
    this.getDocuments();
    //get the max id at init time
    this.maxDocumentId = this.getMaxId();
  }

  //  //method to get all documents
  //  getDocuments(): Document[] {
  //   //return a copy of the array of documents
  //   return this.documents.slice();
  // }
  //method to get all documents
  getDocuments(): void {
    // make a HTTP GET request to the Firebase Realtime Database to get the documents
    this.http.get<Document[]>('https://cms-project-e4718-default-rtdb.firebaseio.com/documents.json')
      // chain operators to transform the emitted data
      .pipe(
        // tap() operator allows us to perform side-effects without modifying the data
        tap(documents => {
          // assign the array of documents received to the documents class attribute
          this.documents = documents;
          // get the maximum value used for the id property in the documents list
          this.maxDocumentId = this.getMaxId();
          // sort the list of documents by name in descending order
          this.documents.sort((a, b) => a.name.localeCompare(b.name));
          // signal that the list of documents has changed
          this.documentListChangedEvent.next(this.documents.slice());
        }),
        // catchError() operator allows us to handle errors and optionally return a new observable
        catchError(error => {
          // log the error to the console
          console.error(error);
          // re-throw the error to propagate it to the caller
          return throwError(error);
        })
      )
      // subscribe to the observable returned by the pipe() method
      .subscribe();
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

//   deleteDocument(document: Document) {
//     if (!document) {
//        return;
//     }
//     const pos = this.documents.indexOf(document);
//     if (pos < 0) {
//        return;
//     }
//     this.documents.splice(pos, 1);
//     this.documentChangedEvent.next(this.documents.slice());
//  }


// getMaxId(): number {

//   maxId = 0

//   for each document in the documents list
//       currentId = convert document.id into a number
//       if currentId > maxId then
//           maxId = currentId
//       endIf
//   endFor

//   return maxId
// }

  //method to get max id number in document list
  getMaxId(): number {
    //variable to hold max Id
    let maxId = 0;
    //loop through the document list
    for (const document of this.documents) {
      //get current id as a number
      const currentId = +document.id;
      //if the current id is greater than max ID...
      if (currentId > maxId) {
        //then max id is the current id
        maxId = currentId;
      }
    }
    //return that max id
    return maxId;
  }


  //method to add a document when user press add button
  addDocument(newDocument: Document) {
    //if null or undef...
    if (newDocument === null || newDocument === undefined) {
      //exit function
      return;
    }

    //if document exists..
    //increment id number and assign to new document (as string)
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    //push unto list
    this.documents.push(newDocument);
    //store documents on firebase database
    this.storeDocuments();
  }

   //method to update/replace an existing document
   updateDocument(originalDocument: Document, newDocument: Document) {
    //check if document exists...
    if (originalDocument === null || originalDocument === undefined || newDocument === null || newDocument === undefined) {
      //if not, exit function
      return;
    }

    //find position/index of original document
    const pos = this.documents.indexOf(originalDocument);
    //if the position is less than 0 (meaning it is not in the list)...
    if (pos < 0) {
      //exit
      return;
    }

    //set the id of new document to be tht of the original
    newDocument.id = originalDocument.id;
    //set the document in the list to be the new document
    this.documents[pos] = newDocument;
    //store documents on firebase database
    this.storeDocuments();
  }

  deleteDocument(document: Document) {
    //check if an existent document was passed
    if (document === null || document === undefined) {
      return;
    }
    //get position of document on list
    const pos = this.documents.indexOf(document);

    //if there is no document (index less than 0), exit.
    if (pos < 0) {
      return;
    }
    //removed document at specified position
    this.documents.splice(pos, 1);
    //store/modify documents on firebase database
    this.storeDocuments();
  }

   //method to store documents in database with put request
   storeDocuments() {
    //stringify the list of documnts
    let documents = JSON.stringify(this.documents);

    //create header for content type
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    //put method with url, documents object to replace, and headers
    this.http.put('https://cms-project-e4718-default-rtdb.firebaseio.com/documents.json', documents, { headers: headers })
      //subscribe to response
      .subscribe(
        () => {
          //once a response has been received, signal that the document list has changed, send copy of list
          this.documentListChangedEvent.next(this.documents.slice());
        }
      )
  }
}


