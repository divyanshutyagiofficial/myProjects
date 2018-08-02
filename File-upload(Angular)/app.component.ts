 import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Headers, Http } from '@angular/http';

@Component({
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
 
 
    myFile: File;
    fileEvent($event) {
        console.log($event.target.files[0]);
        this.myFile = $event.target.files[0];
    }

    submit() {
        let formData = new FormData();
        formData.append("Name", 'myFile');
        formData.append("myFile", this.myFile);
        let body = formData;
        this._http.post("http://localhost:3000/upload", body).map(res => {
            res.json();
        }).subscribe(data => {
            console.log(data);
        });
    }
}