import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { LoginComponent } from "../login/login.component";
import { HomeComponent } from "../home/home.component";
import { SidebarBlankComponent } from "../sidebar-blank/sidebar-blank.component";

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [SidebarComponent, LoginComponent, HomeComponent, SidebarBlankComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {

}
