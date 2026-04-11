import { Component, OnInit,Inject} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updcustomer',
  templateUrl: './updcustomer.component.html',
  styleUrls: ['./updcustomer.component.css']
})
export class UpdcustomerComponent implements OnInit {
  cusmemno: any;
  cusname: any;
  cusphno: any;

  customer=new FormGroup({
    _id:new FormControl(''),
    date:new FormControl(''),
    cusid:new FormControl(''),
    cusmemno:new FormControl(''),
    cusname:new FormControl(''),
    cusphno:new FormControl(''),
    cusgender:new FormControl(''),
    cusaddress:new FormControl(''),
    cusmail:new FormControl(''),
    cusinsta:new FormControl('')
  })
  add: any;
  selectgender: any;
  customername: any;
  cusaddress: any;
  membership: string | undefined;
  phone: string | undefined;
  constructor(@Inject(MAT_DIALOG_DATA) public edit:any,
  private dialog:MatDialogRef<UpdcustomerComponent>,private data:DataService,private router:Router,) { }

  ngOnInit(): void {
    this.customer.controls['_id'].setValue(this.edit._id);
    this.customer.controls['cusid'].setValue(this.edit.customer_id);
    this.customer.controls['cusname'].setValue(this.edit.customer_name);
    this.customer.controls['cusmemno'].setValue(this.edit.membership_no);
    this.customer.controls['cusphno'].setValue(this.edit.customer_phone);
    this.customer.controls['cusgender'].setValue(this.edit.gender);
    this.customer.controls['cusinsta'].setValue(this.edit.insta_id);
    this.customer.controls['cusmail'].setValue(this.edit.email);
    // this.customer.controls['date'].setValue(this.edit.date);
    this.customer.controls['cusaddress'].setValue(this.edit.address);
    const formattedDate = this.formatDate(new Date(this.edit.createdAt));
    this.customer.controls['date'].setValue(formattedDate);
  }
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  select(e:any){
    this.selectgender=e.target.value;


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
  custoupdate(){
    var date=new Date()
   this.customername= this.customer.value.cusname
   if (this.customername) {
    this.customername = this.capitalizeEachWord(this.customername.trim());
  }
  this.cusaddress=this.customer.value.cusaddress;
  if(this.cusaddress){
    this.cusaddress=this.capitalizeFirstLetter1(this.cusaddress.trim());
    }

  //  this.customername = this.capitalizeFirstLetter(this.customername);
    let cusmemno = this.cusmemno ? this.cusmemno : " ";
    const customerid={
      _id: this.customer.value._id,
    }

    this.membership=this.customer.value.cusmemno?.trim()
    this.phone=this.customer.value.cusphno?.trim()
    if(this.customername!='' && this.customer.value.cusphno!='' && this.customer.value.cusgender!='' ){
    var data={
      customer_name:this.customername,
      customer_phone:this.phone,
      customer_id:this.customer.value.cusid,
      membership_no:this.membership,
      gender:this.customer.value.cusgender,
      address: this.cusaddress,
      email:this.customer.value.cusmail,
      insta_id:this.customer.value.cusinsta,
      date:date,
    }


    const url = customerid._id;


    this.data.updatecustomer(url, data).subscribe(
      (result) => {
        this.dialog.close();
    Swal.fire({
      title: 'Success',
      text: 'Customer Updated',
      icon: 'success',
      confirmButtonText: 'OK'
    })
    .then(()=>{
      window.location.reload();
    })
        },
        // Handle success, e.g., show a success message

      (error) => {
        console.error('Error updating service:', error);
        // Handle error, e.g., show an error message
      }
    );
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
    this.dialog.close();
  }
}
