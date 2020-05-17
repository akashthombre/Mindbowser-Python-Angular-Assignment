import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  errorMsg = "";
  passwordToggle = false;
  inputType = "password";
  showMsg = false;
  btnLoading = false;
  emailFlag
  constructor(private router: Router, public fb: FormBuilder, private authService: AuthService, public toastr: ToastrManager) {
    this.signupForm = fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-z0-9.-]+[.]{1}[a-zA-Z]{2,}$')])],
      'password': [null, Validators.required],
      'username': [null, Validators.required],
      'first_name': [null, Validators.required],
      'last_name': [null, Validators.required],
      'address': [null, Validators.required],
      'company': [null, Validators.required],
    });
  }

  ngOnInit() {
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.signupForm.controls[controlName].hasError(errorName);
  }

  signUp() {
    if (this.signupForm.valid) {
      this.authService.signUp(this.signupForm.value).subscribe((res: any) => {
        console.log('signUp res',res)
        if (res.success === true) {
          this.toastr.successToastr(res.message);
          this.Cancel();
        } else {
          this.toastr.errorToastr(res.message);
        }
      }, err => {
        this.toastr.errorToastr(err.message);
      })
    } else {
      this.toastr.warningToastr('Please fill all required fields !')
    }
  }

  Cancel() {
    this.router.navigate(['/login']);
    this.signupForm.reset();
  }

  togglePassword() {
    this.passwordToggle = !this.passwordToggle;
    if (this.passwordToggle) {
      this.inputType = "text";
    } else {
      this.inputType = "password";
    }
  }

}
