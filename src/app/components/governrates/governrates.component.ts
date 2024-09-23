import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../shared/services/orders.service';
import { RegionService } from '../shared/services/region.service';

@Component({
  selector: 'app-governrates',
  standalone: true,
  imports: [],
  templateUrl: './governrates.component.html',
  styleUrl: './governrates.component.css'
})
export class GovernratesComponent implements OnInit {
constructor(private _RegionService:RegionService) {}
  
governrates:{id:number,name:string}[]=[];
ngOnInit(): void {
  this._RegionService.getAllGovernrates().subscribe({
    next:(response)=>{
      this.governrates = response.data;
      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}

}
