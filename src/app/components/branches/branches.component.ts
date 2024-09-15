import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../shared/services/groups.service';

@Component({
  selector: 'app-branches',
  standalone: true,
  imports: [],
  templateUrl: './branches.component.html',
  styleUrl: './branches.component.css'
})
export class BranchesComponent implements OnInit {
constructor(private _GroupsService:GroupsService) {}
branches:any[]=[];
  ngOnInit(): void {
    this._GroupsService.getBranches().subscribe({
      next:(response)=>{
        this.branches = response.data
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }


}
