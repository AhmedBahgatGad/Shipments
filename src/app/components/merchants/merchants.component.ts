import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/services/users.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-merchants',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './merchants.component.html',
  styleUrl: './merchants.component.css'
})
export class MerchantsComponent implements OnInit {
  constructor(private _UsersService:UsersService) {}

  merchants:any[] =[];
  filteredMerchants:any[]=[];
  searchTerm:string='';
    ngOnInit(): void {
      this._UsersService.getUsers().subscribe({
        next:(response)=>{
          this.merchants = response.data;
          this.filteredMerchants = [...this.merchants];
        },
        error:(err)=>{
        }
      })
    }
    filterMerchants(): void {
      this.filteredMerchants = this.merchants.filter(merchant =>
        merchant.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

}
