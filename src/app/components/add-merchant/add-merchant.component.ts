import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  isEditMode = false;
  merchantId: number | null =null;
  merchantForm!: FormGroup;
  branches: IBranches[] = [];
  governrates: string[] = [];
  cities: string[] = [];
  constructor(
    private _FormBuilder: FormBuilder,
    private _Router: Router,
    private _ToastrService: ToastrService,
    private _UsersService: UsersService,
    private _OrdersService: OrdersService,
    private _RegionService: RegionService,
    private _ActivatedRoute:ActivatedRoute
  ) {}
  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.merchantId = +id;
        this.isEditMode = true;
        this.loadMerchantData(this.merchantId);  // Load employee data for update
      }
    });

    this._RegionService.getAllBranches().subscribe({
      next: (response) => {
        this.branches = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
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
      company_name: ['', Validators.required],
    });
  }

  loadMerchantData(id: number) {
    this._UsersService.getUserById(id).subscribe(merchant => {
      this.merchantForm.patchValue(merchant); 
    });
  }

  handleForm() {
    if(this.isEditMode){
      this.updateMerchant()
    }else{
      this.addMerchant()
    }
    this._Router.navigate(['merchant'])
  }
  addMerchant():void {
    let toastr = this._ToastrService;
    if (this.merchantForm.valid) {
      this._UsersService.addMerchant(this.merchantForm.value).subscribe({
        next(response) {
          toastr.success(response.message, 'Shipping Company');
        },
        error(err) {
          console.log(err);
        },
      });
    }
  }
  updateMerchant():void{
    if (this.merchantForm.valid) {
      this._UsersService.updateEmployee(this.merchantId!,this.merchantForm.value).subscribe({
        next: (res) => {
          this._ToastrService.success(res.message, 'Shipping Company');
        },
        error: (err) => {
          this._ToastrService.error(err.error.message, 'Shipping Company');
          console.log(err);
        },
      });
    } else {
      this.merchantForm.markAllAsTouched();
    }
  }
}
