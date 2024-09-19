import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../shared/services/orders.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-order',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-order.component.html',
  styleUrl: './add-order.component.css'
})
export class AddOrderComponent implements OnInit {


  governrates: string[] = [];
  cities: string[] = [];
  branches: string[] = [];
  productsArray: { productName: string, productQuantity: number, productWeight: number }[] = [];

  orderTypeOptions = ['branch', 'company', 'specific_place'];
  shipingTypeOptions = ['regular', 'in24h', 'in15d'];
  paymentTypeOptions = ['Visa', 'Cash', 'Package for Package'];
  constructor(private _OrdersService: OrdersService, private _FormBuilder: FormBuilder, private _Router:Router) { }
  productForm!: FormGroup;
  products!: FormArray;
  orderForm!: FormGroup;
  ngOnInit(): void {
    this._OrdersService.getGovernrates().subscribe({
      next: (response) => {
        this.governrates = response;
      }
    })
    this._OrdersService.getCities().subscribe({
      next: (response) => {
        this.cities = response;
      }
    })
    this._OrdersService.getBrnaches().subscribe({
      next: (response) => {
        this.branches = response;
      }
    })
    this.productForm = this._FormBuilder.group({
      productName: ['', Validators.required],
      productQuantity: [1, Validators.required],
      productWeight: [1, Validators.required],
    });
    this.products = this._FormBuilder.array([]);

    this.orderForm = this._FormBuilder.group({
      orderType: [this.orderTypeOptions[0], Validators.required],
      clientName: ['', Validators.required],
      phone1: ['', Validators.required],
      phone2: [''],
      email: ['', [Validators.required, Validators.email]],
      governrate: [this.governrates[0], Validators.required],
      city: [this.cities[0], Validators.required],
      village: [''],
      toVillage: [false],
      shipingType: [this.shipingTypeOptions[0], Validators.required],
      paymentType: [this.paymentTypeOptions[0], Validators.required],
      branch: [this.branches[0], Validators.required],
      merchantPhone: ['', Validators.required],
      merchantAddress: ['', Validators.required],
      orderCost: [1, Validators.required],
      totalWeight: [1, Validators.required],
      notes: [''],
      products: this._FormBuilder.array([])
    });
    this.products = this.orderForm.get('products') as FormArray;
  }

  handleForm() {
    if (this.orderForm.valid) {
      console.log(this.orderForm.value);
      this._Router.navigate(['/home'])
    }
    else {
      this.orderForm.markAllAsTouched()
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
        productWeight: 1
      });
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  removeProduct(index: number) {
    this.products.removeAt(index);
  }
}
