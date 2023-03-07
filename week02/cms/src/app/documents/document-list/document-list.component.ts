import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Document } from "../document.model";
import { DocumentService } from "../document.service";

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {

  //event emitter
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  
  //array/list of dummy documents
  documents: Document[] = [];

  private subscription: Subscription;

  //inject contact service
  constructor(private documentService: DocumentService) {}
  
  ngOnInit(): void {
    this.documentService.getDocuments();
    this.subscription = this.documentService.documentListChangedEvent
    .subscribe(
      (documentsList: Document[]) => {
        this.documents = documentsList;
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
