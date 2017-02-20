import { Component, OnInit } from '@angular/core';
import { ChatService } from "../chat.service";
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  roomId : string;
  messages: string[];
  newMessage: string;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private chatService: ChatService) { }

  ngOnInit() {
    this.roomId = this.route.snapshot.params['id'];
    this.chatService.getMessageList().subscribe(lst => {
      this.messages = lst;
    });
  }

    onNewMessage() {

    this.chatService.addMesssage(this.roomId, this.newMessage).subscribe(succeded => {
      if(succeded === true) {
        this.router.navigate(["messages", this.newMessage])
      }
    })
  }

}
