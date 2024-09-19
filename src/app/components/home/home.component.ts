import { Component, OnInit } from '@angular/core';
import { BlankLayoutComponent } from "../blank-layout/blank-layout.component";
import { AuthLayoutComponent } from "../auth-layout/auth-layout.component";
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { OrdersService } from '../shared/services/orders.service';
import { ICards } from '../shared/Interfaces/icards';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BlankLayoutComponent, AuthLayoutComponent, CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoWidth:true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }
  ordersData: {
    trackingNumber: number,
    date: string,
    clientName: string,
    governrate: string,
    city: string,
    cost: number,
    status:string,
    phone:number
  }[] = [];
  slide1:ICards[]=[{
    title:'new',
    icon:'fa-solid fa-car fa-2x',
    count:95.454,
    total:90
  },
  {
    title:'Pending',
    icon:'fa-regular fa-clock fa-2x',
    count:95454,
    total:90
  },{
    title:'On the way',
    icon:'fa-solid fa-truck fa-2x',
    count:95.454,
    total:90
  },{
    title:'Delivered',
    icon:'fa-solid fa-up-right-from-square fa-2x',
    count:95.454,
    total:90
  }]
  slide2:ICards[]=[{
    title:'Unreachable',
    icon:'fa-solid fa-up-right-from-square fa-2x',
    count:95.454,
    total:90
  },{
    title:'Delayed',
    icon:'fa-solid fa-up-right-from-square fa-2x',
    count:95.454,
    total:90
  },{
    title:'Delivered Partially',
    icon:'fa-solid fa-up-right-from-square fa-2x',
    count:95.454,
    total:90
  },{
    title:'Client Canceled',
    icon:'fa-solid fa-car fa-2x',
    count:95.454,
    total:90
  }]
  slide3:ICards[] = [{
    title:'Refused & paid',
    icon:'fa-solid fa-car fa-2x',
    count:95.454,
    total:90
  },{
    title:'Refused & part paid',
    icon:'fa-solid fa-car fa-2x',
    count:95.454,
    total:90
  },{
    title:'Refused didnt pay',
    icon:'fa-solid fa-x fa-2x',
    count:95.454,
    total:90
  }];
  constructor(private _OrdersService: OrdersService) { }
  filteredData = [...this.ordersData];
  ngOnInit(): void {
    this._OrdersService.getOrdersData().subscribe({
      next: (response) => {
        this.ordersData = response;
        this.filteredData = [...this.ordersData];
      }
    })
  }
  search(value:string):void{
      this.filteredData = this.ordersData.filter(item =>
        item.clientName.toLowerCase().includes(value.toLowerCase()));
  }
}
