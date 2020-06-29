import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { OrderService } from '../shared/order.service';
import { Order } from '../shared/order.model';

declare var M: any;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [OrderService],
})
export class OrderComponent implements OnInit {
  constructor(public orderService: OrderService) {}

  ngOnInit() {
    this.resetForm();
    this.refreshOrderList();
  }

  status: boolean = false;
  btnText: string = 'Add Order';

  showForm() {
    if (this.status != false) {
      this.btnText = 'Add Order';
    } else {
      this.btnText = 'Close';
    }
    this.status = !this.status;
  }

  resetForm(form?: NgForm) {
    if (form) form.reset();
    this.orderService.selectedOrder = {
      _id: '',
      productId: '',
      productAmount: '',
      userName: '',
    };
  }

  onSubmit(form: NgForm) {
    if (form.value._id == '') {
      this.orderService.postOrder(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshOrderList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    } else {
      this.orderService.putOrder(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshOrderList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshOrderList() {
    this.orderService.getOrderList().subscribe((res) => {
      this.orderService.orders = res as Order[];
    });
  }

  onEdit(ord: Order) {
    this.orderService.selectedOrder = ord;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to Remove this order ?') == true) {
      this.orderService.deleteOrder(_id).subscribe((res) => {
        this.refreshOrderList();
        this.resetForm(form);
        M.toast({ html: 'Removed successfully', classes: 'rounded' });
      });
    }
  }
}
