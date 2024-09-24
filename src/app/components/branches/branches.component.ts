import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../shared/services/groups.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegionService } from '../shared/services/region.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-branches',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './branches.component.html',
  styleUrl: './branches.component.css'
})
export class BranchesComponent implements OnInit {
  constructor(private _GroupsService: GroupsService, private _FormBuilder: FormBuilder, private _ToastrService: ToastrService, private _RegionService: RegionService) { }
  branches: any[] = [];
  filteredBranches: any[] = [];
  searchTerm: string = '';
  branchForm!: FormGroup;
  ngOnInit(): void {
    this._GroupsService.getBranches().subscribe({
      next: (response) => {
        this.branches = response.data
        this.filteredBranches = [...this.branches];
      },
      error: (err) => {
        console.log(err);
      }
    })

    this.branchForm = this._FormBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required]
    })
  }

  handleForm(): void {
    if (this.branchForm.valid) {
      this._RegionService.addBranch(this.branchForm.value).subscribe({
        next: (response) => {
          this._ToastrService.success(response.message, 'Shipping Company')
          this._GroupsService.getBranches().subscribe({
            next: (response) => {
              this.branches = response.data
              this.filteredBranches = [...this.branches];
            },
            error: (err) => {
              console.log(err);
            }
          })
        },
        error: (err) => {
          this._ToastrService.error(err.message, 'Shipping Company')
        }
      })
    }
  }
  filterBranch(): void {
    this.filteredBranches = this.branches.filter(governorate =>
      governorate.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  remove(id: number): void {
    this._RegionService.removeBranch(id).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message, "Shipping Company")
        this._GroupsService.getBranches().subscribe({
          next: (response) => {
            this.branches = response.data
            this.filteredBranches = [...this.branches];
          },
          error: (err) => {
            console.log(err);
          }
        })
      },
      error: (err) => {
        this._ToastrService.error(err.error.message, "Shipping Company")
      }
    })
  }

}
