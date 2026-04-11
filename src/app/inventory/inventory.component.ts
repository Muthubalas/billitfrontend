import { Component, OnInit,Input } from '@angular/core';
import { AddinventComponent } from '../addinvent/addinvent.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx'
import { UpdateprodinventComponent } from '../updateprodinvent/updateprodinvent.component';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../auth.service';
import { EditprofileComponent } from '../editprofile/editprofile.component';

interface Service {
  Product_id: number;
  Product_name: string;
  Product_price: number;
  Product_category: string;

}
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  providers: [DatePipe]
})
export class InventoryComponent implements OnInit {
  getpro: any;
  leastcount: any;
  stockincount: any;
  stockoutcount: any;
  totalprodcount: any;
  stockindetail: any;
  leastdetail: any;
  stockoutdetail: any;
  totalprodetail: any;
  filteredPeoples: any;
  paginatedPeoples: any;
  // totalPages:number= 5;
  totalPagesArray: any=[];
  currentPage = 1;
  itemsPerPage = 4;
  helper=new JwtHelperService();
  paginatedData: any[] = [];
  show:boolean=false;
  show1:boolean=true;
  showexport:boolean=false;
  showexport1:boolean=true;
  token: any;
  profilerole: any;

  profile: any;
  userRole: any;
  constructor(private dialog:MatDialog,private data:DataService,public datePipe:DatePipe,
    private router:Router,private auth:AuthService) { }

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
    this.stockin()
    this.least()
    this.stockout()
    this. getproductlist()
    this.totalproduct()
  }
  addinv(){
    this.dialog.open(AddinventComponent,{
      width: '792px',
height: '404px',
    })
  }
  @Input() sideNavOpen: boolean = false;


  // sideNavOpen: boolean = false;

  toggleSideNav() {
    this.sideNavOpen = !this.sideNavOpen;
  }
  getproductlist(){
    return this.data.getproductlist().subscribe((result:any)=>{
      // this.getpro=result.listserv;
      // console.log(this.getpro);

    })
   }

   least(){
    return this.data.leastcountretail().subscribe((result:any)=>{
      this.leastcount=result.total;
      this.leastdetail=result.Least;

    })
   }
   stockin(){
    return this.data.stockinretail().subscribe((result:any)=>{
      this.stockincount=result.total;
      this.stockindetail=result.Listproduct;

    })
   }
   stockout(){
    return this.data.stockoutretail().subscribe((result:any)=>{
      this.stockoutcount=result.total;
      this.stockoutdetail=result.Total_stockout;

    })
   }
   totalproduct(){
    return this.data.totalproretail().subscribe((result:any)=>{
      this.totalprodcount=result.total;
      this.getpro=result.listproduct;

    })
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
  exportToExcel4(getpro: any[], fileName: string): void {
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
  exportTotal(){
    this.exportToExcel4( this.getpro, 'Total product data');
  }

  fromDate: string = ''; // Bound to the 'From' date input field
  toDate: string = '';
  formatDate(date: string): string {
  const formattedDate = new Date(date);
  const day = formattedDate.getDate().toString().padStart(2, '0');
  const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
  const year = formattedDate.getFullYear();
  return `${day}-${month}-${year}`;
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
  this.paginatedData = this.filteredPeoples
  // this.paginatedData = this.filteredPeoples.slice(startIndex, endIndex);
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

onPageChange(pageNumber: number) {
  this.currentPage = pageNumber;
}
getPaginatedData() {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.getpro
  // return this.getpro.slice(startIndex, endIndex);
}
getTotalPages() {
return Math.ceil(this.getpro.length / this.itemsPerPage);
}

getPages() {
return Array(this.getTotalPages()).fill(0).map((_, index) => index + 1);
}


prepareDataForExport() {
  const data = this.getPaginatedData(); // Get paginated data
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  this.saveExcelFile(excelBuffer, 'exported_data.xlsx');
}

// Function to save Excel file
saveExcelFile(buffer: any, fileName: string) {
  const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const a: HTMLAnchorElement = document.createElement('a');
  a.href = URL.createObjectURL(data);
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(a.href);
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
isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
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
servebill(){
  this.router.navigate(['service_bill'])
}
probill(){
  this.router.navigate(['product_bill'])
}

updateproinv(db:any){
  this.dialog.open(UpdateprodinventComponent,{
    width: '792px',
height: '404px',
data:db
  })
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
