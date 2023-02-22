import { Component, Input, OnInit } from '@angular/core';
import { Contact } from "../contact.model";
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute, Params } from "@angular/router";


@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  // contact property
  contact: Contact;

  // inject document service, router and activated route
  constructor
  (
    private contactService:ContactService,
    // private windowRefService: WinRefService,
    private router: Router,
    private route: ActivatedRoute

    ) {
      
    }
  
    ngOnInit(): void {
      // subscribe to the params of the current active route
      this.route.params.subscribe(
        (params: Params) => {
          // get the specific contact (passing id param) and store it in contact
          this.contact = this.contactService.getContact(params['id']);
        }
      )
    }

    // method to delete
    onDelete() {
      // delete using service
      this.contactService.deleteContact(this.contact);
       //navigate to /documents relative to this route
    this.router.navigate(['/contacts'], { relativeTo: this.route });
   }
}
