// import { jwtDecode } from 'jwt-decode';
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
import { ActivatedRoute, Router } from '@angular/router';
import { GroupsService } from '../shared/services/groups.service';
import { RegionService } from '../shared/services/region.service';
import { IBranches } from '../shared/Interfaces/ibranches';
import { IOrder } from '../shared/Interfaces/iorder';
import { UsersService } from '../shared/services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-order',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-order.component.html',
  styleUrl: './add-order.component.css',
})
export class AddOrderComponent implements OnInit {
  isEditMode = false;
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
  orderId: number | null = null;
  orderTypeOptions = ['branch', 'company', 'specific_place'];
  shippingTypeOptions = ['regular', '24 hours', '2 weeks'];
  paymentTypeOptions = ['visa', 'cash'];
  constructor(
    private _GroupsService: GroupsService,
    private _RegionService: RegionService,
    private _FormBuilder: FormBuilder,
    private _Router: Router,
    private _UserService: UsersService,
    private _OrdersService: OrdersService,
    private _ToastrService: ToastrService,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  productForm!: FormGroup;
  products!: FormArray;
  orderForm!: FormGroup;
  userId: number = 1;
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.orderId = +id;
        this.isEditMode = true;
        this.loadOrderData(this.orderId); // Load employee data for update
      }
    });
    this._UserService.getUser().subscribe({
      next: (response) => {
        response.id = this.userId;
      },
    });
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
      email: ['', [Validators.required, Validators.email]],
      governorate_id: ['', Validators.required],
      city_id: ['', Validators.required],
      village: [''],
      user_id: [this.userId],

      created_date: ['2024-09-25'],
      toVillage: [false],
      status: ['pending'],
      shippingType: ['', Validators.required],
      paymentType: ['', Validators.required],
      branch_id: ['', Validators.required],
      trader_phone: ['', Validators.required],
      trader_address: ['', Validators.required],
      cost: [1, Validators.required],
      weight: [1, Validators.required],
      notes: [''],
      products: this._FormBuilder.array([]),
    });
    this.products = this.orderForm.get('products') as FormArray;
  }
  loadOrderData(id: number) {
    this._OrdersService.getOrderByIt(id).subscribe((order) => {
      this.orderForm.patchValue(order);
    });
  }

  addOrder(): void {
    if (this.orderForm.valid) {
      this._OrdersService.addOrder(this.orderForm.value).subscribe({
        next: (response) => {
          this._ToastrService.success(response.message, 'Shipping Company');
        },
      });
    } else {
      this.orderForm.markAllAsTouched();
    }
  }
  updateOrder(): void {
    if (this.orderForm.valid) {
      this._OrdersService
        .updateOrder(this.orderId!, this.orderForm.value)
        .subscribe({
          next: (res) => {
            this._ToastrService.success(res.message, 'Shipping Company');
          },
          error: (err) => {
            this._ToastrService.error(err.error.message, 'Shipping Company');
            console.log(err);
          },
        });
    } else {
      this.orderForm.markAllAsTouched();
    }
  }
  handleForm() {
    if (this.isEditMode) {
      this.updateOrder();
    } else {
      this.addOrder();
    }
    this._Router.navigate(['orders']);
  }
  addProduct() {
    if (this.productForm.valid) {
      // Create a new FormGroup for the product
      const productGroup = this._FormBuilder.group({
        productName: [this.productForm.get('productName')?.value],
        productQuantity: [this.productForm.get('productQuantity')?.value],
        productWeight: [this.productForm.get('productWeight')?.value],
      });

      // Push the new FormGroup to the FormArray
      (this.products as FormArray).push(productGroup);

      // Store the updated products array in session storage
      sessionStorage.setItem('products', JSON.stringify(this.products.value));

      // Reset the form
      this.productForm.reset({
        productQuantity: 1,
        productWeight: 1,
      });
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  // addProduct() {
  //   if (this.productForm.valid) {
  //     const productGroup = this._FormBuilder.group({
  //       productName: this.productForm.get('productName')?.value,
  //       productQuantity: this.productForm.get('productQuantity')?.value,
  //       productWeight: this.productForm.get('productWeight')?.value,
  //     });
  //     console.log(productGroup.controls.productName.value);

  //     this.products.push({
  //       productName: productGroup.controls.productName.value,
  //       productQuantity: productGroup.controls.productQuantity.value,
  //       productWeight: productGroup.controls.productWeight.value,
  //     });
  //     console.log(this.products);

  //     sessionStorage.setItem('products', JSON.stringify(productGroup));
  //     // this._OrdersService.addproduct(this.products).subscribe({
  //     //   next: (response) => {
  //     //     console.log(response);
  //     //   },
  //     //   error: (err) => {
  //     //     console.log(err);
  //     //   },
  //     // });
  //     console.log(this.products.value);

  //     this.productForm.reset({
  //       productQuantity: 1,
  //       productWeight: 1,
  //     });
  //   } else {
  //     this.productForm.markAllAsTouched();
  //   }
  // }

  removeProduct(index: number) {
    this.products.removeAt(index);
  }
}
