import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MessageService } from './services/message.service';

@Injectable()
export class AuthguardGuard implements CanActivate {
  constructor(private _router: Router, private service: MessageService) { }

  canActivate(): boolean {
    if (!this.service.getMyInfo()) {
      this._router.navigate(['dashboard']);
      alert('you need to login first !!!');
      return false;
    }
    return true;
  }
}
