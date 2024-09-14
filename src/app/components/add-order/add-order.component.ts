import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../shared/services/orders.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder, FormArray } from '@angular/forms';

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
  constructor(private _OrdersService: OrdersService, private _FormBuilder: FormBuilder) { }
  productForm!: FormGroup;
  products!: FormArray;
  orderForm!:FormGroup;
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
      orderType: ['', Validators.required],
      clientName: ['', Validators.required],
      phone1: ['', Validators.required],
      phone2: [''],
      email: ['', [Validators.required, Validators.email]],
      governrate: ['', Validators.required],
      city: ['', Validators.required],
      village: [''],
      toVillage: [false],
      shipingType: ['', Validators.required],
      paymentType: ['', Validators.required],
      branch: ['', Validators.required],
      merchantPhone: [''],
      merchantAddress: [''],
      orderCost: [0, Validators.required],
      totalWeight: [0, Validators.required],
      notes: [''],
      products: this._FormBuilder.array([])
    });
    this.products = this.orderForm.get('products') as FormArray;
  }
  
  handleForm() {
    if (this.orderForm.valid) {
      console.log(this.orderForm.value);

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
