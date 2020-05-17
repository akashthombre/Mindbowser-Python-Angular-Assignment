import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  options: FormGroup;
  test: Date = new Date();
  constructor(public fb: FormBuilder, public router: Router, public authService: AuthService) {
    this.authService.checkSession()
    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0
    });
  }

  ngOnInit() {
  }

  logOut() {
    this.router.navigate(['/login']);
    localStorage.removeItem('token'); //clear token after logout
  }

}
