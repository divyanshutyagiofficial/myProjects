import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { RestapiService } from '../restapi.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  socket = io();
  data;

  constructor(private _restApiService: RestapiService) {
    this.updateCompletedOrder().subscribe(incoming => {
      this.data.forEach((element) => {
        if (element['dishId'] == incoming['dishId']) {
          element['prepared'] = incoming['prepared'];
          element['quantity'] = incoming['quantity'];
        }
      });
    });

    this.getOrder().subscribe(newOrder => {
      let searchFlag = false;
      this.data.forEach((element) => {
        if (element['dishId'] == newOrder['dishId']) {
          searchFlag = true;
          element['quantity'] = element['quantity'] + newOrder['quantity'];
          element['predicted'] = newOrder['predicted'];
          element['prepared'] = element['prepared'] + newOrder['prepared'];
        }
      });
      if (!searchFlag) {
        this.data.push(newOrder);
      }
      new Audio('assets/audio/notification.mp3').play();
    });
  }

  ngOnInit() {
    this._restApiService.getOrder().subscribe(orders => {
      this.data = orders;
    })
  }

  done(index, dishId, quantity, prepared) {
    if (quantity) {
      let newQuantity = quantity - 1;
      let newPrepared = prepared + 1;
      let outgoing = { prepared: newPrepared, dishId: dishId, quantity: newQuantity }
      this._restApiService.updatePrepared(outgoing).subscribe(data => {
        this.socket.emit('done-in', outgoing);
        setTimeout(() => {
          this.data[index]['prepared'] = newPrepared
          this.data[index]['quantity'] = newQuantity;
        }, 0)
      }, (error) => {
        alert('Something went wrong !!!')
      })
    }
  }

  updateCompletedOrder() {
    const observable = new Observable<any>(observer => {
      this.socket.on('done-out', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
    return observable;
  }

  getOrder() {
    const observable = new Observable<any>(observer => {
      this.socket.on('order-out', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
    return observable;
  }

}
