import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-private-messages',
  templateUrl: './private-messages.component.html',
  styleUrls: ['./private-messages.component.css']
})
export class PrivateMessagesComponent implements OnInit {

  connectedUsers: string[];
  newMsg: string;
  receivedMsgs: string[];

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.getConnectedUsers().subscribe(lst => {
      this.connectedUsers = lst;
    });
  }
}
