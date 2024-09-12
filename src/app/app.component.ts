import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { LoginComponent } from "./components/login/login.component";
import { GovernmentsViewComponent } from "./components/Governments/governments-view/governments-view.component";
import { OrdersViewComponent } from "./components/orders/orders-view/orders-view.component";
import { GroupsViewComponent } from "./components/groups/groups-view/groups-view.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, LoginComponent, GovernmentsViewComponent, OrdersViewComponent, GroupsViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Shipments';
}
