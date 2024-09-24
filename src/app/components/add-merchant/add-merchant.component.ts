import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { OrdersService } from '../shared/services/orders.service';
import { RegionService } from '../shared/services/region.service';
import { IBranches } from '../shared/Interfaces/ibranches';
import { GroupsService } from '../shared/services/groups.service';
import { UsersService } from '../shared/services/users.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-merchant',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-merchant.component.html',
  styleUrl: './add-merchant.component.css',
})
export class AddMerchantComponent implements OnInit {
  merchantForm!: FormGroup;
  branches: IBranches[] = [];
  governrates: string[] = [];
  cities: string[] = [];
  constructor(private _FormBuilder: FormBuilder, private _Router: Router, private _ToastrService: ToastrService, private _UsersService: UsersService, private _OrdersService: OrdersService, private _RegionService: RegionService) { }
  ngOnInit(): void {
    this._RegionService.getAllBranches().subscribe({
      next: (response) => {
        this.branches = response.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
    this._RegionService.getAllGovernrates().subscribe({
      next: (response) => {
        this.governrates = response;
      },
    });
    this._RegionService.getAllCities().subscribe({
      next: (response) => {
        this.cities = response;
      },
    });
    this.merchantForm = this._FormBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      role: ['trader'],
      password: ['', Validators.required],
      address: ['', Validators.required],
      branch_id: [this.branches[0], Validators.required],
      group_id: [2],
      company_name: ['', Validators.required]
    })
  }
  handleForm() {
    let toastr = this._ToastrService;
    if (this.merchantForm.valid) {
      this._UsersService.addMerchant(this.merchantForm.value).subscribe({
        next(response) {
          toastr.success(response.message, 'Shipping Company')
          
        },
        error(err) {
          console.log(err);

        }
      })
    }
  }
}
