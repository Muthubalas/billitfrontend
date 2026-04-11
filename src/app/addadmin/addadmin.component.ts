import { Component, OnInit,Inject} from '@angular/core';
import { FormControl, FormGroup,Validators} from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.css']
})
export class AddadminComponent implements OnInit {
  visible:boolean=true
  changetype:boolean=true
  admin=new FormGroup({
    name:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    phone:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required]),
    role:new FormControl('',[Validators.required])
  })
  adval: any;
  usernameExists: boolean = false;

  adminame: any;
  constructor(private data:DataService,private router:Router, @Inject(MAT_DIALOG_DATA) public edit:any,
  private dialog:MatDialogRef<AddadminComponent>) { }

  ngOnInit(): void {
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
  get password(){
    return this.admin.get('password')
  }
  get role(){
    return this.admin.get('role')
  }
view(){
  this.visible=!this.visible;
  this.changetype=!this.changetype
}
clearUsernameError() {
  this.usernameExists = false;
}
// capitalizeFirstLetter(word: string): string {
//   return word.charAt(0).toUpperCase() + word.slice(1);
// }
capitalizeEachWord(sentence: string): string {
  return sentence.split(' ').map(word => this.capitalizeFirstLetter(word)).join(' ');
}

capitalizeFirstLetter(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
saveadmin(){
  this.adminame=this.admin.value.name;
  this.adminame = this.capitalizeEachWord(this.adminame.trim());
if(this.admin.valid){

  var data={
    name:this.adminame,
    email:this.admin.value.email,
    phone:this.admin.value.phone,
    password:this.admin.value.password,
    role:this.admin.value.role
  }
  this.data.addadmin(data).subscribe(
    (result: any) => {
      // Continue with your success logic
      this.adval = result;
      this.dialog.close();

      Swal.fire({
        title: 'Success',
        text: 'Admin added Successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      // Reload the page
      window.location.reload();
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
  );
  }

//   this.data.addadmin(data).subscribe((result:any)=>{
//     this.adval=result;
//     this.dialog.close()
//   Swal.fire({
//     title: 'Success',
//     text: 'Admin added Successfully',
//     icon: 'success',
//     confirmButtonText: 'OK'
//   })

//     // this.router.navigate(['admin'])
//     .then(()=>{
//       window.location.reload();
//     })

//   })
// }
else{
  Swal.fire({
    title: 'Warning',
    text: 'Fill all mandatory field',
    icon: 'warning',
    confirmButtonText: 'OK'
  });
  // alert("please fill all the fields")
}
}
cancelUpdate() {
  this.dialog.close();
}

}
