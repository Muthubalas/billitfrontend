import { Component, OnInit,Inject,} from '@angular/core';
import { FormControl, FormGroup,Validators} from '@angular/forms';
import { DataService } from '../data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { Router } from '@angular/router';
@Component({
  selector: 'app-addservice',
  templateUrl: './addservice.component.html',
  styleUrls: ['./addservice.component.css']
})
export class AddserviceComponent implements OnInit {

  service=new FormGroup({
    id:new FormControl(''),
    name:new FormControl('',[Validators.required]),
    gender:new FormControl('',[Validators.required]),
    price:new FormControl('',[Validators.required]),
    description:new FormControl(''),
  })
  getserviceids: any;
  Users: any;
  a: any;
  servicename: any;
  description: any;

  constructor(private data:DataService, @Inject(MAT_DIALOG_DATA) public edit:any,
  private dialog:MatDialogRef<AddserviceComponent>,private router:Router) { }
  actionbtn:string="Save";
  ngOnInit(): void {
    this.getserviceid()

  }

  get name(){
    return this.service.get('name')
  }
  get price(){
    return this.service.get('price')
  }
  get gender(){
    return this.service.get('gender')
  }
  select(event:any){
    // console.log(event.target.value);
    this.a=event.target.value;


  }
  cancelUpdate() {
    this.dialog.close();
  }
  getserviceid(){
    return this.data.getserviceid().subscribe((result:any)=>{
      this.getserviceids=result.serviceID;

      this.service.controls['id'].setValue(this.getserviceids);
    })
   }
   capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  savingInProgress: boolean = false;
  addservice() {
    if (this.savingInProgress) {
      return; // If save is already in progress, do nothing
    }

    this.savingInProgress = true; // Set saving in progress to true

    event?.preventDefault();

    this.service.get('id')?.setValue(this.getserviceids);
    if (this.service.value && this.service.value.name) {
      // Normalize service name by replacing multiple spaces with a single space
      let serviceName = this.service.value.name.trim().replace(/\s+/g, ' ');

      // Capitalize the first letter of each word
      serviceName = this.capitalizeFirstLetter(serviceName);

      this.servicename = serviceName;
    } else {
      this.servicename = ''; // Set default value if this.service.value.name is null or undefined
    }
    // this.servicename = this.service.value.name;
    this.servicename = this.capitalizeFirstLetter(this.servicename.trim());
    this.description = this.service.value.description;
    this.description = this.capitalizeFirstLetter(this.description.trim());

    if (this.service.valid) {
      var items = {
        id: this.service.value.id,
        name: this.servicename,
        gender: this.service.value.gender,
        price: this.service.value.price,
        description: this.description
      };



      this.data.addservice(items).subscribe(
        (result: any) => {
          this.Users = result;
          this.dialog.close();
          Swal.fire({
            title: 'Success',
            text: 'Service Submitted Successfully',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            window.location.reload();
          });
        },
        error => {
          this.savingInProgress = false; // Set saving in progress to false in case of an error
        }
      );
    } else {
      Swal.fire({
        title: 'Warning',
        text: 'Please fill mandatory field',
        icon: 'warning',
        confirmButtonText: 'OK'
      });

      this.savingInProgress = false; // Set saving in progress to false if form is not valid
    }
  }


updateservice(){
  this.service.controls['id'].setValue(this.edit.service_id);

  }
}

