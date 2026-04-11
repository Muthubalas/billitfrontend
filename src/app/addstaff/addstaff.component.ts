import { Component, OnInit,Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-addstaff',
  templateUrl: './addstaff.component.html',
  styleUrls: ['./addstaff.component.css']
})
export class AddstaffComponent implements OnInit {
  idproof:any;
  idproofno:any;
  initial:any;
  submitted:any;
  imgfile: any;
  visible:boolean=true
  changetype:boolean=true
  addstaffs: any;
  name: any;
  gender: any;
  date_of_joining: any;
  designation: any;
  employee_id: any;
  blood_group: any;
  phone: any;
  address: any;
  emergency_contact: any;
  email: any;
  password: any;
  bg: any;
  getempids: any;


  getMinimumDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const day = today.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
  constructor(private http:HttpClient,private data:DataService,private router:Router,@Inject(MAT_DIALOG_DATA) public edit:any,
  private dialog:MatDialogRef<AddstaffComponent>) { }

  ngOnInit(): void {
    this.getempid()
  }
  selectedFile: File | null = null;
  selectedFileUrl: string | ArrayBuffer | null = null;

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this.selectedFile = file;


      this.previewImage();
    }
  }

  private previewImage(): void {
    const reader = new FileReader();

    reader.onload = (e) => {
      // Check if e.target?.result is defined before assigning
      if (e.target?.result) {
        this.selectedFileUrl = e.target.result as string | ArrayBuffer;
      }
    };

    reader.readAsDataURL(this.selectedFile as Blob);
  }
  view(){
    this.visible=!this.visible;
    this.changetype=!this.changetype
  }

select(e:any){
  this.bg=e.target.value;
}
select1(e:any){
  this.gender=e.target.value;
}

select2(e:any){
  this.designation=e.target.value;
}
select3(e:any){
  this.idproof=e.target.value;
}
select4(e:any){
  this.submitted=e.target.value;
}
getempid(){
  return this.data.getempid().subscribe((result:any)=>{
    this.getempids=result.staffID;
    // this.service.controls['id'].setValue(this.getempids);
  })
 }
 cancelUpdate() {
  this.dialog.close();
}
capitalizeFirstLetter(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

savingInProgress: boolean = false;



addstaff() {
  if (this.savingInProgress) {
    return; // If save is already in progress, do nothing
  }

  this.savingInProgress = true;
this.email=this.email?this.email:"";
this.idproofno=this.idproofno?this.idproofno:"";
this.idproof=this.idproof?this.idproof:"";
this.emergency_contact=this.emergency_contact?this.emergency_contact:"";
this.address=this.address?this.address:"";
this.initial=this.initial?this.initial:"";
this.name=this.name?this.name:"";
this.phone=this.phone?this.phone:"";
this.gender=this.gender?this.gender:"";
  if (this.name != '' && this.gender != '' && this.date_of_joining != undefined &&
    this.designation != undefined && this.getempids != undefined && this.bg != undefined && this.phone != ''
    && this.emergency_contact != '' &&
    this.idproof != ''
    && this.initial != '' && this.idproofno != '' ) {

  this.idproofno=this.idproofno.trim();
this.initial = this.initial.toUpperCase().trim();

this.name = this.capitalizeFirstLetter(this.name.trim());
      const formData: FormData = new FormData();


      formData.append('name', this.name);
      formData.append('gender', this.gender);
      formData.append('date_of_joining', this.date_of_joining);
      formData.append('designation', this.designation);
      formData.append('employee_id',  this.getempids);
      formData.append('blood_group', this.blood_group);
      formData.append('phone', this.phone.trim());
      formData.append('address', this.address);
      formData.append('emergency_contact', this.emergency_contact.trim());
      formData.append('email', this.email);
      formData.append('idproofno', this.idproofno);
      formData.append('idproof', this.idproof);
      formData.append('initial', this.initial);
      // formData.append('submitted', this.submitted);

  if (this.selectedFile) {
    formData.append('image', this.selectedFile);
  }

  // const apiUrl="https://chillbreezeomr-backend.billitnow.in/staff-store";

    this.data.addstaff(formData).subscribe(
      (response) => {
        this.dialog.close()
        Swal.fire({
          title: 'Success',
          text: 'Staff added successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          window.location.reload();
        });
      },
      (error) => {
        console.error('Error uploading image', error);
      }
    );
  } else {
    Swal.fire({
      title: 'Warning',
      text: 'Please fill the mandatory field',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
    this.savingInProgress = false; // Set saving in progress to false if form is not valid
  }
}


}
