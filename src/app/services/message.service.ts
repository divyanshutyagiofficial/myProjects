import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
  selected;
  info;
  constructor() { }

  setContact(data) {
    this.selected = data;
    sessionStorage.setItem('active', JSON.stringify(this.selected));
  }

  getContact() {
    return this.selected || JSON.parse(sessionStorage.getItem('active'));
  }

  setMyInfo(data) {
    this.info = data;
    sessionStorage.setItem('username', this.info);
  }

  getMyInfo() {
    return this.info || sessionStorage.getItem('username');
  }
}
