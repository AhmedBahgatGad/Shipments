import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  token = localStorage.getItem('token');

  myHeaders: any = new HttpHeaders({
    Authorization: `Bearer ${this.token} `,
  });
  constructor(private _HttpClient: HttpClient) {}

  getAllGovernrates(): Observable<any> {
    return this._HttpClient.get('http://127.0.0.1:8000/api/governorates', {
      headers: this.myHeaders,
    });
  }

  getAllCities(): Observable<any> {
    return this._HttpClient.get('http://127.0.0.1:8000/api/cities', {
      headers: this.myHeaders,
    });
  }

  addCity(data: any): Observable<any> {
    return this._HttpClient.post('http://127.0.0.1:8000/api/cities', data, {
      headers: this.myHeaders,
    });
  }
}
