import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm = new FormGroup({
    name: new FormControl(''),
    contact: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private _http: Http, private _router: Router) { }

  ngOnInit() {
  }

  signUp() {
    let newUser = this.signupForm.value
    console.log(newUser);
    this._http.post('api/signUp', newUser).subscribe(res => {
      this._router.navigate(['login']);
    }, error => {
      alert(error['_body']);
    })
  }
}
