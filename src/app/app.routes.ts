import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TableEmployeesComponent } from './components/table-employees/table-employees.component';
import { LoginComponent } from './components/login/login.component';
import { AddemployeeComponent } from './components/addemployee/addemployee.component';
import { AddcityComponent } from './components/addcity/addcity.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'employees', component: TableEmployeesComponent },
  { path: 'addemployee', component: AddemployeeComponent },
  { path: 'addcity', component: AddcityComponent },
];
