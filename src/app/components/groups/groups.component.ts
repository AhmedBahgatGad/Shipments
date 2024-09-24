import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../shared/services/groups.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.css'
})
export class GroupsComponent implements OnInit {
constructor(private _GroupsService:GroupsService, private _ToastrService:ToastrService) {}

groups:any[]=[];
filteredGroups:any[]=[];
  ngOnInit(): void {
    this._GroupsService.getGroups().subscribe({
      next:(response)=>{
        this.groups = response.data
        this.filteredGroups = [...this.groups]
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  filtergroups(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredGroups = this.groups.filter(group =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
remove(id:number):void{
  this._GroupsService.deleteGroup(id).subscribe({
    next:(response)=>{
      this._ToastrService.success(response.message,'Shipping Company')
      this._GroupsService.getGroups().subscribe({
        next:(response)=>{
          this.groups = response.data
          this.filteredGroups = [...this.groups]
        },
        error:(err)=>{
          console.log(err);
        }
      })
    },
    error:(err)=>{
      this._ToastrService.error(err.error.message,'Shipping Company')
    }
  })
}
}
