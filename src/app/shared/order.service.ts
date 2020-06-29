import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Order } from './order.model';

@Injectable()
export class OrderService {
  selectedOrder: Order;
  orders: Order[];
  readonly baseURL = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) { }

  postOrder(ord: Order) {
    return this.http.post(this.baseURL, ord);
  }

  getOrderList() {
    return this.http.get(this.baseURL);
  }

  putOrder(ord: Order) {
    return this.http.put(this.baseURL + `/${ord._id}`, ord);
  }

  deleteOrder(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

}
