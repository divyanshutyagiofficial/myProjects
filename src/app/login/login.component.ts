import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private _http: Http, private router: Router, private service: MessageService) { }

  ngOnInit() {
  }

  login() {
    this._http.post('api/login', this.loginForm.value).subscribe(res => {
      let data = res.json();
      this.service.setMyInfo(data['username']);
      this.router.navigate(['contacts']);
    }, (error) => {
      alert(error['_body']);
    })
  }
}
