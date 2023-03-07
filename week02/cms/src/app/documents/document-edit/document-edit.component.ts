import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { DocumentService } from "../document.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Document } from "../document.model";

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit{
  //variable for original unedited document
	originalDocument: Document;
	//variable for edited document;
	document: Document;
	//variable for edit mode
	editMode: boolean = false;

  //inject document service, router and route
	constructor(
    private documentService: DocumentService,
    private router: Router, 
    private route: ActivatedRoute) { 

    }

  //   ngOnInit() {
  //     route.subscribe (
  //       (params: Params) => {
  //          id = value of id parameter in params list
  //          if id parameter is undefined or null then
  //             editMode = false
  //             return
  //          endif
  //          originalDocument = getDocument(id)
      
  //          if originalDocument is undefined or null then
  //             return
  //          endif
  //          set editMode to true
  //          document = clone originalDocument
  //     }) 
  //  }

  ngOnInit(): void {
    // subscribe to the changes in the route paramaters
    this.route.params.subscribe(
      (params: Params) => {
        // get id from paramaters
        const id = params['id'];

        //if id doesn't exist on paramaters
        if (!id) {
          // set edit mode to false and exit..
          this.editMode = false;
          return;
        }

        // if it exists on params...
        // get and store the doc with that id in original document prop
        this.originalDocument = this.documentService.getDocument(id);

        // if no document is found with that id ...
        if(!this.originalDocument) {
          // exit function
          return
        }

        // if it's found...
        // set edit mode to true and store a copy of the original document
        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
      }
    )
  }

//   onSubmit(form: NgForm) {
//     value = form.value // get values from form’s fields
//     newDocument = new Document()
//     Assign the values in the form fields to the
//     corresponding properties in the newDocument
//     if (editMode = true) then
//      documentService.updateDocument(originalDocument, newDocument)
//     else
//      documentService.addDocument(newDocument)
//     endIf
//     route back to the '/documents' URL 
//  }
  onSubmit(form: NgForm){
    // get values from form
    const values = form.value;

    // create a document with the values from the form
    const newDocument = new Document(null, values.name, values.description, values.url, null);

    // if on edit mode..
    if (this.editMode === true) {
      // we update
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      // we add a new one
      this.documentService.addDocument(newDocument);
    }

    this.router.navigate(['/documents'], { relativeTo: this.route })
  }

  
// onCancel() {
//   route back to the '/documents' URL
//   }
   
onCancel() {
  this.router.navigate(['/documents'], { relativeTo: this.route });
}

}
