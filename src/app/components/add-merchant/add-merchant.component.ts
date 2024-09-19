import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrdersService } from '../shared/services/orders.service';

@Component({
  selector: 'app-add-merchant',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-merchant.component.html',
  styleUrl: './add-merchant.component.css'
})
export class AddMerchantComponent implements OnInit {
  merchantForm!: FormGroup;
  branches: string[] = [];
  governrates: string[] = [];
  cities: string[] = [];
  constructor(private _FormBuilder: FormBuilder, private _Router: Router, private _OrdersService: OrdersService) { }
  ngOnInit(): void {
    this._OrdersService.getBrnaches().subscribe({
      next: (response) => {
        this.branches = response;
      }
    });
    this._OrdersService.getGovernrates().subscribe({
      next: (response) => {
        this.governrates = response;
      }
    });
    this._OrdersService.getCities().subscribe({
      next: (response) => {
        this.cities = response;
      }
    });
    this.merchantForm = this._FormBuilder.group({
      merchantName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      address: ['', Validators.required],
      branch: [this.branches[0], Validators.required],
      governrate: [this.governrates[0], Validators.required],
      city: [this.cities[0], Validators.required],
      shopName:['',Validators.required]
    })
  }
  handleForm() {
    if (this.merchantForm.valid) {
      console.log(this.merchantForm.value);
      this._Router.navigate(['/home'])
    }
    else {
      this.merchantForm.markAllAsTouched()
    }

  }
}
