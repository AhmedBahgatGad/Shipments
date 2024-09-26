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
  groups: { id: number; name: string }[] = [];

  ngOnInit(): void {
    this._GroupsService.getBranches().subscribe({
      next: (response) => {
        this.branches = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this._GroupsService.getGroups().subscribe({
      next: (response) => {
        this.groups = response.data;
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
      username: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      address: ['', Validators.required],
      // role: ['delivery_man', Validators.required],
      branch_id: ['', Validators.required],
      governorate_id: ['', Validators.required],
      discount_type: ['5%', Validators.required],
      company_per: ['3', Validators.required],
      role: ['delivery_man'],
      group_id: ['', Validators.required],
    });
  }
  handleForm() {
    let toastr = this._ToastrService;
    if (this.deliveryForm.valid) {
      this._UsersService.addMerchant(this.deliveryForm.value).subscribe({
        next(response) {
          toastr.success(response.message, 'Shipping Company');
        },
        error(err) {
          console.log(err);
        },
      });
    }
  }
}
