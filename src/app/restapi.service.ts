import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RestapiService {
  base = '/api';
  constructor(private _http: HttpClient) { }

  placeOrder(order) {
    return this._http.post(`${this.base}/placeOrder`, order).map(res => res);
  }

  getOrder() {
    return this._http.get(`${this.base}/getOrder`).map(res => res);
  }

  updatePrepared(payload) {
    return this._http.post(`${this.base}/updatePrepared`, payload).map(res => res);
  }

}
