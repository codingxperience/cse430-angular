import { Component, OnInit } from '@angular/core';
import { Document } from "../document.model";
import { DocumentService } from '../document.service';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { WinRefService } from "../../win-ref.service";

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit{
  // document property
  document: Document;

  // window property
  nativeWindow: any

 // inject document service, router and activated route
  constructor
  (
    private documentService:DocumentService,
    private windowRefService: WinRefService,
    private router: Router,
    private route: ActivatedRoute

    ) {
      this.nativeWindow = windowRefService.getNativeWindow();
    }
    onView() {
      if (this.document.url) {
        this.nativeWindow.open(this.document.url)
      }
    }

    // method to delete
    onDelete() {
      // delete using service
      this.documentService.deleteDocument(this.document);
       //navigate to /documents relative to this route
    this.router.navigate(['/documents'], { relativeTo: this.route });
   }
    ngOnInit(): void {
      // subscribe to the params of the current active route
      this.route.params.subscribe(
        (params: Params) => {
          // get the specific document (passing id param) and store it in document
          this.document = this.documentService.getDocument(params['id']);
        }
      )
    }
}
