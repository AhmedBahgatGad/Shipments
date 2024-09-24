import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../shared/services/orders.service';
import { RegionService } from '../shared/services/region.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-governrates',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './governrates.component.html',
  styleUrl: './governrates.component.css'
})
export class GovernratesComponent implements OnInit {
  constructor(private _RegionService: RegionService, private _FormBuilder: FormBuilder, private _ToastrService: ToastrService) { }
  governForm!: FormGroup;
  governrates: { id: number, name: string }[] = [];
  filteredGoverns: { id: number, name: string }[] = [];
  searchTerm: string = '';

  ngOnInit(): void {
    this._RegionService.getAllGovernrates().subscribe({
      next: (response) => {
        this.governrates = response.data;
        this.filteredGoverns = [...this.governrates]
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.governForm = this._FormBuilder.group({
      name: ['', Validators.required],
      status: ['', Validators.required]
    })

  }
  handleForm(): void {
    if (this.governForm.valid) {
      this._RegionService.addGovernorate(this.governForm.value).subscribe({
        next: (response) => {
          this._ToastrService.success(response.message, 'Shipping Company')
          this._RegionService.getAllGovernrates().subscribe({
            next: (response) => {
              this.governrates = response.data;
              this.filteredGoverns = [...this.governrates]
            },
            error: (err) => {
              console.log(err);
            }
          });
        },
        error: (err) => {
          this._ToastrService.error(err.message, 'Shipping Company')
        }
      })
    }

  }

  filterGovernorates(): void {
    this.filteredGoverns = this.governrates.filter(governorate =>
      governorate.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  remove(id: number): void {
    this._RegionService.removeGovernorate(id).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message,"Shipping Company")
        this._RegionService.getAllGovernrates().subscribe({
          next: (response) => {
            this.governrates = response.data;
            this.filteredGoverns = [...this.governrates]
          },
          error: (err) => {
            console.log(err);
          }
        });
      },
      error:(err)=>{
        this._ToastrService.error(err.error.message,"Shipping Company")
      }
    })
  }
}