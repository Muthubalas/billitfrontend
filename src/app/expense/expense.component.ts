import { Component, OnInit,Input,ViewChild ,AfterViewInit,ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';


import { NgForm } from '@angular/forms';
import { AladexpenseComponent } from '../aladexpense/aladexpense.component';
import { DataService } from '../data.service';
import { UpdateExpenseComponent } from '../update-expense/update-expense.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { EditprofileComponent } from '../editprofile/editprofile.component';


@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {
  form!: NgForm;
  helper=new JwtHelperService();
  displayedColumns = ['position','date', 'name', 'weight', 'symbol','actions'];
  dataSource!:MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  list: any;
  token: any;
  profilerole: any;
  profile: any;
  userRole: any;
  constructor(private dialog:MatDialog,private data:DataService,private router:Router,private auth:AuthService) { }

  ngOnInit(): void {
    this.token=localStorage.getItem('token')
let decodetoken=this.helper.decodeToken(this.token)
this.userRole=decodetoken.role
if(decodetoken.role=="0"){
  this.profilerole="Admin"
}
else{
  this.profilerole="Manager"
}
    this.getlist()
  }
  ngAfterViewInit() {
    // this.myModal = this.myModalRef.nativeElement;
    this.dataSource.paginator = this.paginator;
  }

  // constructor() { }
  fromDate: string = ''; // Bind this to the 'from' date input field
  toDate: string = '';   // Bind this to the 'to' date input field
  // Other existing code...

  applyDateFilter() {
    // Convert string dates to Date objects
    const fromDate = this.fromDate ? new Date(this.fromDate) : null;
    const toDate = this.toDate ? new Date(this.toDate) : null;

    // Apply filter based on the date range
    this.dataSource.filterPredicate = (data: any) => {
      const createdAt = new Date(data.date); // Assuming createdAt is your date property
      // Perform filtering logic here
      if (fromDate && toDate) {
        return createdAt >= fromDate && createdAt <= toDate;
      } else if (fromDate) {
        return createdAt >= fromDate;
      } else if (toDate) {
        return createdAt <= toDate;
      }
      return true; // Show all data if no date range is provided
    };

    // Trigger the filtering
    this.dataSource.filter = '' + Math.random(); // Random value to trigger the filter
  }

  @Input() sideNavOpen: boolean = false;


  // // sideNavOpen: boolean = false;

  toggleSideNav() {
    this.sideNavOpen = !this.sideNavOpen;
  }
  servebill(){
    this.router.navigate(['service_bill'])
  }
  probill(){
    this.router.navigate(['product_bill'])
  }
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  addexp(){
    this.dialog.open(AladexpenseComponent,{

      width:' 702px',
      height: '398px'
    })
  }
  editexp(row:any){
    this.dialog.open(UpdateExpenseComponent,{

      width:' 702px',
      height: '398px',
      data:row
    })
  }
  deleteExp(servelist:any){
    Swal.fire({
      title: "Are you sure?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete"
    }).then((result) => {
      if (result.isConfirmed) {
        const serviceData = {
          name: servelist.name,
          date: servelist.date,
          amount: servelist.amount,
          description:servelist.description
        };

        const idData = {
          _id:servelist._id
        };
        const url = idData._id;


        this.data.deleteExpense(url, serviceData).subscribe(
          (result) => {
            Swal.fire({
              title: "Deleted",
              text: "Expense has been deleted",
              icon: "success"
            })
            // alert("Expense deleted successfully")
            // this.router.navigate(['expense'])
            .then(()=>{
              window.location.reload();
            })

            },


          (error) => {
            console.error('Error:', error);

          }
        );
      }
    });
      }
  getlist(){
    return this.data.getexpenselist().subscribe((result:any)=>{
      this.list=result.listExpense;
      this.dataSource=new MatTableDataSource(result.listExpense);
      this.dataSource.paginator=this.paginator;

    })
  }
  serialNumber: number = 1;

  // Function to reset the serial number when needed
  resetSerialNumber() {
    this.serialNumber = 1;
  }
  isDropdownOpen1 = false;

  toggleDropdown1() {
    this.isDropdownOpen1 = !this.isDropdownOpen1;
  }
  logout(){
    this.router.navigate(['login'])
    this.data.removeToken()

  }
  editprofile(){
    this.token=localStorage.getItem('token')
    let decodetoken=this.helper.decodeToken(this.token)
    this.data.findadminal(decodetoken.sub).subscribe(
      (result) => {
        this.profile=result;


              this.dialog.open(EditprofileComponent,{
                width:'792px',
                height:'381px',
            data:this.profile.findadmin

              })
      })
    }
}
export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  date:Date;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, date:new Date(2015, 15, 24),name: 'Tissue', weight: 220, symbol: 'Milk'},
  {position: 2, date:new Date(2015, 15, 24),name: 'Tissue', weight: 220, symbol: 'Milk'},
  {position: 3, date:new Date(2015, 15, 24),name: 'Tissue', weight: 220, symbol: 'Milk'},
  {position: 4, date:new Date(2015, 15, 24),name: 'Tissue', weight: 220, symbol: 'Milk'},
  {position: 5, date:new Date(2015, 15, 24),name: 'Tissue', weight: 220, symbol: 'Milk'},
  {position: 6, date:new Date(2015, 15, 24),name: 'Tissue', weight: 220, symbol: 'Milk'},
  {position: 7, date:new Date(),name: 'Tissue', weight: 220, symbol: 'Milk'},
  {position: 8, date:new Date(),name: 'Tissue', weight: 220, symbol: 'Milk'},
  {position: 9, date:new Date(),name: 'Tissue', weight: 220, symbol: 'Milk'},
  {position: 10, date:new Date(),name: 'Tissue', weight: 220, symbol: 'Milk'},
  {position: 11, date:new Date(),name: 'Tissue', weight: 220, symbol: 'Milk'},
  {position: 12, date:new Date(),name: 'Tissue', weight: 220, symbol: 'Milk'},
  {position: 13, date:new Date(),name: 'Tissue', weight: 220, symbol: 'Milk'},
  {position: 14, date:new Date(),name: 'Tissue', weight: 220, symbol: 'Milk'},
  {position: 15, date:new Date(),name: 'Tissue', weight: 220, symbol: 'Milk'},
  {position: 16, date:new Date(),name: 'Tissue', weight: 220, symbol: 'Milk'},

];
