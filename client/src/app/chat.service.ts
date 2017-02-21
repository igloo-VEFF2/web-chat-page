import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChatService {

  socket: any;
  currentUser: string;

  constructor() {
    //  this.socket = io("http://localhost:8080/");
    this.socket = io('http://localhost:8080/');
    this.socket.on('connect', function(){
      console.log('connect');
   });
  }

  login(userName: string): Observable<boolean> {
    const observable = new Observable(observer => {
      this.socket.emit('adduser', userName, succeded => {
        this.currentUser = userName;
        observer.next(succeded);
      });
    });
    return observable;
  }

  getRoomList(): Observable<string[]> {
    const obs = new Observable(observer => {
      this.socket.emit('rooms');
      this.socket.on('roomlist', (lst) => {
        const strArr: string[] = [];
        for (const x in lst) {
          if (lst.hasOwnProperty(x)) {
            strArr.push(x);
          }
        }
        observer.next(strArr);
      });
    });
    return obs;
  }

  addRoom(roomName: string): Observable<boolean> {
    const observable = new Observable(observer => {
      const param = {
        room: roomName
      };
      this.socket.emit('joinroom', param, function(a , boolean) {
        if (a === true) {
          observer.next(a);
        }
      });
    });
    return observable;
  }

  addMesssage(roomId: string, message: string): Observable<boolean> {
    const observable = new Observable(observer => {
      console.log('Message sent');
      const param = {
        roomName: roomId,
        msg: message
      };
      this.socket.emit('sendmsg', param);
    });
    return observable;
    }

    getMessageList(): Observable<string[]> {
    const obs = new Observable(observer => {
      console.log('Listening for messages');
      this.socket.on('updatechat', (roomName, lst= []) => {
        const strArr: string[] = [];
        observer.next(strArr);
      });
   });
   return obs;
  }

  getConnectedUsers(): Observable<string[]> {
    const obs = new Observable(observer => {
      console.log('Getting user list');
      this.socket.emit('users');
      this.socket.on('userlist', (lst) => {
        const strArr: string[] = [];
        for (const x in lst) {
          if (lst.hasOwnProperty(x)) {
            strArr.push(x);
          }
        }
      });
    });
    return obs;
  }

}
