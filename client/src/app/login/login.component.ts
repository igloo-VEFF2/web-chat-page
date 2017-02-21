import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string;
  loginFailed: boolean;

  constructor(private chatService: ChatService,
    private router: Router) { }

  ngOnInit() {
  }

    onLogin() {
      this.chatService.login(this.userName).subscribe(succeded => {
        this.loginFailed = !succeded;
        if (succeded === true) {
          this.router.navigate(['/rooms']);
        }
      });

      }

}
