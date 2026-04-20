import { Component, OnInit,ViewChild,ElementRef,Input} from '@angular/core';
import { DataService } from '../data.service';
import { DatePipe } from '@angular/common';
import jspdf from 'jspdf';
import { jsPDF } from 'jspdf';
import * as FileSaver from 'file-saver';

import { saveAs } from 'file-saver';
// import * as html2pdf from 'html2pdf.js';

import html2canvas from 'html2canvas';
import 'jspdf-autotable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../auth.service';
import { EditprofileComponent } from '../editprofile/editprofile.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-productreport',
  templateUrl: './productreport.component.html',
  styleUrls: ['./productreport.component.css'],
  providers: [DatePipe]
})
export class ProductreportComponent implements OnInit {
  product: any;
  row:any;
  pro:any=[]
    fileName="export-list.xlsx";
    // formattedDate: string = '';
    from:any;
    html2pdf: any;
    to:any
   arr:any=[];
   dateObject1:any;
   formattedDate: any;
   formattedtime: any;
   formattedTime: any;
    proname: any;
    table: any;
    invoice:any;
    gst: any;
    roundgst: any;
    datey: any;
    a: any;
    quantity: any;
   pname:any;
  prate:any;
  pqua:any;
  pamount:any;
    dis: any;
    noDataAvailable: any;
    pdfUrl: any;
    pros: any;
    pageSizer:number=20;
  exp:boolean=false;
  datalist: any[] = [];
  datalist1: any[] = [];
  formattedDatey: any;
  formattedDatey1: any;
  inv: any;
  staffname: any;
  customername: any;
  selectedInvoiceType: any;
  gender:any;
  phoneNo: any;
  paymode: any;
  selectpaymode: any;
currentPager: number = 1;
totalPager: number = 1;
 visiblePager: number[] = [];
  procat: any;
  pcost: any;
  procato: any;
  separatedDateTime: string = '';
  originalDataList: any[] = [];
  isLoading: boolean = false;
  token: any;
  profilerole: any;
  helper=new JwtHelperService();
  profile: any;
  role: any;
  productname: any;
  totalsum: any;
  totalsum1: any;
  totalsum2: any;
  totalsum3: any;
  totalcount: any;
  count: any;
  itemName: any;
  serviceCount: any;
  count1: any;
  productCount: any;
  count2: any;
  membership_no: any;
 
  constructor(private data:DataService,public datePipe: DatePipe,private route:Router,private router:Router,
    private auth:AuthService,private dialog:MatDialog) { }

  ngOnInit(): void {

    this.getinvlist(1)

    this.token=localStorage.getItem('token')
    let decodetoken=this.helper.decodeToken(this.token)
this.role=decodetoken.role;
    if(decodetoken.role=="0"){
      this.profilerole="Admin"
    }
    else{
      this.profilerole="Manager"
    }
  }
  open() {
    this.exp = !this.exp;
  }
  @Input() sideNavOpen: boolean = false;


  // sideNavOpen: boolean = false;

  toggleSideNav() {
    this.sideNavOpen = !this.sideNavOpen;
  }

  generate(){
    const doc=new jspdf()
    let content=`<table>
    <tr>
    <th></th>
    <th></th>
    <th></th>
    </tr>
    <th></th>
    <th></th>
    <th></th>
    <tr>
    </tr>`
    this.datalist.forEach((item) => {
      content += `<tr>
                    <td>${item.invoice_no}</td>
                    <td>${item.property2}</td>
                    <td>${item.property3}</td>
                  </tr>`;
    });

    content += `</table>`;

    // Add the HTML content to the PDF
    doc.text(content, 10, 10);

    // Generate the PDF blob
    const pdf = doc.output('blob');
    FileSaver.saveAs(pdf,'output.pdf')


  }
getinvlist(pageno: number = 1) {
  this.isLoading = true;

  const params: any = {
    page: pageno,
    limit: 20
  };

  if (this.from && this.to) {
    params.startDate = this.from;
    params.endDate = this.to;
  }

  if (this.inv) params.invoice_no = this.inv;
  if (this.customername) params.customer_name = this.customername;
  if (this.phoneNo) params.customer_phone = this.phoneNo;
  if (this.membership_no) params.membership_no = this.membership_no;
  if (this.selectpaymode) params.payment_mode = this.selectpaymode;
  if (this.selectedInvoiceType) params.invoiceType = this.selectedInvoiceType;
 if (this.gender) params.gender = this.gender;
  this.data.getreportsPage(params).subscribe({
    next: (result: any) => {
      this.datalist = result.data || [];
      this.totalPager = result.totalPages;
      this.currentPager = result.currentPage;
this.totalsum2 = result.summary.upi;
this.totalsum = result.summary.cash;
this.totalsum1 = result.summary.card;
this.totalcount = result.summary.total;
this.count = result.summary.count;
      this.updateVisiblePages();
    

      this.isLoading = false;
    },
    error: (err) => {
      console.error(err);
      this.isLoading = false;
    }
  });
}
  
updateVisiblePages() {
  const pages = [];

  if (this.totalPager <= 5) {
    // small pages → show all
    for (let i = 1; i <= this.totalPager; i++) {
      pages.push(i);
    }
  } else {
    // always show first page
    pages.push(1);

    // show "..." before
    if (this.currentPage > 3) {
      pages.push(-1); // -1 = dots
    }

    // middle pages
    for (let i = this.currentPage - 1; i <= this.currentPage + 1; i++) {
      if (i > 1 && i < this.totalPager) {
        pages.push(i);
      }
    }

    // show "..." after
    if (this.currentPage < this.totalPager - 2) {
      pages.push(-1);
    }

    // last page
    pages.push(this.totalPager);
  }

  this.visiblePager = pages;
}



//   calculateTotalAmount() {
//     let totalAmount = 0;
//       let totalAmount1 = 0;
//       let totalAmount2 = 0;
//   let totalSum = 0;
//   let totalSum1 = 0;
//   let totalSum2 = 0;
//   let totalSum3 = 0;
//   let totalcount = 0;
//   let serialNumber = 1;
// let totalSumUPI=0;
// let serviceCount=0;

//   this.totalsum = 0;
//   this.totalsum1 = 0;
//   this.totalsum2 = 0;
//   this.totalsum3 = 0;
//   this.totalcount = 0;
// if(this.datalist.length===0){
//   this.totalsum = 0;
//         this.totalsum1 = 0;
//         this.totalsum2 = 0;
//         this.totalsum3 = 0;
//         this.totalcount = 0;
//         this.count=0
// }
// else{
//      for (const entry of this.datalist) {
//       this.count=this.datalist.length;
//       totalcount += parseFloat(entry.total);
//       this.totalcount = totalcount.toFixed(2);
//       if (entry.payment_mode === "Cash") {
//                   totalSum += parseFloat(entry.total);
//                   this.totalsum = totalSum.toFixed(2);
//                 } else if (entry.payment_mode === "Card") {
//                   totalSum1 += parseFloat(entry.total);
//                   this.totalsum1 = totalSum1.toFixed(2);
//                 } else if (entry.payment_mode === "UPI") {
//                   totalSum2 += parseFloat(entry.total);
//                   this.totalsum2 = totalSum2.toFixed(2);
//                 } else if (entry.payment_mode === "cash and upi") {

//                   if (!isNaN(parseFloat(entry.cash_amount))) {
//                     totalSum += parseFloat(entry.cash_amount);
//                 }

//                 this.totalsum = totalSum.toFixed(2);
//                 if (!isNaN(parseFloat(entry.UPI_amount))) {
//                   totalSum2 += parseFloat(entry.UPI_amount);
//               }
//               this.totalsum2 = totalSum2.toFixed(2);
//                   // totalSum3 += parseFloat(entry.total);
//                   // this.totalsum3 = totalSum3;
//                 }
//                 else if(this.selectpaymode === ""){


//                   if (entry.payment_mode === "Cash") {
//                     totalSum += parseFloat(entry.total);
//                     this.totalsum = totalSum.toFixed(2);
//                   } else if (entry.payment_mode === "Card") {
//                     totalSum1 += parseFloat(entry.total);
//                     this.totalsum1 = totalSum1.toFixed(2);
//                   } else if (entry.payment_mode === "UPI") {
//                     totalSum2 += parseFloat(entry.total);
//                     this.totalsum2 = totalSum2.toFixed(2);
//                   } else if (entry.payment_mode === "cash and upi") {

//                     if (!isNaN(parseFloat(entry.cash_amount))) {
//                       totalSum += parseFloat(entry.cash_amount);
//                   }

//                   this.totalsum = totalSum.toFixed(2);
//                   if (!isNaN(parseFloat(entry.UPI_amount))) {
//                     totalSum2 += parseFloat(entry.UPI_amount);
//                 }
//                 this.totalsum2 = totalSum2.toFixed(2);
//                     // totalSum3 += parseFloat(entry.total);
//                     // this.totalsum3 = totalSum3;
//                   }
//                 }
//          }
// }
//      }

  updatepro(inv1: any) {

    if (inv1.invoice_no.startsWith('SINV')) {
      this.route.navigate(['update_servicebill']); // Navigate to 'up' route for service invoices
      this.data.selectedInvoice = inv1;
    } else if (inv1.invoice_no.startsWith('PINV')) {
      this.route.navigate(['update_productbill']); // Navigate to 'updateprorep' route for product invoices
      this.data.selectedInvoice1 = inv1;
    }

  }



   updateservice(inv:any){
    this.route.navigate(['update_servicebill'])
    this.data.selectedInvoice = inv;
    // console.log(this.data.selectedInvoice);

   }
   isDropdownOpen = false;

   toggleDropdown() {
     this.isDropdownOpen = !this.isDropdownOpen;
   }


getProductNames(inv: any): string {
  return inv.product_details.map((product:any) => product.Product_name).join('/');
}

getStaffNames(inv: any): string {
  return inv.product_details.map((product:any) => product.staffname).join('/');
}
calculateIndex(index: number): number {
  return (this.currentPage - 1) * this.pageSize + index + 1;
}

exportToExcel(): void {
  const dataToExport = this.originalDataList.map((item: any) => {
    const serviceDetails = item.service_details ? item.service_details.map((service: any) => ({
      'Service Name': service.service_name,
      'Service Gender': service.service_gender,
      'Staff Name': service.staffname,
      'Quantity': service.quantity,
      'Service Price': service.service_price,
      'Discount': service.discount,
      'Amount': service.amount
    })) : [];

    const productDetails = item.product_details ? item.product_details.map((product: any) => ({
      'Product Name': product.Product_name,
      'Product Category': product.Product_category,
      'Staff Name': product.staffname,
      'Product Price': product.Product_price,
      'Discount': product.discount,
      'Quantity': product.quantity,
      'Amount': product.amount
    })) : [];

    return {
      'Invoice No': item.invoice_no,
      'Customer Name': item.customer_name,
      'Customer Phone': item.customer_phone,
      'Service Details': serviceDetails,
      'Product Details': productDetails,
      'Payment Mode': item.payment_mode,
      'Sub Total': item.sub_total,
      'GST': item.gst,
      'Total': item.total,
      'Cash Amount': item.cash_amount,
      'UPI Amount': item.UPI_amount,
      'Date': item.createdAt
    };
  });

  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, 'exported_data.xlsx');
}

  printInvoice(invoice:any){
    // this.separateDateAndTime();
 this.dateObject1=new Date(invoice.createdAt)
    const customer= document.getElementById("custSpan") as HTMLInputElement;
    customer.innerText=invoice.customer_name;
    const createdAtDate = new Date(invoice.createdAt);
    const day = createdAtDate.getDate().toString().padStart(2, '0');
    const month = (createdAtDate.getMonth() + 1).toString().padStart(2, '0');
    const year = createdAtDate.getFullYear().toString();

    const datePart = `${day}-${month}-${year}`; // dd-mm-yyyy format
    const timePart = createdAtDate.toLocaleTimeString(); // Extracts the time part

    const pay = document.getElementById("dtSpan") as HTMLInputElement;
    pay.innerText = ` ${datePart}     ${timePart}`;
    // const pay= document.getElementById("dtSpan") as HTMLInputElement;
    // pay.innerText=this.formattedDate+'  '+this.formattedtime;
    this.formattedDate = this.dateObject1.toISOString().split('T')[0];

    // Format time
    this.formattedtime = this.dateObject1.toISOString().split('T')[1].split('.')[0];
    this.datey=invoice.date
    this.pro=invoice.product_details;
    // this.dis=invoice.discount
    // console.log(this.dis);


    let proarr=[]


    for(let i=0;i<this.pro.length;i++){

     this.pname=this.pro[i].Product_name;
     this.pcost=this.pro[i].Product_price     ;
     this.pqua=this.pro[i].quantity;
     this.pamount=this.pro[i].amount;
this.procato=this.pro[i].Product_category;
     proarr.push({
      Product_name:this.pname,
      quantity:this.pqua,
      amount:this.pamount,
      price:this.pcost,
      productcat:this.procato,
     })


    const that: { proarr: Array<{ Product_name: string; quantity: number; price: number;amount:number;productcat:string }> } = {
      proarr: [
        {
          Product_name:this.pname,
          quantity:this.pqua,
          amount:this.pamount,
          price:this.pcost,
          productcat:this.procato
        }
        // Your item objects here
      ],


    };
    this.table = '';


    proarr.map((item) => {
      if (item.Product_name) {
        let row: string = "<tr>";
        row =
          row +
          `<td> ${item.Product_name}</td><td> ${item.productcat}</td><td>${
            item.price
          }</td><td>${item.quantity}</td><td>${item.amount}</td></tr>`;
        this.table = this.table + row;
      }
    });

        const tabledata=document.getElementById("tbody") as HTMLInputElement
        tabledata.innerHTML = this.table;
  }



  const mobile=  document.getElementById("mobSpan")  as HTMLInputElement;
  mobile.innerText=invoice.customer_phone

  const gross=  document.getElementById("grossSpan")  as HTMLInputElement;
  gross.innerText=invoice.sub_total

  const gst=  document.getElementById("gstSpan")  as HTMLInputElement;
  gst.innerText=invoice.gst;

  const netamount=  document.getElementById("netSpan")  as HTMLInputElement;
  netamount.innerText=invoice.total

  const invnum=  document.getElementById("invNoSpan")  as HTMLInputElement;
  invnum.innerText=invoice.invoice_no
  const paymode=  document.getElementById("paySpan")  as HTMLInputElement;
  paymode.innerText=invoice.payment_mode


    const invoiceInput = document.getElementById("print-space") as HTMLInputElement;

    const trail=document.getElementById("trail") as HTMLInputElement;
    invoiceInput.style.display="block"

    trail.style.visibility="hidden"

    window.print()

    invoiceInput.style.display="none"
    trail.style.visibility="visible"




  }
  @ViewChild('Record') Record!: ElementRef;
  export() {
  const params: any = {
     all: true
  };

  
  if (this.from && this.to) {
    params.startDate = this.from;
    params.endDate = this.to;
  }

  if (this.inv) params.invoice_no = this.inv;
  if (this.customername) params.customer_name = this.customername;
  if (this.phoneNo) params.customer_phone = this.phoneNo;
  if (this.membership_no) params.membership_no = this.membership_no;
  if (this.selectpaymode) params.payment_mode = this.selectpaymode;
  if (this.selectedInvoiceType) params.invoiceType = this.selectedInvoiceType;

  this.data.getreportsPage(params).subscribe((res: any) => {
    const fullData = res.data;

    const dataToExport = fullData.map((item:any) => ({
      'Invoice No': item.invoice_no,
      'Date': this.datePipe.transform(item.date,'dd-MM-yyyy'),
      'Customer Name': item.customer_name,
      'Phone No': item.customer_phone,
      'Total': parseFloat(item.total),
      'Transaction Type': item.payment_mode,
      'Membership No': item.membership_no,
    }));

    const totalAmount = dataToExport.reduce((t:any, i:any) => t + i.Total, 0);

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

   
    XLSX.utils.sheet_add_json(ws, [
      {
        'Invoice No': '',
        'Date': '',
        'Customer Name': '',
        'Phone No': 'Grand Total',
        'Total': totalAmount
      }
    ], { skipHeader: true, origin: -1 });

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Invoice summary.xlsx');
  });
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

  pageSize: number = 15;
  currentPage: number = 1;

  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.datalist.slice(startIndex, endIndex);
  }



  nextPage() {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
    }
  }


  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  totalPages() {
    return Math.ceil(this.datalist.length / this.pageSize);
  }
  pageNumbers() {
    const pages = [];
    for (let i = 1; i <= this.totalPages(); i++) {
      pages.push(i);
    }
    return pages;
  }
  lastPage() {
    this.currentPage = this.totalPages();
  }

  firstPage() {
    this.currentPage = 1;
  }

  goToPage(page: number) {
    this.currentPage = page;
  }
  visiblePages(): number[] {
    const total = this.totalPages();
    const current = this.currentPage;

    // Display 5 pages at a time
    const startPage = Math.max(current - 2, 1);
    const endPage = Math.min(startPage + 4, total);

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }

  pay(e:any){
    this.selectpaymode=e.target.value;
    // this.list();
    // console.log(this.selectpaymode);

  }


servebill(){
  this.router.navigate(['service_bill'])
}
probill(){
  this.router.navigate(['product_bill'])
}
  delete(servelist:any){
if(servelist.invoice_no.startsWith('PINV')){
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
      invoice_no: servelist.invoice_no,
      createdAt: servelist.createdAt,
      customer_name: servelist.customer_name,
      customer_phone:servelist.customer_phone
    };

    const idData = {
      _id:servelist._id
    };
    const url = idData._id;


    this.data.deleteprobill(url, serviceData).subscribe(
      (result) => {
        Swal.fire({
          title: "Deleted",
          text: "Product report has been deleted",
          icon: "success"
        })
        // alert("product deleted successfully")
        // this.route.navigate(['prorep'])
        .then(()=>{
          window.location.reload();
        })

        },


      (error) => {
        console.error('Error updating service:', error);

      }
    );
  }
});
  }
else if(servelist.invoice_no.startsWith('SINV')){
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
      invoice_no: servelist.invoice_no,
      createdAt: servelist.createdAt,
      customer_name: servelist.customer_name,
      customer_phone:servelist.customer_phone
    };

    const idData = {
      _id:servelist._id
    };


    const url =idData._id;


    this.data.deleteservicebill(url, serviceData).subscribe(
      (result) => {
        Swal.fire({
          title: "Deleted",
          text: "Service report has been deleted",
          icon: "success"
        })
        // alert("service deleted successfully")
        // this.router.navigate(['servreport'])
        .then(()=>{
          window.location.reload();
        })

        },


      (error) => {
        console.error('Error updating service:', error);

      }
    );
      }
  })
}
  }
  }


