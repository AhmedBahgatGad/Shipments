import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {
        path: '', component: BlankLayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
        ]
    },
    {
        path: 'login', component: AuthLayoutComponent,
        children: [
            { path: 'login', component: LoginComponent, title: 'login' }
        ]
    }
];
