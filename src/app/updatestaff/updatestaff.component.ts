import { Component, OnInit,Inject} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { RouteReuseStrategy, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-updatestaff',
  templateUrl: './updatestaff.component.html',
  styleUrls: ['./updatestaff.component.css']
})
export class UpdatestaffComponent implements OnInit {

  visible:boolean=true

  changetype:boolean=true
  staffgender: any;
  bg: any;
  selectedFile: File | null = null;
  selectedFileUrl: string | ArrayBuffer | null = null;
  updateStaffForm =new FormGroup({
    _id:new FormControl(''),
    id:new FormControl(''), // This field is hidden and can be set with the staff ID
    name:new FormControl(''),
    gender:new FormControl(''),
    date_of_joining:new FormControl(''),
    designation:new FormControl(''),
    employee_id:new FormControl(''),
    blood_group:new FormControl(''),
    phone:new FormControl(''),
    address:new FormControl(''),
    emergency_contact:new FormControl(''),
    email:new FormControl(''),
    password:new FormControl(''),
    idproof:new FormControl(''),
    idproofno:new FormControl(''),
    initial:new FormControl(''),
    submitted:new FormControl(''),
    profile_pic:new FormControl(''),
  });
  designation: any;
  staffIdFromRoute: number = 0; // Initialize with a default value
  liveURL: any;
  staffname: any;
  doj: any;
  getempids: any;
  phone:any;
  date_of_joining:any;
  address: any;
  employee_id: any;
  email: any;
  password:any;
  emergency_contact: any;
  name: any;
  gender: any;
  blood_group: any;
  idproofno:any;
  idproof: any;
  initial:any;
  submitted: any;

  constructor(private fb: FormBuilder, private http: HttpClient,private dialogRef: MatDialogRef<UpdatestaffComponent>,
    @Inject(MAT_DIALOG_DATA) public edit: any,private data:DataService,private router:Router) {

  }




  ngOnInit(): void {
    this.updateStaffForm.controls['_id'].setValue(this.edit._id);
    this.updateStaffForm.controls['employee_id'].setValue(this.edit.employee_id);
    this.updateStaffForm.controls['name'].setValue(this.edit.name);
    this.updateStaffForm.controls['gender'].setValue(this.edit.gender);
    // this.updateStaffForm.controls['date_of_joining'].setValue(this.edit.date_of_joining);
    // Assuming edit.date_of_joining is in the format "2023-12-02T05:50:20.472+00:00"
const isoDate = this.edit.date_of_joining;
const datePart = isoDate.split('T')[0]; // Extracting the date part

// Setting the value of the form control
this.updateStaffForm.controls['date_of_joining'].setValue(datePart);

    this.updateStaffForm.controls['designation'].setValue(this.edit.designation);
    this.updateStaffForm.controls['phone'].setValue(this.edit.phone);
    this.updateStaffForm.controls['address'].setValue(this.edit.address);
    this.updateStaffForm.controls['emergency_contact'].setValue(this.edit.emergency_contact);
    this.updateStaffForm.controls['email'].setValue(this.edit.email);
    this.updateStaffForm.controls['submitted'].setValue(this.edit.submitted);
    this.updateStaffForm.controls['blood_group'].setValue(this.edit.blood_group);
    this.updateStaffForm.controls['initial'].setValue(this.edit.initial);
    this.updateStaffForm.controls['idproof'].setValue(this.edit.ID_proof);
    this.updateStaffForm.controls['idproofno'].setValue(this.edit.ID_proof_no);

    if (this.edit.profile_pic) {

      this.selectedFileUrl = this.data.endpoint+"static/"+this.edit.profile_pic;

    }
  }
  select(e:any){
    this.updateStaffForm.value.blood_group=e.target.value;
  }
  select1(e:any){
    this.staffgender=e.target.value;
  }
  select2(e:any){
    this.updateStaffForm.value.designation=e.target.value;
  }
  getMinimumDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const day = today.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
  select3(e:any){
    // this.idproof=e.target.value;
  }
  select4(e:any){
    // this.submitted=e.target.value;
  }
  view(){
    this.visible=!this.visible;
    this.changetype=!this.changetype
  }



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

      if (e.target?.result) {
        this.selectedFileUrl = e.target.result as string;
      }
    };

    reader.readAsDataURL(this.selectedFile as Blob);
  }
  capitalizeFirstLetter(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

  updatestaff(){
    const staffdata={
      employee_id: this.updateStaffForm.value.employee_id,
      name: this.updateStaffForm.value.name,
      gender: this.updateStaffForm.value.gender,
      date_of_joining: this.updateStaffForm.value.date_of_joining,
      designation: this.updateStaffForm.value.designation,
      phone: this.updateStaffForm.value.phone,
      address: this.updateStaffForm.value.address,
      emergency_contact: this.updateStaffForm.value.emergency_contact,
      email: this.updateStaffForm.value.email,
      password: this.updateStaffForm.value.password,
      profile_pic:this.selectedFile
      // price: this.updateStaffForm.value.price,
      // category: this.updateStaffForm.value.category
    }

    this.name= this.updateStaffForm.value.name;
    this.name = this.capitalizeFirstLetter(this.name.trim());
    this.date_of_joining=this.updateStaffForm.value.date_of_joining;

    this.phone=this.updateStaffForm.value.phone;
    this.address=this.updateStaffForm.value.address;
    this.emergency_contact=this.updateStaffForm.value.emergency_contact;
    this.email= this.updateStaffForm.value.email;

    this.password=this.updateStaffForm.value.password;

    this.employee_id=this.updateStaffForm.value.employee_id;

    this.gender=this.updateStaffForm.value.gender;

 this.designation=this.updateStaffForm.value.designation;



    this.blood_group=this.updateStaffForm.value.blood_group;

    this.idproofno=this.updateStaffForm.value.idproofno;
    this.idproofno=this.idproofno.trim();

    this.idproof=this.updateStaffForm.value.idproof;


    this.initial=this.updateStaffForm.value.initial;

    this.initial = this.initial.toUpperCase().trim();
    this.submitted=this.updateStaffForm.value.submitted;

// ()
const formData: FormData = new FormData();
    if (this.selectedFile) {
      // console.log(this.selectedFile);
    formData.append('image',this.selectedFile);
    }
    // else{
    //   formData.append('image',this.edit.profile_pic)
    // }
    formData.append('name',this.name);
    formData.append('gender', this.gender);
    formData.append('date_of_joining', this.date_of_joining);
    formData.append('designation', this.designation);
    formData.append('employee_id',  this.employee_id);
    formData.append('blood_group', this.blood_group);
    formData.append('phone', this.phone.trim());
    formData.append('address', this.address);
    formData.append('emergency_contact', this.emergency_contact.trim());
    formData.append('email', this.email);
    formData.append('idproofno', this.idproofno);
    formData.append('idproof', this.idproof);
    formData.append('initial', this.initial);
    formData.append('submitted', this.submitted);

    // const formData: FormData = new FormData();
    // Object.entries(staffdata).forEach(([key, value]) => {
    //   if (value !== undefined) {
    //     formData.append(key, value as string | Blob);
    //   }
    // });
    const staffid={
      _id: this.updateStaffForm.value._id,
    }

    if(this.name!='' && this.initial !='' && this.idproof!='' && this.idproofno != '' && this.gender !='' &&
    this.designation != '' &&  this.blood_group!='' && this.emergency_contact!='' && this.phone!=''){

    const url =staffid._id;


    this.data.updatestaff(url, formData).subscribe(
      () => {
        this.dialogRef.close();
        Swal.fire({
          title: 'Success',
          text: 'Staff Updated',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        window.location.reload()
      },
      (error) => {
        console.error('Error updating staff:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to update staff. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  } else {
    Swal.fire({
      title: 'Warning',
      text: 'Please fill all the mandatory fields',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
  }

  }
  cancelUpdate() {
    this.dialogRef.close();
  }
}
