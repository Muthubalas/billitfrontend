import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addappointment',
  templateUrl: './addappointment.component.html',
  styleUrls: ['./addappointment.component.css']
})
export class AddappointmentComponent implements OnInit {
  public data: DataService;
  public services: string[] = [];
  public i: number; 
  appointment = new FormGroup({
    id: new FormControl(''),
    customer_name: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    service: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    date_time: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    staffname: new FormControl('', [Validators.required]),
    status: new FormControl('')
  });

  Users: any;
  a: any;
  customerNameValue: string = '';
  appointmentStatusValue: string = '';
  actionbtn: string = "Save";
  savingInProgress: boolean = false;
  getservice: any[]=[];
  item:any=[];
  selectedpro: string = '';
  servecost: any;
    keyword="service_name";


  constructor(
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public edit: any,
    private dialog: MatDialogRef<AddappointmentComponent>,
    private router: Router
  ) { this.data = this.dataService; this.i = 0; }

  ngOnInit(): void {
    if (this.edit) {
      this.updateappointment();
    }
  }



  get customerName() {
    return this.appointment.get('customer_name');
  }
  get gender() {
    return this.appointment.get('gender');
  }
  get service() {
    return this.appointment.get('service');
  }
  get phone() {
    return this.appointment.get('phone');
  }
  get dateTime() {
    return this.appointment.get('date_time');
  }
  get location() {
    return this.appointment.get('location');
  }
  get staffname() {
    return this.appointment.get('staffname');
  }
  get appointmentStatus() {
    return this.appointment.get('status');
  }

  select(event: any) {
    this.a = event.target.value;
  }

  cancelUpdate() {
    this.dialog.close();
  }

  capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  addappointment() {
    if (this.savingInProgress) {
      return;
    }

    this.savingInProgress = true;
    event?.preventDefault();

    if (this.customerName?.value) {
      let customerName = this.customerName.value.trim().replace(/\s+/g, ' ');
      customerName = this.capitalizeFirstLetter(customerName);
      this.customerNameValue = customerName;
    }

    if (this.appointmentStatus?.value) {
      this.appointmentStatusValue = this.capitalizeFirstLetter(this.appointmentStatus.value.trim());
    }

    if (this.appointment.valid) {
      const items = {
        id: this.appointment.value.id,
        customer_name: this.customerNameValue,
        gender: this.gender?.value,
        service: this.service?.value,
        phone: this.phone?.value,
        date_time: this.dateTime?.value,
        location: this.location?.value,
        staffname: this.staffname?.value,
        status: this.appointmentStatusValue
      };

      this.data.addappointment(items).subscribe(
        (result: any) => {
          this.Users = result;
          this.dialog.close();
          Swal.fire({
            title: 'Success',
            text: 'Appointment Submitted Successfully',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            window.location.reload();
          });
        },
        error => {
          this.savingInProgress = false;
        }
      );
    } else {
      Swal.fire({
        title: 'Warning',
        text: 'Please fill mandatory fields',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      this.savingInProgress = false;
    }
  }

  updateappointment() {
    this.appointment.controls['id'].setValue(this.edit.appointment_id);
    this.appointment.controls['customer_name'].setValue(this.edit.customer_name);
    this.appointment.controls['gender'].setValue(this.edit.gender);
    this.appointment.controls['service'].setValue(this.edit.service);
    this.appointment.controls['phone'].setValue(this.edit.phone);
    this.appointment.controls['date_time'].setValue(this.edit.date_time);
    this.appointment.controls['location'].setValue(this.edit.location);
    this.appointment.controls['staffname'].setValue(this.edit.staffname);
    this.appointment.controls['status'].setValue(this.edit.status);
    this.actionbtn = "Update";
  }


  filteredServices = this.getservice;
  selectserv(i: any, event: any) {
    const inputValue = event.target.value.toLowerCase().replace(/\s/g, ''); // Remove spaces and ensure case-insensitivity
    this.filteredServices = this.getservice.filter(item =>
      item.service_name.toLowerCase().replace(/\s/g, '').startsWith(inputValue)
    );
  
    const data = this.filteredServices.find(item => item.service_name.toLowerCase().replace(/\s/g, '') === inputValue);
    this.item[i].prod = data ? data.service_name : '';
  
    if (data) {
      this.selectedpro = data;
      this.item[i].service_price = data.service_price;
      data.quantity = 1;
      this.item[i].cost = data.quantity * data.service_price;
      this.item[i].amount = this.item[i].cost;
      data.amount = this.item[i].cost;
  
      this.servecost = undefined;
 
    }
    else{
      this.item[i].cost ="";
      this.item[i].amount = 0;
  
    }
    // this.calculateSubtotal();
  }
  customFilter = function(products: any[], query: string): any[] {
    const lowerQuery = query.toLowerCase();
    return products.filter(prod => prod.service_name.toLowerCase().startsWith(lowerQuery));
  }
  onchangesearch(event: Event){
    // console.log("RANDOM SEARCH:", event);
  
    }
    onfocused(e:any){

    }
}
