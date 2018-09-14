import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _http: Http) { }

  myFile: File;
  cover: string;

  ngOnInit() {
    this._http.get('/api/getCover').subscribe(res => {
      this.cover = '/api/public/uploads/' + JSON.parse(res['_body'])['cover'][0].name;
      console.log(this.cover);
    });
  }

  fileEvent($event) {
    console.log($event.target.files[0]);
    this.myFile = $event.target.files[0];
  }

  submit() {
    let formData = new FormData();
    formData.append("Name", 'myFile');
    formData.append("myFile", this.myFile);
    let body = formData;
    this._http.post("/api/uploadCover", body).subscribe(data => {
      console.log(data);
    });
  }
}
