import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IBranches } from '../shared/Interfaces/ibranches';
import { IUser } from '../shared/Interfaces/iuser';
import { GroupsService } from '../shared/services/groups.service';
import { RegionService } from '../shared/services/region.service';
import { Router } from '@angular/router';
import { UsersService } from '../shared/services/users.service';
import { group } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addemployee',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './addemployee.component.html',
  styleUrl: './addemployee.component.css',
})
export class AddemployeeComponent implements OnInit {
  employeesForm!: FormGroup;

  branches: IBranches[] = [];
  groups: { id: string; name: string }[] = [];

  constructor(
    private _GroupsService: GroupsService,
    private _RegionService: RegionService,
    private _UsersService: UsersService,
    private _FormBuilder: FormBuilder,
    private _Router: Router,
    private _ToastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this._RegionService.getAllBranches().subscribe({
      // Complete
      next: (res) => {
        this.branches = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this._GroupsService.getGroups().subscribe({
      next: (res) => {
        this.groups = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.employeesForm = this._FormBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
      branch_id: ['', Validators.required],
      role: ['employee', Validators.required],
      company_name: ['', Validators.required],
      group_id: ['', Validators.required],
    });
  }

  handleForm() {
    if (this.employeesForm.valid) {
      this._UsersService.addEmployee(this.employeesForm.value).subscribe({
        next: (res) => {
          this._ToastrService.success(res.message, 'Shipping Company');
        },
        error: (err) => {
          this._ToastrService.error(err.error.message, 'Shipping Company');
          console.log(err);
        },
      });
    } else {
      this.employeesForm.markAllAsTouched();
    }
  }
}
