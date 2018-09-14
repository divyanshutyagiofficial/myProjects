import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { MessageService } from '../services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  private socket;
  data = [];
  typing: boolean = false;
  user = this.service.getMyInfo();
  selected;
  listData = [];
  flag: boolean = false;
  pings = [];
  userTyping: string;

  constructor(private _http: Http, private service: MessageService, private _router: Router) {
    this.socket = io();

    this.getPing().subscribe(data => {
      this.typing = false;
      if (data['sender'] !== this.user && data['receiver'] === this.user && data['read'] == false && this.selected == null) {
        this.listData.forEach(element => {
          if (element['username'] === data['sender']) {
            new Audio('assets/audio/ping.mp3').play();
            this.listData[this.listData.indexOf(element)]['unreadCount']++
          }
        })
      }
    });

    this.getTyping().subscribe(data => {
      if (data['sender'] !== this.user && data['isTyping'] && data['receiver'] == this.user) {
        this.typing = true;
        this.userTyping = data['sender'];
      } else {
        setTimeout(() => {
          this.typing = false;
        }, 2000);
      }
    });
  }

  ngOnInit() {
    sessionStorage.removeItem('active');
    this.selected = null;
    this._http.get('/api/getUsers/' + this.user).subscribe(users => {
      this.listData = users.json();
    });
  }

  getPing() {
    const observable = new Observable<any>(observer => {
      this.socket.on('new-message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
    return observable;
  }

  getTyping() {
    const observable = new Observable<any>(observer => {
      this.socket.on('typing', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
    return observable;
  }

  select(value) {
    this.selected = value;
    this.service.setContact(this.selected);
    this._router.navigate(['message']);
  }
}
