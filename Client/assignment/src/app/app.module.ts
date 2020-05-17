import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
// import { ModalModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ng6-toastr-notifications';
import { HttpErrorInterceptor } from './http-error.interceptors';
import { AuthGuard } from './auth.guard';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule, ToastrModule.forRoot(),
    MaterialModule
  ],
  providers: [AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor, //error-handling by http errr interceptors
    multi: true

  }, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
