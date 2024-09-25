import { Component, OnInit, ViewChild } from '@angular/core';
import { BlankLayoutComponent } from '../blank-layout/blank-layout.component';
import { AuthLayoutComponent } from '../auth-layout/auth-layout.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { OrdersService } from '../shared/services/orders.service';
import { ICards } from '../shared/Interfaces/icards';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BlankLayoutComponent, AuthLayoutComponent, CarouselModule, NgApexchartsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  chartOptions: Partial<ChartOptions>;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoWidth: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: true,
  };
  ordersData: {
    trackingNumber: number;
    date: string;
    clientName: string;
    governrate: string;
    city: string;
    cost: number;
    status: string;
    phone: number;
  }[] = [];
  slide1: ICards[] = [
    {
      title: 'new',
      icon: 'fa-solid fa-car fa-2x',
      count: 95.454,
      total: 90,
    },
    {
      title: 'Pending',
      icon: 'fa-regular fa-clock fa-2x',
      count: 95454,
      total: 90,
    },
    {
      title: 'On the way',
      icon: 'fa-solid fa-truck fa-2x',
      count: 95.454,
      total: 90,
    },
    {
      title: 'Delivered',
      icon: 'fa-solid fa-up-right-from-square fa-2x',
      count: 95.454,
      total: 90,
    },
  ];
  slide2: ICards[] = [
    {
      title: 'Unreachable',
      icon: 'fa-solid fa-up-right-from-square fa-2x',
      count: 95.454,
      total: 90,
    },
    {
      title: 'Delayed',
      icon: 'fa-solid fa-up-right-from-square fa-2x',
      count: 95.454,
      total: 90,
    },
    {
      title: 'Delivered Partially',
      icon: 'fa-solid fa-up-right-from-square fa-2x',
      count: 95.454,
      total: 90,
    },
    {
      title: 'Client Canceled',
      icon: 'fa-solid fa-car fa-2x',
      count: 95.454,
      total: 90,
    },
  ];
  slide3: ICards[] = [
    {
      title: 'Refused & paid',
      icon: 'fa-solid fa-car fa-2x',
      count: 95.454,
      total: 90,
    },
    {
      title: 'Refused & part paid',
      icon: 'fa-solid fa-car fa-2x',
      count: 95.454,
      total: 90,
    },
    {
      title: 'Refused didnt pay',
      icon: 'fa-solid fa-x fa-2x',
      count: 95.454,
      total: 90,
    },
  ];
  constructor(private _OrdersService: OrdersService) {
    this.chartOptions = {
      series: [
        {
          name: "series1",
          data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
          name: "series2",
          data: [11, 32, 45, 32, 34, 52, 41]
        }
      ],
      chart: {
        height: 350,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z"
        ]
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };
  }
  public generateData(baseval:any, count:any, yrange:any) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

      series.push([x, y, z]);
      baseval += 86400000;
      i++;
    }
    return series;
  }

  filteredData = [...this.ordersData];
  ngOnInit(): void {
    

    this._OrdersService.getAllOrders().subscribe({
      next: (response) => {
        this.ordersData = response;
        this.filteredData = [...this.ordersData];
      },
    });
  }
  search(value: string): void {
    this.filteredData = this.ordersData.filter((item) =>
      item.clientName.toLowerCase().includes(value.toLowerCase())
    );
  }
}
