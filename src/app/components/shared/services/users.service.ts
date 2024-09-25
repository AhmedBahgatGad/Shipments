import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUser } from '../Interfaces/iuser';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private _HttpClient: HttpClient) { }

  token = localStorage.getItem('token');

  myHeaders: any = new HttpHeaders({
    Authorization: `Bearer ${this.token} `,
  });

  users: IUser = {
    id: 1,
    name: 'admin',
    email: 'admin@gmail.com',
    password: 'A123456789',
    role: 'admin',
  };

  getUserData(): Observable<IUser> {
    if (this.users) {
      return of(this.users);
    } else {
      return of();
    }
  }
  loginUser(data: IUser) {
    if (
      data.email == this.users.email &&
      data.password == this.users.password
    ) {
      return true;
    } else {
      return false;
    }
  }

  login(data: object): Observable<any> {
    return this._HttpClient.post('http://127.0.0.1:8000/api/login', data);
  }

  getUsers(): Observable<any> {
    return this._HttpClient.get('http://127.0.0.1:8000/api/users', {
      headers: this.myHeaders,
    });
  }
  getUserById(id: number): Observable<any> {
    return this._HttpClient.get(`http://127.0.0.1:8000/api/users/${id}`, { headers: this.myHeaders })
  }
  addMerchant(data: object): Observable<any> {
    return this._HttpClient.post('http://127.0.0.1:8000/api/users', data, {
      headers: this.myHeaders,
    });
  }

  addEmployee(data: object): Observable<any> {
    return this._HttpClient.post('http://127.0.0.1:8000/api/users', data, {
      headers: this.myHeaders,
    });
  }
  updateEmployee(id:number, data: object): Observable<any> {
    return this._HttpClient.put(`http://127.0.0.1:8000/api/users/${id}`,data,{
      headers:this.myHeaders
    })
  }

  addDeliveryMan(data: object): Observable<any> {
    return this._HttpClient.post('http://127.0.0.1:8000/api/users', data, {
      headers: this.myHeaders,
    });
  }
}
