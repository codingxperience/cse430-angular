import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Document } from "../document.model";
import { DocumentService } from "../document.service";

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {

  
  //array/list of dummy documents
  documents: Document[];

  private subscription: Subscription;

  //inject contact service
  constructor(private documentService: DocumentService) {}
  
  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
    this.subscription = this.documentService.documentChangedEvent
    .subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
