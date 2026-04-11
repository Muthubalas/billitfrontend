import { Component, OnInit,Inject} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { DataService } from '../data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-update-expense',
  templateUrl: './update-expense.component.html',
  styleUrls: ['./update-expense.component.css']
})
export class UpdateExpenseComponent implements OnInit {

  expense=new FormGroup({
    _id:new FormControl(''),
    name:new FormControl(''),
    date:new FormControl(''),
    amount:new FormControl(''),
    description:new FormControl('')
  })
  name: any;
  description: any;
  originalDate: any;
  constructor(private dialogRef: MatDialogRef<UpdateExpenseComponent>, @Inject(MAT_DIALOG_DATA) public edit: any,
  private service:DataService,private router:Router) { }

  ngOnInit(): void {
    this.expense.controls['_id'].setValue(this.edit._id);
    this.expense.controls['name'].setValue(this.edit.name);
    this.expense.controls['date'].setValue(this.edit.date);
    this.expense.controls['amount'].setValue(this.edit.amount);
    this.expense.controls['description'].setValue(this.edit.description);
  }
  changedate(getdate:any){
    // console.log(getdate.target.value);
    // console.log(new Date(`${getdate.target.value}`));
    this.originalDate=getdate.target.value;
    this.expense.value.date=this.originalDate
  }
  capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  editExpense(){
    this.name=this.expense.value.name
    this.name=this.capitalizeFirstLetter(this.name?.trim())
    this.description=this.expense.value.description
    this.description=this.capitalizeFirstLetter(this.description?.trim())
    var data={
      name:  this.name,
date: this.expense.value.date,
amount: this.expense.value.amount,
description: this.description
    }
    var id={
      _id:this.expense.value._id
    }
    if( this.expense.value.name!=''&& this.expense.value.amount!=null && this.expense.value.description!=''){
    const url = id._id


    this.service.updateExpense(url, data).subscribe(
      (result) => {
        this.dialogRef.close();
        Swal.fire({
          title: 'Success',
          text: 'Expense updated',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        // alert("Expense updated successfully")
        // this.router.navigate(['expense'])
        .then(()=>{
          window.location.reload();
        })
        },
      (error) => {
        console.error('Error updating service:', error);
      }

    );
    }else{
      Swal.fire({
        title: 'Warning',
        text: 'Please fill mandatory field',
        icon: 'warning',
        confirmButtonText: 'OK'
      })
    }
  }
  cancelUpdate() {
    this.dialogRef.close();
  }
  getMinimumDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const day = today.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
