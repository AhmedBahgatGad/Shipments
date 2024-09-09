import { Component } from '@angular/core';
import { SidebarBlankComponent } from "../sidebar-blank/sidebar-blank.component";
import { LoginComponent } from "../login/login.component";
import { HomeComponent } from "../home/home.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [SidebarBlankComponent, LoginComponent, HomeComponent, SidebarComponent, RouterOutlet],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.css'
})
export class BlankLayoutComponent {

}
