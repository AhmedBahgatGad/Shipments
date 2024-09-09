import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/services/users.service';
import { IUser } from '../shared/Interfaces/iuser';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  constructor(private _UsersService:UsersService) {}
  user:IUser={
    id:0,
    name :'',
    email :'',
    password:'',
    role:''
  };
  ngOnInit(): void {
    this._UsersService.getUserData().subscribe({
      next:(respone)=>{
        this.user = respone;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
    console.log(this.user);
    
  }

}
