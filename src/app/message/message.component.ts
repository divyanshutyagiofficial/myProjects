import { Component, OnInit, HostListener } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { SortByPipe } from '../pipes/sort-by.pipe';
import { MessageService } from '../services/message.service';
import { EventEmitterService } from '../services/event-emitter.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  stickyFlag: boolean = false;
  noData: boolean = false;
  loading: boolean = false;

  private socket;
  text: string;
  data = [];
  typing: boolean = false;
  user = this.service.getMyInfo();
  contacts = [];
  selected;
  flag: boolean = false;
  pings: number = 0;

  constructor(private _http: Http, private service: MessageService, private eventEmitter: EventEmitterService) {
    this.socket = io();

    this.getMessage().subscribe(data => {
      console.log(data);
      this.typing = false;
      if (data['sender'] !== this.user && data['receiver'] === this.user && this.selected['username'] == data['sender']) {
        this.data.push({ message: data['message'], sender: data['user'], receiver: data['receiver'] });
        let element = document.getElementById('messages');
        let page = document.getElementById('page');
        page.scrollTop = page.scrollHeight;
        element.scrollTop = element.scrollHeight;
        new Audio('assets/audio/pop.wav').play();
        this.noData = false;
      }
      if (data['sender'] !== this.user && data['receiver'] === this.user && data['read'] == false && this.selected['username'] !== data['sender']) {
        new Audio('assets/audio/ping.mp3').play();
        this.pings = this.pings + 1;
        this.eventEmitter.updateCount(this.pings);
      }
    });

    this.getTyping().subscribe(data => {
      if (data['sender'] !== this.user && data['isTyping'] && data['receiver'] == this.user && this.selected['username'] == data['sender']) {
        this.typing = true;
      } else {
        setTimeout(() => {
          this.typing = false;
        }, 2000);
      }
    });
  }

  ngOnInit() {
    this.selected = this.service.getContact();
    this._http.post('/api/resetCount', { username: this.user, sender: this.selected['username'] }).subscribe(res => {
      this._http.get('/api/getMessages/' + this.user + '/' + this.selected['username']).subscribe(messages => {
        let data = messages.json();
        for (let a = 0; a < data.length; a++) {
          data[a]['read'] = true;
        }
        this.data = data;
        this.noData = !(this.data.length > 0);
        let element = document.getElementById('messages');
        let page = document.getElementById('page');
        page.scrollTop = page.scrollHeight;
        element.scrollTop = element.scrollHeight;
        this.loading = true;
      })
    })

  }

  getMessage() {
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

  setTyping() {
    this.socket.emit('typing', { sender: this.user, receiver: this.selected['username'], isTyping: true });
  }

  noTyping() {
    if (!this.text) {
      this.socket.emit('typing', { sender: this.user, receiver: this.selected['username'], isTyping: false });
    }
  }

  send() {
    if (this.text.replace(/\s/g, '').length) {
      let packet = {
        message: this.text,
        sender: this.user,
        receiver: this.selected['username'],
        read: false
      }
      this.socket.emit('send', packet);
      this.data.push(packet);
      this._http.post('/api/saveMessage', packet).subscribe(res => {
        let response = res.json();
        this.text = null;
        let element = document.getElementById('messages');
        let page = document.getElementById('page');
        page.scrollTop = page.scrollHeight;
        element.scrollTop = element.scrollHeight;
        this.noData = false;
        new Audio('assets/audio/pop.wav').play();
      })
    } else {
      alert('We suggest you to write a message.')
    }
  }
}