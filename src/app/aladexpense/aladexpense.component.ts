import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-aladexpense',
  templateUrl: './aladexpense.component.html',
  styleUrls: ['./aladexpense.component.css'],
  providers:[DatePipe]
})
export class AladexpenseComponent implements OnInit {
  name:any;
  date:any;
  amount:any;
  description:any;
  res: any;
  originalDate: any;
  constructor(private data:DataService,private dialogRef: MatDialogRef<AladexpenseComponent>,private datepipe:DatePipe) {
    const datePipe = new DatePipe('en-US');
    this.date=datePipe.transform(new Date(),'YYYY-MM-dd')!;

  }

  ngOnInit(): void {
    // this.updateDate()
  }
  capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  getMinimumDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const day = today.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
  savingInProgress: boolean = false;
  changedate(getdate:any){
    // console.log(getdate.target.value);
    // console.log(new Date(`${getdate.target.value}`));
    this.originalDate=getdate.target.value;
    this.date=this.originalDate
  }
  saveExpense() {
    if (this.savingInProgress) {
      return;
    }

    this.savingInProgress = true;
    if (this.name) {
      this.name = this.capitalizeFirstLetter(this.name.trim());
    }

    if (this.description) {
      this.description = this.capitalizeFirstLetter(this.description.trim());
    }

    this.name = this.name ? this.name : '';
    this.amount = this.amount ? this.amount : '';
    this.description = this.description ? this.description : '';

    if (this.name != '' && this.date != undefined && this.amount != '' && this.description != '') {
      var data = {
        name: this.name,
        date: this.date,
        amount: this.amount,
        description: this.description
      };

      this.data.addexpanse(data).subscribe(
        (result: any) => {
          this.res = result;
          this.dialogRef.close();
          Swal.fire({
            title: 'Success',
            text: 'Expense added Successfully',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            window.location.reload();
          });
          this.savingInProgress = false;
        },
        error => {
          this.savingInProgress = false;
        }
      );
    } else {
      Swal.fire({
        title: 'Warning',
        text: 'Please fill the mandatory field',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      this.savingInProgress = false;
    }
  }



  // updateDate() {
  //   const currentDate = new Date();
  //   const day = currentDate.getDate();
  //   const month = currentDate.getMonth() + 1;
  //   const year = currentDate.getFullYear();


  //   this.date = `${this.padNumber(day)}-${this.padNumber(month)}-${year}`;
  // }

  padNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
  cancelUpdate() {
    this.dialogRef.close();
  }
}
