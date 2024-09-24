import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { OrdersService } from '../shared/services/orders.service';
import { GroupsService } from '../shared/services/groups.service';
import { RegionService } from '../shared/services/region.service';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../shared/services/users.service';
import { IBranches } from '../shared/Interfaces/ibranches';

@Component({
  selector: 'app-add-deliverman',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './add-deliverman.component.html',
  styleUrl: './add-deliverman.component.css',
})
export class AddDelivermanComponent implements OnInit {
  constructor(
    private _FormBuilder: FormBuilder,
    private _Router: Router,
    private _GroupsService: GroupsService,
    private _RegionService: RegionService,
    private _ToastrService: ToastrService,
    private _UsersService: UsersService
  ) {}

  deliveryForm!: FormGroup;
  branches: IBranches[] = [];
  governrates: { id: number; name: string }[] = [];

  ngOnInit(): void {
    this._GroupsService.getBranches().subscribe({
      next: (response) => {
        this.branches = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this._RegionService.getAllGovernrates().subscribe({
      next: (response) => {
        this.governrates = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.deliveryForm = this._FormBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      address: ['', Validators.required],
      role: ['delivery_man', Validators.required],
      branch_id: ['', Validators.required],
      governorate_id: ['', Validators.required],
      discount_type: ['Percentage', Validators.required],
      company_per: ['3%', Validators.required],
    });
  }
  handleForm() {
    if (this.deliveryForm.valid) {
      this._UsersService.addEmployee(this.deliveryForm.value).subscribe({
        next: (res) => {
          console.log(res);

          this._ToastrService.success(res.message, 'Shipping Company');
        },
        error: (err) => {
          this._ToastrService.error(err.error.message, 'Shipping Company');
          console.log(err);
        },
      });
    } else {
      this.deliveryForm.markAllAsTouched();
    }
  }
}
