import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMsg = "";
  passwordToggle = false;
  inputType = "password";
  showMsg = false;
  btnLoading = false;
  emailFlag;
  constructor(private router: Router, public fb: FormBuilder,private authService : AuthService) {
    this.loginForm = fb.group({
      'username': [null, Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-z0-9.-]+[.]{1}[a-zA-Z]{2,}$')])],
      'password': [null, Validators.required],
    });
  }

  ngOnInit() {
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  Login() {
    this.btnLoading = true;
    this.authService.login(this.loginForm.value).subscribe((res:any) => {
      console.log('login res ',res)
      if (res.token) {
        this.showMsg = false;
        this.btnLoading = false;
        localStorage.setItem('token', res.token); //token stored in localstorage
        this.router.navigate(['dashboard/home']);
      } else {
        this.showMsg = true;
        this.btnLoading = false;
        this.errorMsg = res.message
      }
    },err => {
      console.log('error printed ',err)
      this.errorMsg = err.message;
    })

  }

  togglePassword() {
    this.passwordToggle = !this.passwordToggle;
    if (this.passwordToggle) {
      this.inputType = "text";
    } else {
      this.inputType = "password";
    }
  }

  goToSignUpPage() {
    this.router.navigate(['/signup']);
  }


}
