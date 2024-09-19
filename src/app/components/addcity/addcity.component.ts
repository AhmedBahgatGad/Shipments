import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addcity',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './addcity.component.html',
  styleUrl: './addcity.component.css'
})
export class AddcityComponent implements OnInit {
  constructor(private _FormBuilder:FormBuilder, private _Router:Router) {}
  cityForm!:FormGroup;
  ngOnInit(): void {
    this.cityForm = this._FormBuilder.group({
      governrate:['',Validators.required],
      city:['',Validators.required],
      cost:['',Validators.required],
      pickupCost:[0]
    })
  }

  handleForm() {
    if (this.cityForm.valid) {
      console.log(this.cityForm.value);
      this._Router.navigate(['/home'])
    }
    else {
      this.cityForm.markAllAsTouched()
    }

  }
}
