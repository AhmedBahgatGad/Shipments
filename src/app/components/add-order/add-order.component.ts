import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../shared/services/orders.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
  constructor(private _OrdersService: OrdersService) { }
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
  }
  orderForm: FormGroup = new FormGroup({
    orderType: new FormControl([Validators.required]),
    clientName: new FormControl('',[Validators.required]),
    phone1: new FormControl([Validators.required]),
    phone2: new FormControl([Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    governrate: new FormControl([Validators.required]),
    city: new FormControl([Validators.required]),
    village: new FormControl(''),
    toVillage: new FormControl(),
    shipingType: new FormControl([Validators.required]),
    paymentType: new FormControl([Validators.required]),
    branch: new FormControl([Validators.required]),
    merchantPhone: new FormControl([Validators.required]),
    merchantAddress: new FormControl('',[Validators.required]),
    orderCost : new FormControl([Validators.required]),
    totalWeight : new FormControl([Validators.required]),
    notes: new FormControl('')
  })
  productForm: FormGroup = new FormGroup({
    productName: new FormControl('',[Validators.required]),
    productQuantity: new FormControl(1,[Validators.required]),
    productWeight: new FormControl(1,[Validators.required])
  })
  handleForm() {
    if(this.orderForm.valid){
      console.log(this.orderForm.value);
      
    }
    else {
      this.orderForm.markAllAsTouched()
    }
    
  }
  addProduct(){
    if(this.productForm.valid){
      console.log(this.productForm.value);
      
    }
    else {
      this.productForm.markAllAsTouched()
    }
  }
}
