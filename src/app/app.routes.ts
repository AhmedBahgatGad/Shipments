import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TableEmployeesComponent } from './components/table-employees/table-employees.component';
import { AddemployeeComponent } from './components/addemployee/addemployee.component';
import { AddcityComponent } from './components/addcity/addcity.component';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './components/shared/guards/auth.guard';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { GovernratesComponent } from './components/governrates/governrates.component';
import { GroupsComponent } from './components/groups/groups.component';
import { BranchesComponent } from './components/branches/branches.component';
import { OrdersComponent } from './components/orders/orders.component';
import { PermissionsComponent } from './components/permissions/permissions.component';
import { AddDelivermanComponent } from './components/add-deliverman/add-deliverman.component';
import { ReportsComponent } from './components/reports/reports.component';
import { AddMerchantComponent } from './components/add-merchant/add-merchant.component';
import { MerchantsComponent } from './components/merchants/merchants.component';
import { employeeGuard } from './components/shared/guards/employee.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: BlankLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      {
        path: 'employees',
        component: TableEmployeesComponent,
        title: 'Employees',
      },
      {
        path: 'addemployee',
        component: AddemployeeComponent,
        title: 'Add Employees',
      },
      { path: 'addcity', component: AddcityComponent, title: 'Add City' },
      { path: 'addorder', component: AddOrderComponent, title: 'Add Order' },
      {
        path: 'governrates',
        component: GovernratesComponent,
        title: 'Governrates',
      },
      { path: 'groups', component: GroupsComponent, title: 'Groups' },
      { path: 'branches', component: BranchesComponent, title: 'Branches' },
      { path: 'orders', component: OrdersComponent, title: 'Orders' },
      {
        path: 'permissions',
        component: PermissionsComponent,
        title: 'Permissions',
      },
      {
        path: 'addDeliveryMan',
        component: AddDelivermanComponent,
        title: 'Add DeliveryMan',
      },
      { path: 'reports', component: ReportsComponent, title: 'Reports' },
      {
        path: 'addMerchant',
        component: AddMerchantComponent,
        title: 'Add Merchant',
      },
      { path: 'merchant', component: MerchantsComponent, title: 'merchants' },
      {
        path: 'editemployee/:id',
        component: AddemployeeComponent,
        title: 'Edit Employee',
      },
      {
        path: 'editMerchant/:id',
        component: AddMerchantComponent,
        title: 'Edit Merchant',
      },
      {
        path: 'editorder/:id',
        component: AddOrderComponent,
        title: 'Edit Order',
      },
    ],
  },
  // {
  //   path: '',
  //   canActivate: [employeeGuard],
  //   component: BlankLayoutComponent,
  //   children: [
  //     { path: '', redirectTo: 'home', pathMatch: 'full' },
  //     { path: 'home', component: HomeComponent },
  //     {
  //       path: 'employees',
  //       component: TableEmployeesComponent,
  //       title: 'Employees',
  //     },
  //     { path: 'addcity', component: AddcityComponent, title: 'Add City' },
  //     {
  //       path: 'governrates',
  //       component: GovernratesComponent,
  //       title: 'Governrates',
  //     },
  //     { path: 'groups', component: GroupsComponent, title: 'Groups' },
  //     { path: 'branches', component: BranchesComponent, title: 'Branches' },
  //     { path: 'orders', component: OrdersComponent, title: 'Orders' },
  //     {
  //       path: 'permissions',
  //       component: PermissionsComponent,
  //       title: 'Permissions',
  //     },
  //     {
  //       path: 'addDeliveryMan',
  //       component: AddDelivermanComponent,
  //       title: 'Add DeliveryMan',
  //     },
  //     { path: 'reports', component: ReportsComponent, title: 'Reports' },
  //     {
  //       path: 'addMerchant',
  //       component: AddMerchantComponent,
  //       title: 'Add Merchant',
  //     },
  //     { path: 'merchant', component: MerchantsComponent, title: 'merchants' },
  //     {
  //       path: 'editemployee/:id',
  //       component: AddemployeeComponent,
  //       title: 'Edit Employee',
  //     },
  //     {
  //       path: 'editMerchant/:id',
  //       component: AddMerchantComponent,
  //       title: 'Edit Merchant',
  //     },
  //   ],
  // },
  {
    path: 'login',
    component: AuthLayoutComponent,
    children: [{ path: 'login', component: LoginComponent, title: 'login' }],
  },
];
