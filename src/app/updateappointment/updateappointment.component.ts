import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updateappointment',
  templateUrl: './updateappointment.component.html',
  styleUrls: ['./updateappointment.component.css']
})
export class UpdateappointmentComponent implements OnInit {

  appointmentID: any;

  a: any;
  appointment=new FormGroup({
    _id:new FormControl(''),
    id:new FormControl(''),
    customer_name:new FormControl(''),
    gender:new FormControl(''),
    service:new FormControl(''),
    phone:new FormControl(''),
    date_time:new FormControl(''),
    location:new FormControl(''),
    staffname:new FormControl(''),
    status:new FormControl(''),
  })
  up: any;
  customer_name: any;
  status: any;
  service: any;
  phone: any;
  date_time: any;
  location: any;
  staffname: any;


  constructor(
    private dialogRef: MatDialogRef<UpdateappointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public edit: any,
    private fb: FormBuilder,
    private dataService: DataService,public router:Router
  ) {

  }

  ngOnInit(): void {
    // this.action  btn="Update";

    this.appointment.controls['_id'].setValue(this.edit._id);
    this.appointment.controls['id'].setValue(this.edit._id);
    this.appointment.controls['customer_name'].setValue(this.edit.customer_name);
    this.appointment.controls['gender'].setValue(this.edit.gender);
    this.appointment.controls['service'].setValue(this.edit.service);
    this.appointment.controls['phone'].setValue(this.edit.phone);
    this.appointment.controls['date_time'].setValue(this.edit.date_time);
    this.appointment.controls['location'].setValue(this.edit.location);
    this.appointment.controls['staffname'].setValue(this.edit.staffname);
    this.appointment.controls['status'].setValue(this.edit.status);
  }
  select(event:any){
    // console.log(event.target.value);
    this.a=event.target.value;


  }


  cancelUpdate() {
    this.dialogRef.close();
  }
  capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  updateappointment(): void {
    if (!this.appointment || !this.appointment.value) {
      // Check if this.service or this.service.value is null or undefined
      return;
    }

    // Normalize and capitalize service name
    this.customer_name = this.appointment.value.customer_name ? this.appointment.value.customer_name.trim().replace(/\s+/g, ' ') : '';
    this.customer_name = this.customer_name ? this.capitalizeFirstLetter(this.customer_name) : '';

    // Normalize and capitalize description
    this.status = this.appointment.value.status ? this.appointment.value.status.trim().replace(/\s+/g, ' ') : '';
    this.status = this.status ? this.capitalizeFirstLetter(this.status) : '';

    const appointmentData = {
      id: this.appointment.value.id,
      customer_name: this.customer_name,
      gender: this.appointment.value.gender,
      service: this.appointment.value.service, // Use this.appointment.value.service instead of this.service
      phone: this.appointment.value.phone, // Use this.appointment.value.phone instead of this.phone
      date_time: this.appointment.value.date_time, // Use this.appointment.value.date_time instead of this.date_time
      location: this.appointment.value.location, // Use this.appointment.value.location instead of this.location
      staffname: this.appointment.value.staffname, // Use this.appointment.value.staffname instead of this.staffname
      status: this.status,
    };
    const idData = {
      _id: this.appointment.value._id
    };

    if (this.customer_name !== '' && this.appointment.value.gender != null && this.appointment.value.status !== ''
    && this.appointment.value.service !== '' && this.appointment.value.phone !== '' && this.appointment.value.date_time !== '' && this.appointment.value.location !== '' && this.appointment.value.staffname !== '')
    {
      const url = idData._id;

      this.dataService.updateappointment(url, appointmentData).subscribe(
        (result) => {
          this.dialogRef.close();
          Swal.fire({
            title: 'Success',
            text: 'Appointment Updated',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            window.location.reload();
          });
        }
      );
    } else {
      Swal.fire({
        title: 'Warning',
        text: 'Please fill mandatory field',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  }

}
