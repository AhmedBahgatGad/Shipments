import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-blank.component.html',
  styleUrl: '../sidebar/sidebar.component.css'
})
export class SidebarBlankComponent {

}
