import { UsersService } from './../shared/services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-employees',
  standalone: true,
  imports: [],
  templateUrl: './table-employees.component.html',
  styleUrl: './table-employees.component.css',
})
export class TableEmployeesComponent implements OnInit {
  // filteredData: any;
  // usersData: any;
  constructor(private _UsersService: UsersService) {}

  employees: any[] = [];
  ngOnInit(): void {
    this._UsersService.getUsers().subscribe({
      next: (response) => {
        this.employees = response.data;
        // console.log(response.data);
      },
      error: (err) => {},
    });
  }
  // search(value: string): void {
  //   this.filteredData = this.usersData.filter((item: { employees: string }) =>
  //     item.employees.toLowerCase().includes(value.toLowerCase())
  //   );
  // }
}
