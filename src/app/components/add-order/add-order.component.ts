import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../shared/services/orders.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { Router } from '@angular/router';
import { GroupsService } from '../shared/services/groups.service';
import { RegionService } from '../shared/services/region.service';
import { IBranches } from '../shared/Interfaces/ibranches';
import { IOrder } from '../shared/Interfaces/iorder';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-add-order',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-order.component.html',
  styleUrl: './add-order.component.css',
})
export class AddOrderComponent implements OnInit {
  governrates: { id: number; name: string }[] = [];
  cities: { id: number; city_name: string }[] = [];
  branches: IBranches[] = [];
  productsArray: {
    productName: string;
    productQuantity: number;
    productWeight: number;
  }[] = [];

  orders: IOrder[] = [];

  merchant: {}[] = [];

  orderTypeOptions = ['branch', 'company', 'specific_place'];
  shippingTypeOptions = ['regular', '24 hours', '2 weeks'];
  paymentTypeOptions = ['Visa', 'Cash'];
  constructor(
    private _GroupsService: GroupsService,
    private _RegionService: RegionService,
    private _FormBuilder: FormBuilder,
    private _Router: Router,
    private _UserService: UsersService
  ) {}
  productForm!: FormGroup;
  products!: FormArray;
  orderForm!: FormGroup;
  ngOnInit(): void {
    this._RegionService.getAllGovernrates().subscribe({
      next: (response) => {
        this.governrates = response.data;
      },
    });
    this._RegionService.getAllCities().subscribe({
      next: (response) => {
        this.cities = response.data;
      },
    });
    this._GroupsService.getBranches().subscribe({
      next: (response) => {
        this.branches = response.data;
      },
    });
    this.productForm = this._FormBuilder.group({
      productName: ['', Validators.required],
      productQuantity: [1, Validators.required],
      productWeight: [1, Validators.required],
    });
    this.products = this._FormBuilder.array([]);

    this.orderForm = this._FormBuilder.group({
      orderType: ['', Validators.required],
      clientName: ['', Validators.required],
      phone1: ['', Validators.required],
      phone2: [''],
      email: ['', [Validators.required, Validators.email]],
      governorate_id: ['', Validators.required],
      city_id: ['', Validators.required], ///////////
      village: [''],
      toVillage: [false],
      shippingType: ['', Validators.required],
      paymentType: ['', Validators.required],
      branch: ['', Validators.required],
      merchantPhone: ['', Validators.required],
      merchantAddress: ['', Validators.required],
      orderCost: [1, Validators.required],
      totalWeight: [1, Validators.required],
      notes: [''],
      products: this._FormBuilder.array([]),
    });
    this.products = this.orderForm.get('products') as FormArray;
  }

  handleForm() {
    if (this.orderForm.valid) {
      console.log(this.orderForm.value);
      this._Router.navigate(['/home']);
    } else {
      this.orderForm.markAllAsTouched();
    }
  }

  addProduct() {
    if (this.productForm.valid) {
      const productGroup = this._FormBuilder.group({
        productName: this.productForm.get('productName')?.value,
        productQuantity: this.productForm.get('productQuantity')?.value,
        productWeight: this.productForm.get('productWeight')?.value,
      });
      this.products.push(productGroup);
      console.log(this.products.value);

      this.productForm.reset({
        productQuantity: 1,
        productWeight: 1,
      });
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  removeProduct(index: number) {
    this.products.removeAt(index);
  }
}
