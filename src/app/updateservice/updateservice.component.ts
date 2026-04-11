import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updateservice',
  templateUrl: './updateservice.component.html',
  styleUrls: ['./updateservice.component.css']
})
export class UpdateserviceComponent implements OnInit {
  serviceID: any;

  a: any;
  service=new FormGroup({
    _id:new FormControl(''),
    id:new FormControl(''),
    name:new FormControl(''),
    price:new FormControl(''),
    gender:new FormControl(''),
    description:new FormControl(''),
  })
  up: any;
  servicename: any;
  description: any;

  constructor(
    private dialogRef: MatDialogRef<UpdateserviceComponent>,
    @Inject(MAT_DIALOG_DATA) public edit: any,
    private fb: FormBuilder,
    private dataService: DataService,public router:Router
  ) {

  }

  ngOnInit(): void {
    // this.action  btn="Update";

    this.service.controls['_id'].setValue(this.edit._id);
    this.service.controls['id'].setValue(this.edit.service_id);
    this.service.controls['name'].setValue(this.edit.service_name);
    this.service.controls['gender'].setValue(this.edit.service_gender);
    this.service.controls['description'].setValue(this.edit.service_description);
    this.service.controls['price'].setValue(this.edit.service_price);
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

  updateService(): void {
    if (!this.service || !this.service.value) {
      // Check if this.service or this.service.value is null or undefined
      return;
    }

    // Normalize and capitalize service name
    this.servicename = this.service.value.name ? this.service.value.name.trim().replace(/\s+/g, ' ') : '';
    this.servicename = this.servicename ? this.capitalizeFirstLetter(this.servicename) : '';

    // Normalize and capitalize description
    this.description = this.service.value.description ? this.service.value.description.trim().replace(/\s+/g, ' ') : '';
    this.description = this.description ? this.capitalizeFirstLetter(this.description) : '';

    const serviceData = {
      id: this.service.value.id,
      name: this.servicename,
      price: this.service.value.price,
      gender: this.service.value.gender,
      description: this.description
    };

    const idData = {
      _id: this.service.value._id
    };

    if (this.servicename && this.servicename !== '' && this.service.value.price != null && this.service.value.gender !== '') {
      const url = idData._id;

      this.dataService.updateservice(url, serviceData).subscribe(
        (result) => {
          this.dialogRef.close();
          Swal.fire({
            title: 'Success',
            text: 'Service Updated',
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
