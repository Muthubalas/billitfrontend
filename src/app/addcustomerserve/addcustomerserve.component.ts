import { Component, OnInit,Inject } from '@angular/core';
import { DataService } from '../data.service';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addcustomerserve',
  templateUrl: './addcustomerserve.component.html',
  styleUrls: ['./addcustomerserve.component.css']
})
export class AddcustomerserveComponent implements OnInit {
  customer=new FormGroup({

  })
  cus: any;
  add: any;
  cusname: any;
  cusphno: any;
  cusid: any;
  cusmemno: any;
  cusgender: any;
  cusaddress: any;
  cusmail: any;
  cusinsta: any;
  date: any;
  selectgender: any;
  customerPhoneNumber: any;
  constructor(private data:DataService,private dialog: MatDialogRef<AddcustomerserveComponent>,
    @Inject(MAT_DIALOG_DATA) public datas: any) {
      this.cusphno = datas.phoneNumber;
     }

  ngOnInit(): void {
    this.updateDate()
    this.getcusid()
  }
  getcusid(){
    return this.data.getcusid().subscribe((result:any)=>{
      this.cus=result.CustomerID;

    })
   }
   capitalizeEachWord(sentence: string): string {
    return sentence.split(' ').map(word => this.capitalizeFirstLetter(word)).join(' ');
  }

  capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }
   capitalizeFirstLetter1(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  custosave(event?: Event) {
    if (event) {
      event.preventDefault(); // Prevent the default behavior of the click event
    }
    var date=new Date()
if(this.cusname){
this.cusname = this.capitalizeEachWord(this.cusname.trim());
}
if(this.cusaddress){
  this.cusaddress=this.capitalizeFirstLetter1(this.cusaddress.trim());
  }

// this.cusname = this.capitalizeFirstLetter(this.cusname);
// if(this.cusmemno){
    let cusmemno = this.cusmemno ? this.cusmemno :'';
    this.cusmemno=cusmemno.trim()
// }
    let mail= this.cusmail?this.cusmail:'';
let insta=this.cusinsta?this.cusinsta:'';
let cusname=this.cusname?this.cusname:'';
let cusphno=this.cusphno?this.cusphno:'';
let cusgender=this.cusgender?this.cusgender:'';
// let cusaddress=this.cusaddress?this.cusaddress:'';
    if(cusname != '' && cusphno != '' && this.cusphno!=undefined && cusgender != ''){

      var data={
        customer_name:cusname,
        customer_phone:cusphno.trim(),
        customer_id:this.cus,
        membership_no:this.cusmemno,
        gender:cusgender,
        address:this.cusaddress,
        email:mail,
        insta_id:insta,
        date:date,
      }

      this.data.addcustomer(data).subscribe((result:any)=>{
        this.add=result;
        this.data.sendCusphno(this.cusphno.trim());
    this.dialog.close()
    Swal.fire({
      title: 'Success',
      text: 'Customer added successfully',
      icon: 'success',
      confirmButtonText: 'OK'
    })

      // .then(()=>{
      //   window.location.reload();
      // })

      })

    }
    else{
      Swal.fire({
        title: 'Warning',
        text: 'Please enter mandatory field',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      // alert("please enter required fields")
   }
  }
   updateDate() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Month is zero-based
    const year = currentDate.getFullYear();

    // Format the date as dd-mm-yyyy
    this.date = `${this.padNumber(day)}-${this.padNumber(month)}-${year}`;
  }

  padNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

select(e:any){
  this.selectgender=e.target.value;

}
cancelUpdate() {
  this.dialog.close();
}

}
