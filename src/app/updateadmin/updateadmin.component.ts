import { Component, OnInit,Inject } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updateadmin',
  templateUrl: './updateadmin.component.html',
  styleUrls: ['./updateadmin.component.css']
})
export class UpdateadminComponent implements OnInit {

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
  constructor(private dialogRef: MatDialogRef<UpdateadminComponent>,
    @Inject(MAT_DIALOG_DATA) public edit: any,private data:DataService,private router:Router) { }

  ngOnInit(): void {
    this.admin.controls['_id'].setValue(this.edit._id);
    this.admin.controls['phone'].setValue(this.edit.phone);
    this.admin.controls['name'].setValue(this.edit.name);
    this.admin.controls['email'].setValue(this.edit.email);
    // this.admin.controls['password'].setValue(this.edit.password);
    this.admin.controls['role'].setValue(this.edit.role);
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
  // capitalizeFirstLetter(word: string): string {
  //   return word.charAt(0).toUpperCase() + word.slice(1);
  // }
  updateadmin(){
    // console.log(this.admin.value.password);
    // console.log(this.admin.value.phone);
    if(this.admin.value.role==="Admin"){
      this.admin.value.role="0"
    }
    else{
      this.admin.value.role="1"
    }
    // if(this.edit.password){
    //   this.admin.value.password=this.edit.password;
    // }
    // else{
    //   this.admin.value.password;
    // }
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
if(this.admin.value.phone!='' &&  this.adminame!='' && this.admin.value.email != '' && this.admin.value.role!=''){
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
          // Username already exists
          this.usernameExists = true;
          // Swal.fire({
          //   title: 'Error',
          //   text: 'Username already exists',
          //   icon: 'error',
          //   confirmButtonText: 'OK'
          // });
        } else {

          console.error('Error adding admin:', error);

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
