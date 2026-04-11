import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { MatDialog } from '@angular/material/dialog';
import { EditprofileComponent } from '../editprofile/editprofile.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx'
interface DataItem {
  amount: string;
  // ... other properties
}
interface Invoice {
  // Define your properties here
  // For example: invoice_no, service_details, product_details, etc.
}
@Component({
  selector: 'app-staffrep',
  templateUrl: './staffrep.component.html',
  styleUrls: ['./staffrep.component.css'],
  providers: [DatePipe]
})
export class StaffrepComponent implements OnInit {
  helper=new JwtHelperService();
  profile: any;
  token: any;

  profilerole: any;
  role: any;
  getstafflist: any;
  datalist: any;
  originalDataList: any[] = [];
  from: any;
  to: any;
  productname: any;
  inv: any;
  selectpaymode: any;
  customername: any;
  phoneNo: any;
  selectedInvoiceType: any;
  pageSize: number = 4;
  currentPage: number = 1;
  staffname: any;
  totalSales: number = 0;
  invoice:any;
  totalAmount: number = 0;
  a: any;
  serialNumber: number = 1;
  currentIndex: number = 0;
  constructor(private router:Router,public datePipe: DatePipe,private auth:AuthService,private data:DataService,private dialog:MatDialog) { }

  ngOnInit(): void {

    this.getstaff()
    this.getinvlist()
    this.list()
    this.token=localStorage.getItem('token')
    let decodetoken=this.helper.decodeToken(this.token)
this.role=decodetoken.role;
// console.log(this.role);

    if(decodetoken.role=="0"){
      this.profilerole="Admin"
    }
    else{
      this.profilerole="Manager"
    }
  }
  servebill(){
    this.router.navigate(['service_bill'])
  }
  probill(){
    this.router.navigate(['product_bill'])
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
    isDropdownOpen = false;

    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    }
    getstaff(){
      return this.data.getstaff().subscribe((result:any)=>{
        this.getstafflist=result.liststaff;
        // console.log(this.getstafflist);

      })
    }
    getinvlist() {
      this.data.getreports().subscribe((result: any) => {
        this.originalDataList = result.sortedArray;
        // console.log(this.originalDataList);

        this.applyFilters();

      });

    }
    list(){
      this.applyFilters();


    }
    filteredData: any[] = [];
    applyFilters() {
      this.datalist = this.originalDataList.filter((inv) => {
        const dateCondition=inv.date
        // const dateCondition = new Date(inv.createdAt).toISOString().split('T')[0];
        const from = this.from;
        const to = this.to;
        if (this.selectedInvoiceType) {
          const isService = this.selectedInvoiceType === 'Service';
          const isProduct = this.selectedInvoiceType === 'Product';

          const invoiceTypeCondition = isService
            ? inv.invoice_no?.toLowerCase()?.startsWith('sinv')
            : isProduct && inv.invoice_no?.toLowerCase()?.startsWith('pinv');

          return (
            (!from || dateCondition >= from) &&
            (!to || dateCondition <= to) &&
            invoiceTypeCondition &&
            (!this.staffname || inv.service_details?.some((detail:any) => detail.staffname?.toLowerCase() === this.staffname.toLowerCase()) ||
              inv.product_details?.some((product:any) => product.staffname?.toLowerCase() === this.staffname.toLowerCase()))
          );
        }
        else {
          return (
            (!from || dateCondition >= from) &&
            (!to || dateCondition <= to) &&
            (!this.staffname || inv.service_details?.some((detail:any) => detail.staffname?.toLowerCase() === this.staffname.toLowerCase()) ||
              inv.product_details?.some((product:any) => product.staffname?.toLowerCase() === this.staffname.toLowerCase()))
          );
        }
      });

      this.  calculateTotalAmount()

      this.currentPage = 1;
    }


    calculateTotalAmount() {
      let totalAmount = 0;
      let totalAmount1 = 0;
      let totalAmount2 = 0;
      let serialNumber = 1;
      for (const entry of this.datalist) {
        if (entry.service_details && entry.service_details.length > 0) {
          for (const service of entry.service_details) {
            if (!this.staffname || service.staffname?.toLowerCase() === this.staffname.toLowerCase()) {
              totalAmount1 += parseFloat(service.amount);
              service.serialNumber = serialNumber;

              serialNumber++;
            }
          }
        }

        if (entry.product_details && entry.product_details.length > 0) {
          for (const product of entry.product_details) {
            if (!this.staffname || product.staffname?.toLowerCase() === this.staffname.toLowerCase()) {
              totalAmount2 += parseFloat(product.amount);
              product.serialNumber = serialNumber;
              serialNumber++;
            }
          }
        }

      }

      totalAmount = (!this.staffname) ? (totalAmount1 + totalAmount2) :totalAmount1+ totalAmount2;

      this.a = totalAmount.toFixed(2);

      return totalAmount.toFixed(2);
    }
exportToExcel2(): void {
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('Record'));
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  const totalSalesRow = [null, 'Grand Total:', this.a];

  const rowCount = ws['!ref'] ? XLSX.utils.decode_range(ws['!ref']).e.r + 1 : 0;
  // XLSX.utils.sheet_add_json(ws, [totalSalesRow], { skipHeader: true, origin: `E${rowCount + 2}` });
  // const totalSalesRow = [null, 'Total Sales:', this.a];
  XLSX.utils.sheet_add_json(ws, [totalSalesRow], { skipHeader: true, origin: 'J2' });
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  // Save the file
  XLSX.writeFile(wb, 'Staff Report.xlsx');
}
  }

