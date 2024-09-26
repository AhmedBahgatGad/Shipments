import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../shared/services/orders.service';
import { IOrder } from '../shared/Interfaces/iorder';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  constructor(
    private _OrdersService: OrdersService,
    private _ToastrService: ToastrService
  ) {}

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

  delete(id: number): void {
    this._OrdersService.deleteOrder(id).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message, 'Shipping Company');
        this._OrdersService.getAllOrders().subscribe({
          next: (response) => {
            this.orders = response.data;
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
    });
  }
}
