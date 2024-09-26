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
  addOrder(data: any): Observable<any> {
    return this._HttpClient.post('http://127.0.0.1:8000/api/orders', data, {
      headers: this.myHeaders,
    });
  }

  deleteOrder(id: number): Observable<any> {
    return this._HttpClient.delete(`http://127.0.0.1:8000/api/orders/${id}`, {
      headers: this.myHeaders,
    });
  }
  getOrderByIt(id: number): Observable<any> {
    return this._HttpClient.get(`http://127.0.0.1:8000/api/orders/${id}`, {
      headers: this.myHeaders,
    });
  }
  updateOrder(id: number, data: any): Observable<any> {
    return this._HttpClient.post(
      `http://127.0.0.1:8000/api/orders/${id}`,
      data,
      {
        headers: this.myHeaders,
      }
    );
  }
  addproduct(data: any): Observable<any> {
    return this._HttpClient.post(
      'http://127.0.0.1:8000/api/products/temporary',
      data,
      { headers: this.myHeaders }
    );
  }
}
