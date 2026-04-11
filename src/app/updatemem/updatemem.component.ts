import { Component, OnInit,Inject } from '@angular/core';

import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-updatemem',
  templateUrl: './updatemem.component.html',
  styleUrls: ['./updatemem.component.css']
})
export class UpdatememComponent implements OnInit {
  customerPhoneNumber: string = '';

  memno:any;
  constructor(private dialogRef: MatDialogRef<UpdatememComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private router:Router,private datas:DataService) {
    this.customerPhoneNumber = data.phoneNumber;
  }

  ngOnInit(): void {

  }
  update(){
    var data={

customer_phone:this.customerPhoneNumber,



    }
    var id={
      membership_no:this.memno
    }
    const url = data.customer_phone;


    this.datas.updatemem(url, id).subscribe(
      (result:any) => {
        Swal.fire({
          title: 'Success',
          text: 'Membership added successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        this.datas.sendCusphno1(this.customerPhoneNumber.trim());
        this.dialogRef.close()
        // alert("Memberno updated successfully")
        // this.router.navigate(['probill'])
        // .then(()=>{
        //   window.location.reload();
        // })

        },
        // Handle success, e.g., show a success message

      (error:any) => {
        console.error('Error updating service:', error);
        // Handle error, e.g., show an error message
      }
    );
  }
  cancelUpdate() {
    this.dialogRef.close();
  }
}
