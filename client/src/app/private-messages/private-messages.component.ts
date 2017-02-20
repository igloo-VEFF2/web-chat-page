import { Component, OnInit } from '@angular/core';
import { ChatService } from "../chat.service";

@Component({
  selector: 'app-private-messages',
  templateUrl: './private-messages.component.html',
  styleUrls: ['./private-messages.component.css']
})
export class PrivateMessagesComponent implements OnInit {

  constructor(private chatService: ChatService) { }

  connectedUsers : string[];
  newMsg : string;
  receivedMsgs : string[];

  ngOnInit() {
    this.chatService.getConnectedUsers().subscribe(lst => {
      this.connectedUsers = lst;
    });
  }

}
