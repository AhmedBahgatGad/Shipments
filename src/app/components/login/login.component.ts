import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { UsersService } from '../shared/services/users.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  constructor(private _Router: Router,private _UsersService:UsersService) { }
  

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
  })

  msgError: string = '';
  isLoading: boolean = false;
  handleForm(): void {
    
    /* if (this.loginForm.valid) {
      this.isLoading = true;
      if(this._UsersService.loginUser(this.loginForm.value)){
        localStorage.setItem('token','asdasdasd');
        this._Router.navigate(['/home'])
        this.isLoading = false;
      }
    }
    else {
      this.loginForm.markAllAsTouched()
    } */

      if(this.loginForm.valid){
        this._UsersService.login(this.loginForm.value).subscribe({
          next:(response)=>{
            localStorage.setItem('token',response.access_token.split('|')[1]);
            this._Router.navigate(['/home'])
          }
        })
      }
      else {
        this.loginForm.markAllAsTouched()
      }
  }

  
}
