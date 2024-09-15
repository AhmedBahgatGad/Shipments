import { UsersService } from './../shared/services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-employees',
  standalone: true,
  imports: [],
  templateUrl: './table-employees.component.html',
  styleUrl: './table-employees.component.css'
})
export class TableEmployeesComponent implements OnInit {
constructor(private _UsersService:UsersService) {}

employees:any[] =[];
  ngOnInit(): void {
    this._UsersService.getUsers().subscribe({
      next:(response)=>{
        this.employees = response.data;
      },
      error:(err)=>{
      }
    })
  }


}
