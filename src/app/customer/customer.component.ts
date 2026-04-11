import { Component, OnInit,ViewChild,ElementRef,Input } from '@angular/core';
import { DataService } from '../data.service';
import { MatDialog } from '@angular/material/dialog';
import { AddcustomerComponent } from '../addcustomer/addcustomer.component';
import { UpdcustomerComponent } from '../updcustomer/updcustomer.component';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as XLSX from 'xlsx'
import 'jspdf-autotable';
import { HttpClient } from '@angular/common/http';
import * as Papa from 'papaparse';
import Swal from 'sweetalert2';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../auth.service';
import { EditprofileComponent } from '../editprofile/editprofile.component';
import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
interface Service {
  customer_id: number;
  customer_name: string;
  customer_phone: number;
  address:string;
  service_category: string;
  date:string;
  membership_no:string;
}
interface ServiceDetail {
  service_name: string;
  service_gender: string;
  staffname: string;
  quantity:number;
  service_price: string;
  amount:number;
  discount:number;
}
interface ProductDetail {
  Product_name: string;
  Product_category: string;
  staffname: string;
  Product_price:number;
  Product_id: string;
  quantity:number;
  amount:number;
  discount:number;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [DatePipe],

})
export class CustomerComponent implements OnInit {
  exp:boolean=false;
  // showCommonDesign:boolean=true;
 customerName: string = '';
  customerPhone: string = '';
  customerWithHistory: { [key: string]: boolean } = {};
  fileName="customerlist.xlsx"
  getcus: any;
  servdetail:any;
  proddetail:any;
  profilerole: any;
  token: any;
  helper=new JwtHelperService();
  profile: any;
  userRole: any;
  // endpoint="http://localhost:2002"
  constructor(private data:DataService,private dialog:MatDialog,private router:Router,public datePipe: DatePipe,private snackBar: MatSnackBar,
    private http:HttpClient,private auth:AuthService,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.checkCustomerHistory();
    this.token=localStorage.getItem('token')
    let decodetoken=this.helper.decodeToken(this.token)
this.userRole=decodetoken.role
    if(decodetoken.role=="0"){
      this.profilerole="Admin"
    }
    else{
      this.profilerole="Manager"
    }
    this.getcuslist()
  }
  @Input() sideNavOpen: boolean = false;


  // sideNavOpen: boolean = false;

  toggleSideNav() {
    this.sideNavOpen = !this.sideNavOpen;
  }
  open() {
    this.exp = !this.exp;
  }
  getcuslist(){
    return this.data.getcus().subscribe((result:any)=>{
      this.getcus=result.listuser;
      // customer_name
      // customer_phone
      // date
      // membership_no
    })
   }
   add(){
    this.dialog.open(AddcustomerComponent,{
      width:'792.336px',
  height: '526.996px',
    })
}
updatecustomer(list:any){

  this.dialog.open(UpdcustomerComponent,{
    width:'792.336px',
height: '526.996px',
data:list
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
isDropdownOpen = false;

toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
}

onFileSelected(event: any) {
  const file: File = event.target.files[0];

  if (file) {
    this.uploadFile(file);
  }
}
trackByFn(index: number, item: any): any {
  return item.customer_id; // Use a unique identifier for your items
}

someMethod() {
  // Your logic here
  this.cdr.detectChanges();
}

uploadFile(file: File) {
  const formData = new FormData();
  formData.append('image', file, file.name);

  this.http.post('https://new-billit.marvelsalon.in/csvupload', formData).subscribe(
    (response) => {
      Swal.fire({
        title: 'Success',
        text: 'File uploaded',
        icon: 'success',
        confirmButtonText: 'OK'
      })
    },
    (error) => {
      // Log more details about the error
      Swal.fire({
        title: 'Error',
        text: 'Failed to upload file',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  );
}
downloadExcelFile() {
  const fileURL = 'assets/Untitled spreadsheet - Sheet1 (1).csv'; // Replace 'your_excel_file.xlsx' with your file name
  this.http.get(fileURL, { responseType: 'blob' }).subscribe((data: Blob) => {
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(new Blob([data]));
    downloadLink.setAttribute('download', 'downloaded_excel_file.csv'); // Rename the downloaded file if needed
    document.body.appendChild(downloadLink);
    downloadLink.click();
  });
}
deletecustomer(list:any){
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

  const custoData = {
    customer_id: list.customer_id,
    customer_name: list.customer_name,
    customer_phone: list.customer_phone,
    address:list.address,
    membership_no:list.membership_no,
    date:list.date
  };

  const idData = {
    _id:list._id
  };


  const url =idData._id


  this.data.deletecustomer(url, custoData).subscribe(
    (result) => {
      Swal.fire({
        title: "Deleted",
        text: "Customer has been deleted",
        icon: "success"
      })
      // alert("Customer data deleted successfully")
      // this.router.navigate(['customer'])
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

// Add this method to check if a customer has history
checkCustomerHistory() {
  this.data.getreports().subscribe(
    (result: any) => {
      console.log("checkCustomerHistory",result);
      
      if (result && result.sortedArray && Array.isArray(result.sortedArray)) {
        // Process each customer in your list
        if (!this.getcus || !Array.isArray(this.getcus)) {
          console.error("this.getcus is not initialized or not an array", this.getcus);
          return;
        }
        this.getcus.forEach((customer: any) => {
          const phone = customer.customer_phone;
          const filteredEntries = result.sortedArray.filter((entry: any) => entry.customer_phone === phone);
          
          // Check if customer has any service or product history
          const hasHistory = filteredEntries.some((entry:any) => 
            (entry.service_details && entry.service_details.length > 0) || 
            (entry.product_details && entry.product_details.length > 0)
          );
          
          // Store the result
          this.customerWithHistory[phone] = hasHistory;
        });
      }
    },
    (error) => {
      console.error("Error checking customer history:", error);
    }
  );
}
viewlist(list:any){
  let phone=list.customer_phone;
  let name=list.customer_name;
  console.log("phone number",phone);
  console.log("name",name);
  this.data.getreports().subscribe(
    (result:any)=>{
      console.log(result);
      if(result && result.sortedArray  && Array.isArray(result.sortedArray)){
        const filteredEntries =result.sortedArray.filter((entry:any)=>entry.customer_phone===phone);
        if(filteredEntries.length>0){
          console.log("filteredEntries",filteredEntries);
          const serviceDetails: ServiceDetail[] = [];
          const productDetails: ProductDetail[] = [];
          filteredEntries.forEach((entry:any)=>{
            if (entry.service_details && Array.isArray(entry.service_details)) {
              entry.service_details.forEach((service: any) => {
                service.date = entry.date; // using the parent's date field
              });
              serviceDetails.push(...entry.service_details);
            }
            console.log("serviceDetails",serviceDetails);

            
            if (entry.product_details && Array.isArray(entry.product_details)) {
              entry.product_details.forEach((product: any) => {
                product.date = entry.date; // using the parent's date field
              });
              productDetails.push(...entry.product_details);
            }
            console.log("productDetails",productDetails);
          });
          this.generatesPDF(name, phone, serviceDetails, productDetails);
          
        } else {
          this.showPopup("No entries found for the provided phone number.");
        }
      } else {
        this.showPopup("Invalid API response structure.");
      }
    },
    (error) => {
      this.showPopup("Error fetching reports.");
        console.error("Error fetching reports:", error);
    }
  );
}
showPopup(message: string) {
  this.snackBar.open(message, 'Close', {
    duration: 3000, // 3 seconds
    verticalPosition: 'bottom',
    horizontalPosition: 'center',
  });
}


generatesPDF(name: string, phone: string,serviceDetails: any[] = [], productDetails: any[] = []) {
  const pdf = new jsPDF();

  // Add customer details at the top
  pdf.setFontSize(18);
  pdf.text(`Customer Name: ${name || "N/A"}`, 14, 20);
  pdf.text(`Customer Phone: ${phone || "N/A"}`, 14, 30);

  let startY = 50; // Initial Y position for tables
  let contentAdded = false; // To check if any content is added

  // ✅ Ensure serviceDetails is always an array
  if (Array.isArray(serviceDetails) && serviceDetails.length > 0) {
    pdf.setFontSize(14);
    pdf.text("Service Details", 14, startY);

    const serviceTableData = serviceDetails.map((service,index) => [
      index + 1,
      service.date ? new Date(service.date).toLocaleDateString("en-GB") : "N/A",
      service.service_name || "N/A",
      service.service_gender || "N/A",
      service.staffname || "N/A",
      service.quantity || "N/A",
      service.service_price || "N/A",
    ]);
    const totalamnt=serviceDetails.reduce((sum,total)=>sum+Number(total.service_price),0);
    console.log("totalamnt",totalamnt);
    (pdf as any).autoTable({
      head: [['S.No','Date','Service Name', 'Gender', 'Staff Name', 'Quantity', 'Price']],
      body: serviceTableData,
      startY: startY + 5,
      didDrawPage: (data: any) => {
        pdf.text(`Total Service Amount: ${totalamnt}`, 14, data.cursor.y + 10);
      },

    });


    startY = (pdf as any).lastAutoTable.finalY + 15;
    contentAdded = true;
  } else {
    pdf.setFontSize(12);
    pdf.text("No service details available.", 14, startY);
    startY += 10;
  }

  // ✅ Ensure productDetails is always an array
  if (Array.isArray(productDetails) && productDetails.length > 0) {
    pdf.setFontSize(14);
    pdf.text("Product Details", 14, startY+10);

    const productTableData = productDetails.map((product,index) => [
      index+1,
      product.date ? new Date(product.date).toLocaleDateString("en-GB") : "N/A",
      product.Product_name || "N/A",
      product.Product_category || "N/A",
      product.staffname || "N/A",
      product.Product_price || "N/A",
      product.Product_id || "N/A",
      product.discount || "N/A",
      product.quantity || "N/A",
      product.amount || "N/A",
    ]);
    const totalprodamnt=productDetails.reduce((sum,total)=>sum+Number(total.Product_price),0);
    console.log("totalprodamnt",totalprodamnt);
    (pdf as any).autoTable({
      head: [['S.No','Date','Product Name', 'Category', 'Staff Name', 'Price', 'Product ID', 'Discount', 'Quantity', 'Amount']],
      body: productTableData,
      startY: startY + 15,
      didDrawPage: (data: any) => {
        pdf.text(`Total Product Amount: ${totalprodamnt}`, 14, data.cursor.y + 18);
      },

    });
  
    contentAdded = true;
  } else {
    pdf.setFontSize(12);
    pdf.text("No product details available.", 14, startY+10);
  }

  // If no service or product details were added, still generate the PDF
  if (!contentAdded) {
    pdf.text("No service or product details available for this customer.", 14, startY + 10);
  }

  // ✅ Open the PDF in a new tab instead of downloading
  const pdfBlob = pdf.output('blob');
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, '_blank'); // Opens in a new tab
}




searchTerm: string = '';
currentPage: number = 1;
itemsPerPage: number = 10;
currentFilteredPage: number = 1;


get filteredPeople() {
  const startIndex = (this.currentFilteredPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;

  const searchTermLowerCase = this.searchTerm?.trim().toLowerCase() || ''; // Ensure no null/undefined for searchTerm

  const filteredData = this.getcus.filter((service: any) => {
    const formattedDate = this.datePipe.transform(service.createdAt, 'dd-MM-yyyy') || '';
    const formattedMembershipNo = service.membership_no?.trim().toLowerCase() || '';
    const customerName = service.customer_name?.toLowerCase() || '';
    const customerGender = service.gender?.toLowerCase() || '';
    const customerPhone = service.customer_phone?.toString() || '';
    const address = service.address?.toString().toLowerCase() || '';
    const customerId = service.customer_id?.toLowerCase() || '';

    return (
      formattedDate.includes(searchTermLowerCase) ||
      customerName.startsWith(searchTermLowerCase) ||
      customerPhone.startsWith(searchTermLowerCase) ||
      address.startsWith(searchTermLowerCase) ||
      customerId.startsWith(searchTermLowerCase) ||
      customerGender.startsWith(searchTermLowerCase) ||
      formattedMembershipNo.startsWith(searchTermLowerCase)
    );
  });

  return filteredData.slice(startIndex, endIndex);
}

onPageChange(page: number): void {
  this.currentFilteredPage = page;
}

onFilterChange(): void {
  // Reset to the first page when the filter changes
  this.currentFilteredPage = 1;
}



calculateIndex(index: number): number {
  return (this.currentFilteredPage - 1) * this.itemsPerPage + index + 1;
}

get totalPages(): number {
  return Math.ceil(
    (this.searchTerm
      ? this.getcus.filter((service: Service) =>
        service.customer_name.toLowerCase().includes(this.searchTerm.toLowerCase())
      ).length
      : this.getcus.length) / this.itemsPerPage
  );
}

totalPagesArray(): number[] {
  const visiblePages = 3; // Number of pages to display

  if (this.totalPages <= visiblePages) {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  const startPage = Math.max(1, this.currentFilteredPage - Math.floor(visiblePages / 2));
  const endPage = Math.min(this.totalPages, startPage + visiblePages - 1);

  return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
}

showPrevious(): boolean {
  return this.currentFilteredPage > 1;
}

showNext(): boolean {
  return this.currentFilteredPage < this.totalPages;
}

// onPageChange(page: number): void {
//   this.currentPage = page;
// }

onPrevious1(): void {
  if (this.showPrevious()) {
    this.currentFilteredPage = 1; // Reset to first page
  }
}

onPrevious(): void {
  if (this.showPrevious()) {
    this.currentFilteredPage--;
  }
}

onNext(): void {
  if (this.showNext()) {
    this.currentFilteredPage++;
  }
}
onLastPage(): void {
  if (this.showNext()) {
    this.currentFilteredPage = this.totalPages;
  }
}
exporttoxlx1(): void {
  // const selectedFields = this.getcus.map((service: Service,index:number) => ({
  //   'S No':index+1,
  //   'Customer ID': service.customer_id,
  //   'Date': service.date,
  //   'Customer Name': service.customer_name,
  //   'Phone No': service.customer_phone,
  //   'Membership ID': service.membership_no,
  // }));

  // const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(#Record);
  // const wb: XLSX.WorkBook = XLSX.utils.book_new();
  // XLSX.utils.book_append_sheet(wb, ws, 'sheet1');
  // XLSX.writeFile(wb, this.fileName);
  const fileName = 'exported_data.xlsx';

  /* Table id is passed over here */
  let element = document.getElementById('Record');
  const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

  /* Generate workbook and add the worksheet */
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  /* Save to file */
  XLSX.writeFile(wb, fileName);
}

exporttoxlx(): void {
  const fileName = 'Customer list.xlsx';

  let element = document.getElementById('Record');

  if (element) {

    let clonedElement = element.cloneNode(true) as HTMLElement;

    clonedElement.querySelectorAll('td:nth-child(8),th:nth-child(8)').forEach(el => el.remove());

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(clonedElement);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, fileName);
  }
}

@ViewChild('Record') Record!: ElementRef;


generatePDF(): void {
  const originalTable = this.Record.nativeElement;


  const clonedTable = originalTable.cloneNode(true) as HTMLTableElement;

  const exportButton = clonedTable.querySelector('button');
  if (exportButton) {
    exportButton.remove();
  }

  const images = clonedTable.querySelectorAll('img');
  images.forEach(img => img.remove());

  document.body.appendChild(clonedTable);

  const doc = new jsPDF();


  html2canvas(clonedTable).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;


    document.body.removeChild(clonedTable);

    doc.addImage(imgData, 'PNG', 15, 15, imgWidth, imgHeight);

    doc.save('serviceinvoice.pdf');
  });
}
servebill(){
  this.router.navigate(['service_bill'])
}
probill(){
  this.router.navigate(['product_bill'])
}







}
