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
  filteredData: any;
  usersData: any;
  searchTerm: string = '';
  constructor(private _UsersService: UsersService) {}

  employees: any[] = [];
  ngOnInit(): void {
    this._UsersService.getUsers().subscribe({
      next: (response) => {
        this.employees = response.data;
        this.filteredData = [...this.employees];
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
