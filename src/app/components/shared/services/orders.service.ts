import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  token = localStorage.getItem('token');

  myHeaders: any = new HttpHeaders({
    Authorization: `Bearer ${this.token} `,
  });
  constructor(private _HttpClient: HttpClient) {}

  getAllOrders(): Observable<any> {
    return this._HttpClient.get('http://127.0.0.1:8000/api/orders', {
      headers: this.myHeaders,
    });
  }
}
