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
  getGovernrates():Observable<string[]>{
    return of(this.governrates);
  }
  getCities():Observable<string[]>{
    return of(this.cities);
  }
  getBrnaches():Observable<string[]>{
    return of(this.branches);
  }
}
