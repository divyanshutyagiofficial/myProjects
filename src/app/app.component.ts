import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from './services/message.service';
import { EventEmitterService } from './services/event-emitter.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    count: number;
    constructor(private _http: Http, private _router: Router, private service: MessageService, private eventEmitter: EventEmitterService, private router: Router) {
        this.eventEmitter.currentCount.subscribe(count => {
            this.count = count;
        })
    }

    isAuthenticated(): boolean {
        return (sessionStorage.getItem('username') != undefined && sessionStorage.getItem('username').length > 0);
    }

    getUsername() {
        return this.service.getMyInfo();
    }

    logout() {
        sessionStorage.clear();
        this._router.navigate(['/login']);
    }
}
