import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-delivery-man',
  standalone: true,
  imports: [],
  templateUrl: './add-delivery-man.component.html',
  styleUrl: './add-delivery-man.component.css'
})
export class AddDeliveryManComponent {
  deliveryManForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.deliveryManForm = this.fb.group({
      fullName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      address: ['', Validators.required],
      branch: ['', Validators.required],
      government: ['', Validators.required],
      discountType: ['', Validators.required],
      companyPercentage: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.deliveryManForm.valid) {
      console.log(this.deliveryManForm.value);
      // Add your form submission logic here
    }
  }

  onBack(): void {
    // Logic to navigate back or perform another action
  }

}
