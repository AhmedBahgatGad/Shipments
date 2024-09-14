import { Component } from '@angular/core';
import { BlankLayoutComponent } from "../blank-layout/blank-layout.component";
import { AuthLayoutComponent } from "../auth-layout/auth-layout.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BlankLayoutComponent, AuthLayoutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
