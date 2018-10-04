import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../restapi.service';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  socket = io();
  dishes = [
    {
      dishName: 'Jumbo Chicken Wrap',
      dishId: 'P01',
      quantity: 0,
      predicted: 0,
      prepared: 0
    },
    {
      dishName: 'Vegetarian Lasagne',
      dishId: 'P02',
      quantity: 0,
      predicted: 0,
      prepared: 0
    },
    {
      dishName: 'Chicken Rice Feast',
      dishId: 'P03',
      quantity: 0,
      predicted: 0,
      prepared: 0
    },
    {
      dishName: 'Grilled Chicken Breast',
      dishId: 'P04',
      quantity: 0,
      predicted: 0,
      prepared: 0
    }
  ]
  constructor(private _restApiService: RestapiService) { }

  ngOnInit() {
  }

  order(index, dish) {
    let order = dish;
    this._restApiService.placeOrder(order).subscribe(data => {
      this.socket.emit('order-in', order);
      setTimeout(() => {
        this.order[index]['quantity'] = 0;
        this.order[index]['predicted'] = 0;
      }, 0);
    }, (error) => {
      alert('Something went wrong, Please try again !!!');
    })
  }

}
