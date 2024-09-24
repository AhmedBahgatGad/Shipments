import { FormsModule } from '@angular/forms';
import { UsersService } from './../shared/services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-employees',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './table-employees.component.html',
  styleUrl: './table-employees.component.css',
})
export class TableEmployeesComponent implements OnInit {
<<<<<<< HEAD
  filteredData: any;
  usersData: any;
  searchTerm: string = '';
=======

  filteredData: any;
  usersData: any;
  searchTerm:string='';
>>>>>>> 11b4bfc5f2dd336a363ccbde5a495b39027b9db1
  constructor(private _UsersService: UsersService) {}

  employees: any[] = [];
  ngOnInit(): void {
    this._UsersService.getUsers().subscribe({
      next: (response) => {
        this.employees = response.data;
<<<<<<< HEAD
        this.filteredData = [...this.employees];
=======
        this.filteredData = [...this.employees]
>>>>>>> 11b4bfc5f2dd336a363ccbde5a495b39027b9db1
        // console.log(response.data);
      },
      error: (err) => {},
    });
  }
  filterEmployee(): void {
    this.filteredData = this.employees.filter((employee) =>
      employee.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
