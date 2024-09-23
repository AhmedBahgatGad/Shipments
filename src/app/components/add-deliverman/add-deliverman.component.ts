import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { OrdersService } from '../shared/services/orders.service';
import { GroupsService } from '../shared/services/groups.service';
import { RegionService } from '../shared/services/region.service';

@Component({
  selector: 'app-add-deliverman',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './add-deliverman.component.html',
  styleUrl: './add-deliverman.component.css',
})
export class AddDelivermanComponent implements OnInit {
  constructor(
    private _FormBuilder: FormBuilder,
    private _Router: Router,
    private _GroupsService: GroupsService,
    private _RegionService: RegionService
  ) {}

  deliveryForm!: FormGroup;
  branches: string[] = [];
  governrates: string[] = [];

  ngOnInit(): void {
    this._GroupsService.getBranches().subscribe({
      next: (response) => {
        this.branches = response;
      },
    });
    this._RegionService.getAllGovernrates().subscribe({
      next: (response) => {
        this.governrates = response;
      },
    });
    this.deliveryForm = this._FormBuilder.group({
      deliveryName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      address: ['', Validators.required],
      branch: [this.branches[0], Validators.required],
      governrate: [this.governrates[0], Validators.required],
      companyPer: [0],
    });
  }
  handleForm() {
    if (this.deliveryForm.valid) {
      console.log(this.deliveryForm.value);
      this._Router.navigate(['/home']);
    } else {
      this.deliveryForm.markAllAsTouched();
    }
  }
}
