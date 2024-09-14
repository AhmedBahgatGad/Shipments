import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor() { }
  governrates:string[]=['Cairo','Alex','Menofia','Tanta'];
  cities:string[]=['6-October','Shebin-Alkoum','Bagor','Marg'];
  branches:string[]=['Mansoura','Tanta','Al-Fayoum','Matrouh'];
  orders:{}[]=[{
    trackingNumber : 948461313,
    date:'30-7-2024',
    clientName:'Mohamed Hussien',
    phone:4564646511,
    governrate:'Cairo',
    city:'Salam',
    cost:9000,
    status:'On the way'
  },
  {
    trackingNumber : 464587687,
    date:'24-5-2024',
    clientName:'Ahmed Bahgat',
    phone:1011278223,
    governrate:'Menofia',
    city:'Shebin-Alkoum',
    cost:6000,
    status:'Deliverd'
  },{
    trackingNumber : 464587687,
    date:'24-5-2024',
    clientName:'Ahmed Bahgat',
    phone:1011278223,
    governrate:'Menofia',
    city:'Shebin-Alkoum',
    cost:6000,
    status:'Deliverd'
  },{
    trackingNumber : 464587687,
    date:'24-5-2024',
    clientName:'Ahmed Bahgat',
    phone:1011278223,
    governrate:'Menofia',
    city:'Shebin-Alkoum',
    cost:6000,
    status:'Deliverd'
  }]
  getGovernrates():Observable<string[]>{
    return of(this.governrates);
  }
  getCities():Observable<string[]>{
    return of(this.cities);
  }
  getBrnaches():Observable<string[]>{
    return of(this.branches);
  }
  getOrdersData():Observable<any[]>{
    return of(this.orders);
  }
}
