import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../shared/services/orders.service';

@Component({
  selector: 'app-governrates',
  standalone: true,
  imports: [],
  templateUrl: './governrates.component.html',
  styleUrl: './governrates.component.css'
})
export class GovernratesComponent implements OnInit {
constructor(private _OrdersService:OrdersService) {}
  
governrates:{}[]=[];
ngOnInit(): void {
  this._OrdersService.getGovernrates().subscribe({
    next:(response)=>{
      this.governrates = response;
      console.log(this.governrates);
      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}

}
