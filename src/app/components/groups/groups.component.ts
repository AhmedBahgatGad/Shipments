import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../shared/services/groups.service';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.css'
})
export class GroupsComponent implements OnInit {
constructor(private _GroupsService:GroupsService) {}

groups:any[]=[];
  ngOnInit(): void {
    this._GroupsService.getGroups().subscribe({
      next:(response)=>{
        this.groups = response.data
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }


}
