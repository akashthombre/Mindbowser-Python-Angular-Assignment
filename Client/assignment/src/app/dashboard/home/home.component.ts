import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from '../../../environments/environment';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  modalRef: BsModalRef;
  errorMsg = '';
  popupTitle = '';
  employeeForm: FormGroup;
  employees: any;
  constructor(public toastr: ToastrManager, public authService: AuthService, private modalService: BsModalService, public fb: FormBuilder) {

    this.employeeForm = fb.group({
      'empid': [null, Validators.required],
      'first_name': [null, Validators.required],
      'last_name': [null, Validators.required],
      'address': [null, Validators.required],
      'dob': [null, Validators.required],
      'mobile': [null, [Validators.maxLength(10), Validators.pattern('[7-9]{1}[0-9]{9}')]],
      'city': [null, Validators.required],
    });
  }

  ngOnInit() {
    this.getEmployees()
  }

  _keyPress(event: string) { //mobile number validation
    let value = event;
    if (value.length > 10) {
      this.employeeForm.controls['mobile'].setValue(value.slice(0, 10))
    }
  }

  public hasError = (controlName: string, errorName: string) => { //form errors
    return this.employeeForm.controls[controlName].hasError(errorName);
  }

  getEmployees() { //getAll Employyes
    console.log('getEmployees fun called ')
    this.authService.genericGET(environment.getAllEmployees).subscribe((res: any) => {
    console.log('getEmployees res ',res)
      if (res.success === true) {
        this.employees = res.data;
        console.log('this.employees ',this.employees)
      } else {
        this.errorMsg = res.message;
      }
    }, err => {
      this.errorMsg = err.message;
    })
  }

  createEmployee() { //add new employee
    if (this.employeeForm.valid) {
      this.authService.genericPOST(environment.createEmployee, this.employeeForm.value).subscribe((res: any) => {
        console.log('createEmployee res ',res)
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
  
  deleteEmployee(id: any) {
    this.authService.genericDELETE(environment.deleteEmployeeById + id).subscribe((res: any) => {
      if (res.success === true) {
        this.toastr.successToastr(res.message);
        this.getEmployees();
      } else {
        this.toastr.errorToastr(res.message);
      }
    }, err => {
      this.toastr.errorToastr(err.message);
    })
  }

  toUpdateEmployeeId: any;
  updateEmployeePopup(template: TemplateRef<any>, selectedRowData: any) {
    console.log('selectedRowData ',selectedRowData)
    this.popupTitle = "Update Employee";
    this.modalRef = this.modalService.show(template, { backdrop: 'static', class: 'modal-lg', });
    this.toUpdateEmployeeId = selectedRowData.id;
    this.employeeForm.patchValue({
      'empid': selectedRowData.empid,
      'first_name': selectedRowData.first_name,
      'last_name': selectedRowData.last_name,
      'address': selectedRowData.address,
      'dob': selectedRowData.dob,
      'mobile': selectedRowData.mobile,
      'city': selectedRowData.city,
    })
  }

  updateEmployee() {
    this.authService.genericPUT(environment.updateEmployee  + this.toUpdateEmployeeId, this.employeeForm.value).subscribe((res: any) => {
      if (res.success === true) {
        this.toastr.successToastr(res.message);
        this.Cancel();
      } else {
        this.toastr.errorToastr(res.message);
      }
    }, err => {
      this.toastr.errorToastr(err.message);
    })
  }

  openPopupToAddNewEmployee(template: TemplateRef<any>) {
    this.popupTitle = 'Add Employee'
    this.modalRef = this.modalService.show(template, { backdrop: 'static', class: 'modal-lg', });
  }

  Cancel() {
    this.modalRef.hide();
    this.popupTitle = ''
    this.getEmployees();
    this.employeeForm.reset()
  }
}
