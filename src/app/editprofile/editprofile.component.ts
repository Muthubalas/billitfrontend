import { Component, OnInit,Inject } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  usernameExists: boolean = false;
 
  visible:boolean=true
  changetype:boolean=true;
  admin=new FormGroup({
    _id:new FormControl(''),
    name:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required]),
    phone:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required]),
    role:new FormControl('',[Validators.required])
  })
  password: any;
  adminame: any;
  profilerole:any;
  constructor(private dialogRef: MatDialogRef<EditprofileComponent>,
    @Inject(MAT_DIALOG_DATA) public edit: any,private data:DataService,private router:Router) { }

  ngOnInit(): void {

    this.admin.controls['_id'].setValue(this.edit._id);
    this.admin.controls['phone'].setValue(this.edit.phone);
    this.admin.controls['name'].setValue(this.edit.name);
    this.admin.controls['email'].setValue(this.edit.email);
    // this.admin.controls['password'].setValue(this.edit.password);
    this.admin.controls['role'].setValue(this.edit.role);

if(this.edit.role=="0"){
  this.profilerole="Admin"
  this.admin.controls['role'].setValue(this.profilerole);
}
else{
  this.profilerole="Manager"
  this.admin.controls['role'].setValue(this.profilerole);
}
  }
  view(){
    this.visible=!this.visible;
    this.changetype=!this.changetype
  }
  get name(){
    return this.admin.get('name')
  }
  get email(){
    return this.admin.get('email')
  }
  get phone(){
    return this.admin.get('phone')
  }
  get passwordcode(){
    return this.admin.get('password')
  }
  get role(){
    return this.admin.get('role')
  }
  clearUsernameError() {
    this.usernameExists = false;
  }
  capitalizeEachWord(sentence: string): string {
    return sentence.split(' ').map(word => this.capitalizeFirstLetter(word)).join(' ');
  }

  capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  updateadmin(){

    if(this.admin.value.role==="Admin"){
      this.admin.value.role="0"
    }
    else{
      this.admin.value.role="1"
    }

    this.adminame=this.admin.value.name;
    this.adminame = this.capitalizeEachWord(this.adminame.trim());
    if(this.admin.value.password){
     this.password= this.admin.value.password
    }
    else{
      this.password=this.edit.password
    }
    const adData = {
      phone: this.admin.value.phone,
      name:  this.adminame,
      email: this.admin.value.email,
      password:this.password,
      role: this.admin.value.role
    };

    const idData = {
      _id: this.admin.value._id
    };
if(this.admin.value.phone!='' && this.admin.value.phone!=undefined &&  this.adminame!='' && this.admin.value.email != '' && this.admin.value.role!=''){
  // alert('success');
  const url = idData._id;


  this.data.updateadmin(url, adData).subscribe(
    (result) => {
      this.dialogRef.close();
  Swal.fire({
    title: 'Admin updated',
    // text: 'This is an updated warning message.',
    icon: 'success',
    confirmButtonText: 'OK'
  })

      // this.router.navigate(['admin'])
      .then(()=>{
        window.location.reload();
      })

      },
      (error: any) => {
        if (error.status === 409) {

          this.usernameExists = true;

        } else {

          Swal.fire({
            title: 'Error',
            text: 'An error occurred while adding admin',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      }
      )

}
else{
  Swal.fire({
    title: 'Warning',
    text: 'Please fill mandatory field',
    icon: 'warning',
    confirmButtonText: 'OK'
  });
}


   }
   cancelUpdate() {
    this.dialogRef.close();
  }

}
