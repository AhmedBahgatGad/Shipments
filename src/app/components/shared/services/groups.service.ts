import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private _HttpClient:HttpClient) { }

  token = localStorage.getItem('token');


  myHeaders:any = new HttpHeaders({
    'Authorization': `Bearer ${this.token} `
  });

  getGroups():Observable<any>{
    return this._HttpClient.get('http://127.0.0.1:8000/api/groups',{
      headers:this.myHeaders
    })
  }

  getBranches():Observable<any>{
    return this._HttpClient.get('http://127.0.0.1:8000/api/branches',{
      headers:this.myHeaders
    })
  }
  deleteGroup(id:number):Observable<any>{
    return this._HttpClient.delete(`http://127.0.0.1:8000/api/groups/${id}`,{
      headers:this.myHeaders
    })
  }
}
