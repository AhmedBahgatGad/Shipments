import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUser } from '../Interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  constructor() { }
  users:IUser={
    id:1,
    name:'admin',
    email:'admin@gmail.com',
    password:'A123456789',
    role:'admin'
  };

  getUserData():Observable<IUser>{
    if(this.users){
      return of(this.users);
    }
    else{
      return of();
    }
  }
}
