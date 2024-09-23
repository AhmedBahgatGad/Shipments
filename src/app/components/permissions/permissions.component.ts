import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../shared/services/groups.service';

@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [],
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.css'
})
export class PermissionsComponent implements OnInit{
constructor(private _GroupsService:GroupsService) {}
  groups:{id:number,name:string}[]=[]
  ngOnInit(): void {
    this._GroupsService.getGroups().subscribe({
      next:(response)=>{
        this.groups = response.data;
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }


}
