import { Component, OnInit,Input } from '@angular/core';
import { AddinventComponent } from '../addinvent/addinvent.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx'
import { AddexpenseComponent } from '../addexpense/addexpense.component';
import { Router } from '@angular/router';
import { AddsaloninventComponent } from '../addsaloninvent/addsaloninvent.component';
import { UpdatesaloninventComponent } from '../updatesaloninvent/updatesaloninvent.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EditprofileComponent } from '../editprofile/editprofile.component';
import { AuthService } from '../auth.service';
interface Service {
  Product_id: number;
  Product_name: string;
  Product_price: number;
  Product_category: string;
  providers: [DatePipe]
}
@Component({
  selector: 'app-saloninvadmin',
  templateUrl: './saloninvadmin.component.html',
  styleUrls: ['./saloninvadmin.component.css']
})
export class SaloninvadminComponent implements OnInit {
  getpro: any;
  paginatedData: any[] = [];
  leastcount: any;
  stockincount: any;
  stockoutcount: any;
  totalprodcount: any;
  stockindetail: any[] = [];
  leastdetail: any;
  stockoutdetail: any;
  totalprodetail: any;
  filteredPeoples: any;
  show:boolean=false;
  show1:boolean=true;
  products: any[] = [];
  filteredProducts: any[] = [];
  fromDate: string = ''; // Bound to the 'From' date input field
  toDate: string = '';
  helper=new JwtHelperService();
  showexport:boolean=false;
  showexport1:boolean=true;
  token: any;
  profilerole: any;
  profile: any;

  role: any;

 constructor(private dialog:MatDialog,private data:DataService,private router:Router,private auth:AuthService){}

  ngOnInit(): void {
    this.token=localStorage.getItem('token')
    let decodetoken=this.helper.decodeToken(this.token)
    this.role=decodetoken.role;
    if(decodetoken.role=="0"){
      this.profilerole="Admin"
    }
    else{
      this.profilerole="Manager"
    }
    this.stockin()
    this.least()
    this.stockout()
    this. getproductlist()
    this.totalproduct()
    this.applyFilter()
  }
  @Input() sideNavOpen: boolean = false;


  // sideNavOpen: boolean = false;

  toggleSideNav() {
    this.sideNavOpen = !this.sideNavOpen;
  }
  addinv(){
    this.dialog.open(AddsaloninventComponent,{
      width: '792px',
height: '404px',
    })
  }
  least(){
    return this.data.leastcountsalon().subscribe((result:any)=>{
      this.leastcount=result.total;
      this.leastdetail=result.Least;

    })
   }
   stockin(){
    return this.data.stockinsalon().subscribe((result:any)=>{
      this.stockincount=result.total;
      this.stockindetail=result.Listsalonproduct;

    })
   }
   stockout(){
    return this.data.stockoutsalon().subscribe((result:any)=>{
      this.stockoutcount=result.total;
      this.stockoutdetail=result.Total_stockout;

    })
   }
   totalproduct(){
    return this.data.totalprosalon().subscribe((result:any)=>{
      this.totalprodcount=result.total;
      this.getpro=result.listproduct;

    })
   }
   getproductlist(){
    return this.data.getproductlist().subscribe((result:any)=>{
      // this.getpro=result.listserv;
      // console.log(this.getpro);
// this.applyDateFilter()
    })
   }


   filterDateFrom: string = '';
   filterDateTo: string = '';
   filteredData: any[] = [];

   // Pagination variables
   itemsPerPage: number = 4;
   currentPage: number = 1;

   // Function to format the date in dd-mm-yyyy format
   formatDatend(dateString: string): string {
     const date = new Date(dateString);
     return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
   }

   // Function to apply the date range filter
   applyFilter(): void {
     // Filter data based on the date range
     this.filteredData = this.getpro.filter((item:any) => {
       const itemDate = new Date(item.createdAt);
       const fromDate = this.filterDateFrom ? new Date(this.filterDateFrom) : null;
       const toDate = this.filterDateTo ? new Date(this.filterDateTo) : null;

       return (
         (!fromDate || itemDate >= fromDate) &&
         (!toDate || itemDate <= toDate)
       );
     });

     // Reset pagination to the first page
     this.currentPage = 1;
   }


  getPageNumbers(): number[] {
    const pageCount = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }
   exportToExcel1(leastdetail: any[], fileName: string): void {
    const filteredData = leastdetail.map((item, index) => ({
      'S.No': index + 1, // Serial number
      'Date': this.formatDate(item.createdAt), // Formatted date
      'Product ID': item.Product_id,
      'Product Name': item.Product_name,
      'Category': item.Product_category,
      'Quantity': item.Product_quantity,
      'Price': item.Product_price,
      'Product Type':item.Product_type
    }));
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
  exportleast(){
    this.exportToExcel1( this.leastdetail, 'Least data');
  }
   exportToExcel2(stockindetail: any[], fileName: string): void {
    const filteredData = stockindetail.map((item, index) => ({
      'S.No': index + 1, // Serial number
      'Date': this.formatDate(item.createdAt), // Formatted date
      'Product ID': item.Product_id,
      'Product Name': item.Product_name,
      'Category': item.Product_category,
      'Quantity': item.Product_quantity,
      'Price': item.Product_price,
      'Product Type':item.Product_type
    }));
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
  exportstockin(){
    this.exportToExcel2( this.stockindetail, 'Stockin data');
  }
  exportToExcel3(stockoutdetail: any[], fileName: string): void {
    const filteredData = stockoutdetail.map((item, index) => ({
      'S.No': index + 1, // Serial number
      'Date': this.formatDate(item.createdAt), // Formatted date
      'Product ID': item.Product_id,
      'Product Name': item.Product_name,
      'Category': item.Product_category,
      'Quantity': item.Product_quantity,
      'Price': item.Product_price,
      'Product Type':item.Product_type
    }));
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
  exportstockout(){
    this.exportToExcel3( this.stockoutdetail, 'Stockout data');
  }
  exportToExcel4(totalprodetail: any[], fileName: string): void {
    const filteredData = totalprodetail.map((item, index) => ({
      'S.No': index + 1, // Serial number
      'Date': this.formatDate(item.createdAt), // Formatted date
      'Product ID': item.Product_id,
      'Product Name': item.Product_name,
      'Category': item.Product_category,
      'Quantity': item.Product_quantity,
      'Price': item.Product_price,
      'Product Type':item.Product_type
    }));
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
  exportTotal(){
    this.exportToExcel4( this.totalprodetail, 'Total product data');
  }

  exportToExcel5(getpro: any[], fileName: string): void {
    const filteredData = getpro.map((item, index) => ({
      'S.No': index + 1, // Serial number
      'Date': this.formatDate(item.createdAt), // Formatted date
      'Product ID': item.Product_id,
      'Product Name': item.Product_name,
      'Category': item.Product_category,
      'Quantity': item.Product_quantity,
      'Price': item.Product_price,
      'Product Type':item.Product_type
    }));
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
  exportfulldata(){
    this.exportToExcel5( this.getpro, 'Invent Data');
  }
  exportToExcel6(paginatedData: any[], fileName: string): void {
    const filteredData = paginatedData.map((item, index) => ({
      'S.No': index + 1, // Serial number
      'Date': this.formatDate(item.createdAt), // Formatted date
      'Product ID': item.Product_id,
      'Product Name': item.Product_name,
      'Category': item.Product_category,
      'Quantity': item.Product_quantity,
      'Price': item.Product_price,
      'Product Type':item.Product_type
    }));
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
  exportfilterdata(){
    this.exportToExcel6( this.paginatedData, 'Invent Data');
  }


  formatDate(date: string): string {
  const formattedDate = new Date(date);
  const day = formattedDate.getDate().toString().padStart(2, '0');
  const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
  const year = formattedDate.getFullYear();
  return `${day}-${month}-${year}`;
}
isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
addexpense(){
  this.dialog.open(AddexpenseComponent,{
    width: '792px',
height: '404px',
  })
}
updatesalon(db:any){
  this.dialog.open(UpdatesaloninventComponent,{
    width: '792px',
height: '404px',
data:db
  })
}
servebill(){
  this.router.navigate(['service_bill'])
}
probill(){
  this.router.navigate(['product_bill'])
}
filterData() {
  this.show=true;
  this.show1=false;
  this.showexport=true;
this.showexport1=false;
    this.filteredPeoples = this.getpro.filter((item: any) => {
      const itemDate = new Date(item.createdAt).toISOString().split('T')[0];
      const fromDate = this.fromDate;

      const toDate = this.toDate;
      return (!fromDate || itemDate >= fromDate) && (!toDate || itemDate <= toDate);

    });
    this.paginateData();

  }
  paginateData() {
    // Calculate start and end index for pagination
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    // Slice the filtered data based on pagination indices
    // this.paginatedData = this.filteredPeoples.slice(startIndex, endIndex);
    this.paginatedData = this.filteredPeoples;

  }
  nav(){
    this.router.navigate(['dashy'])
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateData();
    }
  }

  nextPage() {
    const maxPage = Math.ceil(this.filteredPeoples.length / this.itemsPerPage);
    if (this.currentPage < maxPage) {
      this.currentPage++;
      this.paginateData();
    }

  }
  totalPages(): number[] {
    const totalItems = this.filteredPeoples.length;
    return Array(Math.ceil(totalItems / this.itemsPerPage)).fill(0).map((x, i) => i + 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.paginateData();
  }


  // currentPage = 1;
  // itemsPerPage = 5; // Number of items to show per page

  // Function to handle page change
  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  // Function to get paginated data
  getPaginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    // return this.getpro.slice(startIndex, endIndex);
    return this.getpro;
  }
  // In your component.ts file

// Calculate total pages based on items per page
getTotalPages() {
  return Math.ceil(this.getpro.length / this.itemsPerPage);
}

// Generate an array of page numbers for ngFor in HTML
getPages() {
  return Array(this.getTotalPages()).fill(0).map((_, index) => index + 1);
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
