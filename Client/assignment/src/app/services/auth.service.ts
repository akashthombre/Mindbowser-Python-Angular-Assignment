import { HttpClient, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLoggedIn = false;
  constructor(private http: HttpClient, private _router: Router) { }
  
  // My MEAN (Node-Angular) Stack Setup
  // checkSession() { //check user session, 
  //   return this.http.get(environment.validate_user + '/' + localStorage.getItem("token")).subscribe((res: any) => {
  //     if (res.sessionEnd) {
  //       localStorage.clear()
  //       this._router.navigate(['/login'])
  //     }
  //   });
  // }
  checkSession() {  
    localStorage.getItem("token")
  }

  // ----------------------- Authenticated all api  methods -----------------------------

  genericGET(url: string) {
    console.log('genericGET called url : ', url)
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('authorization', 'Token ' + localStorage.getItem('token'));
    return this.http.get(url, { headers: headers })
  }
  genericPOST(url: string, data): Observable<any> {
    console.log('genericPOST called url : ', url)
    console.log('genergenericPOSTicGET called data : ', data)

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('authorization', 'Token ' + localStorage.getItem('token'));
    return this.http.post(url, data, { headers: headers })
  }
  genericPUT(url: string, data): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('authorization', 'Token ' + localStorage.getItem('token'));
    return this.http.put(url, data, { headers: headers })
  }
  genericDELETE(url: string) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('authorization', 'Token ' + localStorage.getItem('token'));
    return this.http.delete(url, { headers: headers })
  }

  signUp(data: any) {
    return this.http.post(environment.managerSignUp, data)
  }
  login(data: any) {
    return this.http.post(environment.login, data)
  }


}
