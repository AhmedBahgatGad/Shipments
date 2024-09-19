import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-merchants',
  standalone: true,
  imports: [],
  templateUrl: './merchants.component.html',
  styleUrl: './merchants.component.css'
})
export class MerchantsComponent implements OnInit {
  constructor(private _UsersService:UsersService) {}

  merchants:any[] =[];
    ngOnInit(): void {
      this._UsersService.getUsers().subscribe({
        next:(response)=>{
          this.merchants = response.data;
        },
        error:(err)=>{
        }
      })
    }
}
