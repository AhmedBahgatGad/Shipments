import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TableEmployeesComponent } from './components/table-employees/table-employees.component';
import { AddemployeeComponent } from './components/addemployee/addemployee.component';
import { AddcityComponent } from './components/addcity/addcity.component';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {
        path: '', component: BlankLayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'employees', component: TableEmployeesComponent, title:'Employees' },
            { path: 'addemployee', component: AddemployeeComponent, title:'Add Employees' },
            { path: 'addcity', component: AddcityComponent, title:'Add City' },
        ]
    },
    {
        path: 'login', component: AuthLayoutComponent,
        children: [
            { path: 'login', component: LoginComponent, title: 'login' }
        ]
    }]
