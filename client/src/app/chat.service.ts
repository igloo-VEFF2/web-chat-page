import { Injectable } from '@angular/core';
import * as io from "socket.io-client";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ChatService {

  socket : any;

  constructor() {
    //  this.socket = io("http://localhost:8080/");
    this.socket = io("http://localhost:8080/");
    this.socket.on("connect", function(){
      console.log("connect");
   });
  }

  login(userName: string) : Observable<boolean> {
    let observable = new Observable( observer => {
      this.socket.emit("adduser", userName, succeded => {
        observer.next(succeded);
      });
    });

    return observable;
  }

  getRoomList() : Observable<string[]> {
    let obs = new Observable( observer => {
      this.socket.emit("rooms");
      this.socket.on("roomlist", (lst) => {
        let strArr: string[] = [];
        for (var x in lst){
          strArr.push(x);
        }
        observer.next(strArr);
      })
    });

    return obs;
  }

  addRoom(roomName : string) : Observable<boolean> {
    const observable = new Observable(observer => {
      var param = {
        room: roomName
      };
      this.socket.emit("joinroom", param, function(a , boolean) {
        if(a === true) {
          observer.next(a);
        }
      });
    });
    
    return observable;
  }

}