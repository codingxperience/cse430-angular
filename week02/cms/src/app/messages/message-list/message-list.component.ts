import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {

  messages: Message[] = [
    new Message(
      "1",
      "Missed Assignment",
      "I kindly request for pardon. I had a family emergency",
      "Fred Okorio"
    ),
    new Message(
      "2",
      "Request For Resubmission",
      "I kindly request for re-do on test. Thanks",
      "Opio Mark"
    )
  ];

}
