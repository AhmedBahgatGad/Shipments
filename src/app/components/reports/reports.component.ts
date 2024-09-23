import { Component, OnInit } from '@angular/core';
import { IOrder } from '../shared/Interfaces/iorder';
import { OrdersService } from '../shared/services/orders.service';
import { RegionService } from '../shared/services/region.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
})
export class ReportsComponent implements OnInit {
  constructor(
    private _OrdersService: OrdersService,
    private _RegionService: RegionService
  ) {}
  orders: IOrder[] = [];
  cities: { id: number; city_name: string }[] = [];
  ngOnInit(): void {
    this._RegionService.getAllCities().subscribe({
      next: (res) => {
        this.cities = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this._OrdersService.getAllOrders().subscribe({
      next: (response) => {
        this.orders = response.data;
        console.log(response.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
