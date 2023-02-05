import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from "../document.model";

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [
    new Document(
      "1",
      "WDD 430 - Full Web Stack Development",
      "Learn how to develop modern web applications using the MEAN stack",
      "https://www.youtube.com/watch?v=MusIvEKjqsc",
      null
    ),
    new Document(
      "2",
      "CSE 111 - Programming with Functions",
      "Learn to write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.",
      "https://www.youtube.com/watch?v=MusIvEKjqsc",
      null
    ),
    new Document(
      "3",
      "CSE 210 - Programming with Classess",
      "This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.",
      "https://www.youtube.com/watch?v=MusIvEKjqsc",
      null
    ),
    new Document(
      "4",
      "WDD 230 - Web Frontend Development I",
      "This course focuses on the planning and development of responsive web sites using HTML, CSS, and JavaScript with attention to usability principle.",
      "https://www.youtube.com/watch?v=MusIvEKjqsc",
      null
    ),
    new Document(
      "5",
      "WDD 130 - Programming with Classess",
      "Understanding the fields of web design and development and will have a good idea if they want to pursue this degree as a major.",
      "https://www.youtube.com/watch?v=MusIvEKjqsc",
      null
    )
  ];

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
