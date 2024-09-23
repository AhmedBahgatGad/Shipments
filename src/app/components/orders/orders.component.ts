import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../shared/services/orders.service';
import { IOrder } from '../shared/Interfaces/iorder';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  constructor(private _OrdersService: OrdersService) {}

  orders: IOrder[] = [];
  ngOnInit(): void {
    this._OrdersService.getAllOrders().subscribe({
      next: (response) => {
        this.orders = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
