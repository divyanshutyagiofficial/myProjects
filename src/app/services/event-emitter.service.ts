import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class EventEmitterService {

  private count = new BehaviorSubject<number>(0);
  currentCount = this.count.asObservable();

  constructor() { }

  updateCount(count: number) {
    this.count.next(count);
  }
}

