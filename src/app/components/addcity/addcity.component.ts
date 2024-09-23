import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegionService } from '../shared/services/region.service';

@Component({
  selector: 'app-addcity',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './addcity.component.html',
  styleUrl: './addcity.component.css'
})
export class AddcityComponent implements OnInit {
  constructor(private _FormBuilder:FormBuilder, private _Router:Router, private  _RegionService:RegionService) {}
  cityForm!:FormGroup;
  governrates:{id:number,name:string}[]=[];
  ngOnInit(): void {
    this._RegionService.getAllGovernrates().subscribe({
      next:(response)=>{
        this.governrates = response.data
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
    this.cityForm = this._FormBuilder.group({
      governorate_id:['',Validators.required],
      city_name:['',Validators.required],
      original_cost:['',Validators.required],
      pickup_cost:[0]
    })
  }

  handleForm() {
    if (this.cityForm.valid) {
      console.log(this.cityForm.value);
      this._RegionService.addCity(this.cityForm.value).subscribe({
        next:(response)=>{
          console.log(response);
          
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
      /* this._Router.navigate(['/home']) */
    }
    else {
      this.cityForm.markAllAsTouched();
    }

  }
}
