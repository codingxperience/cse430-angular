import { Component } from '@angular/core';
import { DocumentService } from "./document.service";

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent {
  //object for the selected document
  selectedDocument: Document;


  ngOnInit(): void {
    
    }
  }
