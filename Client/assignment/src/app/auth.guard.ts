import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    public isLoggedin: any
    constructor(private router: Router, public authService: AuthService) {
        this.authService.checkSession();
    };
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let user = localStorage.getItem('token')
        if (user){
            return true;
        }
        else {
            this.router.navigate(['/login']);
        }
    }
}
