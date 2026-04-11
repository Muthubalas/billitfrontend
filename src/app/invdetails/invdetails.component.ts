import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataService } from '../data.service';
import { DatePipe } from '@angular/common';
import jspdf from 'jspdf';
import { jsPDF } from 'jspdf';
import * as FileSaver from 'file-saver';
// import * as html2pdf from 'html2pdf.js';

import html2canvas from 'html2canvas';
import 'jspdf-autotable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../auth.service';
import { EditprofileComponent } from '../editprofile/editprofile.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-invdetails',
  templateUrl: './invdetails.component.html',
  styleUrls: ['./invdetails.component.css'],
  providers: [DatePipe],
})
export class InvdetailsComponent implements OnInit {
  product: any;
  row: any;
  pro: any = [];
  fileName = 'export-list.xlsx';
  // formattedDate: string = '';
  from: any;
  html2pdf: any;
  to: any;
  arr: any = [];
  dateObject1: any;
  formattedDate: any;
  formattedtime: any;
  formattedTime: any;
  proname: any;
  table: any;
  invoice: any;
  gst: any;
  roundgst: any;
  datey: any;
  a: any;
  quantity: any;
  pname: any;
  prate: any;
  pqua: any;
  pamount: any;
  dis: any;
  noDataAvailable: any;
  pdfUrl: any;
  totalcount: any;
  totalsum: any;
  totalsum1: any;
  totalsum2: any;
  totalsum3: any;
  count: any;
  itemName: any;
  invoice_no:any;
  pros: any;
  exp: boolean = false;
  datalist: any[] = [];
  datalist1: any[] = [];
  formattedDatey: any;
  formattedDatey1: any;
  inv: any;
  staffname: any;
  customername: any;
  phoneNo: any;
  paymode: any;
  selectpaymode: any;

  procat: any;
  pcost: any;
  procato: any;
  separatedDateTime: string = '';
  originalDataList: any[] = [];
  token: any;
  profilerole: any;
  helper = new JwtHelperService();
  profile: any;
  role: any;
  productname: any;
  selectedStaff: any;
  getstafflist: any[] = [];
  selectedInvoiceType: any;
  servname: any;
  tmpcount: any;
  tmpsercount: any;
  gstrate: any;
  tmpser1count: any;
  productAmountWithGST: any;
  serviceAmountWithGST: any;
  totalAmount: any;
  tot: any;
  totpro: any;
  totalamountexcel: any;

  constructor(
    private data: DataService,
    public datePipe: DatePipe,
    private route: Router,
    private router: Router,
    private auth: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getstaff();
    this.getinvlist();
    this.list();
    this.token = localStorage.getItem('token');
    let decodetoken = this.helper.decodeToken(this.token);
    this.role = decodetoken.role;
    if (decodetoken.role == '0') {
      this.profilerole = 'Admin';
    } else {
      this.profilerole = 'Manager';
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

  generate() {
    const doc = new jspdf();
    let content = `<table>
    <tr>
    <th></th>
    <th></th>
    <th></th>
    </tr>
    <th></th>
    <th></th>
    <th></th>
    <tr>
    </tr>`;
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
    FileSaver.saveAs(pdf, 'output.pdf');
  }
  getinvlist() {
    this.data.getreports().subscribe((result: any) => {
      this.originalDataList = result.sortedArray;

      this.applyFilters();
      this.totalsum = 0;
      this.totalsum1 = 0;
      this.totalsum2 = 0;
      this.totalsum3 = 0;
      this.totalAmount = 0;
      this.count = 0;
    });
  }
  list() {
    this.applyFilters();
  }
  filteredData: any[] = [];

  applyFilters() {
    this.datalist = this.originalDataList.filter((item) => {
      const trimmedProductName = this.itemName ? this.itemName.trim() : '';
      const trimmedStaffName = this.staffname ? this.staffname.trim() : '';
      const trimmedCustomerName = this.customername
        ? this.customername.trim()
        : '';
      const trimmedPhoneNo = this.phoneNo ? this.phoneNo.trim() : '';
      const trimmedInvoiceNo = this.inv ? this.inv.trim() : '';
      this.itemName = this.itemName ? this.itemName.trim() : '';
      this.customername = this.customername ? this.customername.trim() : '';
      this.phoneNo = this.phoneNo ? this.phoneNo.trim() : '';
      this.inv = this.inv ? this.inv.trim() : '';
      const trimmedSelectedInvoiceType = this.selectedInvoiceType
        ? this.selectedInvoiceType.trim()
        : '';
      const dateCondition = item.date;
      // const dateCondition = new Date(item.createdAt).toISOString().split('T')[0];
      const from = this.from;
      const to = this.to;
      const prodname =
        !this.productname ||
        (item.product_details &&
          item.product_details.some(
            (product: any) =>
              product.Product_name &&
              product.Product_name.toLowerCase().startsWith(
                this.productname.toLowerCase()
              )
          ));
      const servname =
        !this.servname ||
        (item.service_details &&
          item.service_details.some(
            (product: any) =>
              product.service_name &&
              product.service_name
                .toLowerCase()
                .startsWith(this.servname.toLowerCase())
          ));
      const itemName =
        !this.itemName ||
        (item.product_details &&
          item.product_details.some(
            (product: any) =>
              product.Product_name &&
              product.Product_name.toLowerCase().startsWith(
                this.itemName.toLowerCase()
              )
          )) ||
        (item.service_details &&
          item.service_details.some(
            (detail: any) =>
              detail.service_name &&
              detail.service_name
                .toLowerCase()
                .startsWith(this.itemName.toLowerCase())
          ));
const empty="";
      const invoiceCondition =
        !this.inv ||
        item.invoice_no.toLowerCase().startsWith(this.inv.toLowerCase());
      const paymode =
        !this.selectpaymode ||
        (item.payment_mode &&
          item.payment_mode
            .toLowerCase()
            .includes(this.selectpaymode.toLowerCase()));
      const customer =
        !this.customername ||
        item.customer_name
          .toLowerCase()
          .startsWith(this.customername.toLowerCase());
      const custonum =
        !this.phoneNo ||
        item.customer_phone
          .toLowerCase()
          .startsWith(this.phoneNo.toLowerCase());
      const staffCondition =
        !this.staffname ||
        (item.product_details &&
          item.product_details.some(
            (product: any) =>
              product.staffname &&
              product.staffname.toLowerCase() === this.staffname.toLowerCase()
          )) ||
        (item.service_details &&
          item.service_details.some(
            (detail: any) =>
              detail.staffname &&
              detail.staffname.toLowerCase() === this.staffname.toLowerCase()
          ));

      if (this.selectedInvoiceType) {
        const isService = this.selectedInvoiceType === 'Service';
        const isProduct = this.selectedInvoiceType === 'Product';

        const invoiceTypeCondition = isService
          ? item.invoice_no.toLowerCase().startsWith('sinv')
          : isProduct && item.invoice_no.toLowerCase().startsWith('pinv');
        return (
          (!from || dateCondition >= from) &&
          (!to || dateCondition <= to) &&
          invoiceCondition &&
          staffCondition &&
          customer &&
          custonum &&
          paymode &&
          prodname &&
          servname &&
          itemName &&
          invoiceTypeCondition
        );
      } else {
        return (
          (!from || dateCondition >= from) &&
          (!to || dateCondition <= to) &&
          invoiceCondition &&
          staffCondition &&
          customer &&
          custonum &&
          paymode &&
          prodname &&
          servname &&
          itemName
        );
      }
    });
    this.calculateTotalAmount();
    this.currentPage = 1;
  }
  calculateTotalAmount() {
    let totalSum = 0;
    let totalSum1 = 0;
    let totalSum2 = 0;
    let totalSum3 = 0;
    let totalAmount1 = 0;
    let totalAmount2 = 0;
    let totalcount = 0;
    let serialNumber = 1;
    let serviceCount = 0;

    this.totalsum = 0;
    this.totalsum1 = 0;
    this.totalsum2 = 0;
    this.totalsum3 = 0;
    this.totalcount = 0;

    for (const entry of this.datalist) {
      this.gstrate = Math.round((entry.gst / entry.sub_total) * 100);
      if (entry.service_details && entry.service_details.length > 0) {
        for (const service of entry.service_details) {
          
          if (
            (!this.staffname ||
              service.staffname?.toLowerCase() ===
                this.staffname.toLowerCase()) &&
            (!this.itemName ||
              service.service_name
                ?.toLowerCase()
                .startsWith(this.itemName.toLowerCase()))
          ) {
            const serviceAmountWithGST =
              parseFloat(service.amount) +
              (parseFloat(service.amount) * this.gstrate) / 100;

            this.tot = serviceAmountWithGST;

            // if (entry.payment_mode === "Cash") {
            //   totalSum += parseFloat(this.tot);
            //   this.totalsum = totalSum;
            // } else if (entry.payment_mode === "Card") {
            //   totalSum1 += parseFloat(this.tot);
            //   this.totalsum1 = totalSum1;
            // } else if (entry.payment_mode === "UPI") {
            //   totalSum2 += parseFloat(this.tot);
            //   this.totalsum2 = totalSum2;
            // } else if (entry.payment_mode === "cash and upi") {
            //   totalSum3 += parseFloat(this.tot);
            //   this.totalsum3 = totalSum3;
            // }
          }
        }
      }
      if (entry.product_details && entry.product_details.length > 0) {
        for (const product of entry.product_details) {
          if (
            (!this.staffname ||
              product.staffname?.toLowerCase() ===
                this.staffname.toLowerCase()) &&
            (!this.itemName ||
              product.service_name
                ?.toLowerCase()
                .startsWith(this.itemName.toLowerCase()))
          ) {
            const serviceAmountWithGST1 =
              parseFloat(product.amount) +
              (parseFloat(product.amount) * this.gstrate) / 100;

            this.totpro = serviceAmountWithGST1;

            // if (entry.payment_mode === "Cash") {
            //   totalSum += parseFloat(this.totpro);
            //   this.totalsum = totalSum;
            // } else if (entry.payment_mode === "Card") {
            //   totalSum1 += parseFloat(this.totpro);
            //   this.totalsum1 = totalSum1;
            // } else if (entry.payment_mode === "UPI") {
            //   totalSum2 += parseFloat(this.totpro);
            //   this.totalsum2 = totalSum2;
            // } else if (entry.payment_mode === "cash and upi") {
            //   totalSum3 += parseFloat(this.totpro);
            //   this.totalsum3 = totalSum3;
            // }
          }
        }
      }
    }

    if (this.datalist.length === 0 || this.selectpaymode === '') {
      this.totalsum = 0;
      this.totalsum1 = 0;
      this.totalsum2 = 0;
      this.totalsum3 = 0;
      this.count = 0;
      this.totalAmount = 0;
    } else {
      for (const entry of this.datalist) {
        this.gstrate = Math.round((entry.gst / entry.sub_total) * 100);
        if (this.selectpaymode === entry.payment_mode) {
          if (entry.service_details && entry.service_details.length > 0) {
            for (const service of entry.service_details) {
              const serviceAmountWithGST =
                parseFloat(service.amount) +
                (parseFloat(service.amount) * this.gstrate) / 100;

              this.tot = serviceAmountWithGST;
              switch (this.selectpaymode) {
                case 'Cash':
                  totalSum += parseFloat(this.tot);
                  this.totalsum = totalSum.toFixed(2);
                  break;
                case 'Card':
                  totalSum1 += parseFloat(this.tot);
                  this.totalsum1 = totalSum1.toFixed(2);
                  break;
                case 'UPI':
                  totalSum2 += parseFloat(this.tot);
                  this.totalsum2 = totalSum2.toFixed(2);
                  break;
                case 'cash and upi':
                  if(entry.invoice_no == this.invoice_no){
                    if (!isNaN(parseFloat(entry.cash_amount))) {
                      totalSum += parseFloat(entry.cash_amount);
                    }
  
                    this.totalsum = totalSum.toFixed(2);
                    if (!isNaN(parseFloat(entry.UPI_amount))) {
                      totalSum2 += parseFloat(entry.UPI_amount);
                    }
                    this.totalsum2 = totalSum2.toFixed(2);
                  }
            
                  // totalSum3 += parseFloat(this.tot);
                  // this.totalsum3 = totalSum3;
                  break;
              }
            }
          }
        }
      }

    
      for (const entry of this.datalist) {
        this.gstrate = Math.round((entry.gst / entry.sub_total) * 100);
        let hasProcessedCashAndUpi = false;
        // Process service details
        if (entry.service_details && entry.service_details.length > 0) {
            for (const service of entry.service_details) {
                if (
                    (!this.staffname || service.staffname?.toLowerCase() === this.staffname.toLowerCase()) &&
                    (!this.itemName || service.service_name?.toLowerCase().startsWith(this.itemName.toLowerCase()))
                ) {
                    service.serialNumber = serialNumber;
                    const serviceAmountWithGST = parseFloat(service.amount) + (parseFloat(service.amount) * this.gstrate) / 100;
                    this.totpro = serviceAmountWithGST;
                    service.serviceAmountWithGST = serviceAmountWithGST;
                    totalAmount1 += serviceAmountWithGST;
                    service.gstrate = this.gstrate;
                    this.serviceAmountWithGST = totalAmount1;
    
                    if (entry.payment_mode === 'Cash') {
                        totalSum += serviceAmountWithGST;
                        console.log(`Cash ${totalSum}`);
                    } else if (entry.payment_mode === 'Card') {
                        totalSum1 += serviceAmountWithGST;
                    } else if (entry.payment_mode === 'UPI') {
                        totalSum2 += serviceAmountWithGST;
                    } else if (entry.payment_mode === 'cash and upi' && !hasProcessedCashAndUpi) {
                      hasProcessedCashAndUpi = true;
                        if (!isNaN(parseFloat(entry.cash_amount))) {
                          console.log(`Initial totalSum: ${totalSum}, totalSum2: ${totalSum2}`);
                            totalSum += parseFloat(entry.cash_amount);
                            console.log(`CU-----cash ${totalSum}`);
                        }
                        if (!isNaN(parseFloat(entry.UPI_amount))) {
                            totalSum2 += parseFloat(entry.UPI_amount);
                            console.log(`CU-----UPI ${totalSum2}`);
                        }
                    }
                    serialNumber++;
                    serviceCount++;
                }
            }
        }
    
        // Process product details
        if (entry.product_details && entry.product_details.length > 0) {
            for (const product of entry.product_details) {
                if (
                    (!this.staffname || product.staffname?.toLowerCase() === this.staffname.toLowerCase()) &&
                    (!this.itemName || product.Product_name?.toLowerCase().startsWith(this.itemName.toLowerCase()))
                ) {
                    product.serialNumber = serialNumber;
                    const productAmountWithGST = parseFloat(product.amount) + (parseFloat(product.amount) * this.gstrate) / 100;
                    this.tot = productAmountWithGST;
                    product.productAmountWithGST = productAmountWithGST;
                    totalAmount2 += productAmountWithGST;
                    product.gstrate = this.gstrate;
                    this.productAmountWithGST = totalAmount2;
    
                    if (entry.payment_mode === 'Cash') {
                        totalSum += productAmountWithGST;
                    } else if (entry.payment_mode === 'Card') {
                        totalSum1 += productAmountWithGST;
                    } else if (entry.payment_mode === 'UPI') {
                        totalSum2 += productAmountWithGST;
                    } else if (entry.payment_mode === 'cash and upi' && !hasProcessedCashAndUpi) {
                      hasProcessedCashAndUpi = true;
                        if (!isNaN(parseFloat(entry.cash_amount))) {
                            totalSum += parseFloat(entry.cash_amount);
                        }
                        if (!isNaN(parseFloat(entry.UPI_amount))) {
                            totalSum2 += parseFloat(entry.UPI_amount);
                        }
                    }
                    serialNumber++;
                    serviceCount++;
                }
            }
        }
    
        // Update totals after processing all details
        this.totalsum = totalSum.toFixed(2);
        this.totalsum1 = totalSum1.toFixed(2);
        this.totalsum2 = totalSum2.toFixed(2);
        this.serviceAmountWithGST = totalAmount1;
        this.productAmountWithGST = totalAmount2;
    }
    
      this.count = serviceCount;
      

      this.totalAmount = totalAmount1 + totalAmount2;
      this.totalAmount = this.totalAmount.toFixed(2);
      this.totalamountexcel = totalAmount1 + totalAmount2;
    }
  }

  updatepro(inv1: any) {
    this.route.navigate(['updateprorep']);
    this.data.selectedInvoice1 = inv1;
  }
  updateservice(inv: any) {
    this.route.navigate(['up']);
    this.data.selectedInvoice = inv;
    // console.log(this.data.selectedInvoice);
  }
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  getProductNames(inv: any): string {
    return inv.product_details
      .map((product: any) => product.Product_name)
      .join('/');
  }

  getStaffNames(inv: any): string {
    return inv.product_details
      .map((product: any) => product.staffname)
      .join('/');
  }

  isOpen1: boolean = false;

  toggleSidebar1() {
    this.isOpen1 = !this.isOpen1;
  }
  printInvoice(invoice: any) {
    // this.separateDateAndTime();
    this.dateObject1 = new Date(invoice.createdAt);
    const customer = document.getElementById('custSpan') as HTMLInputElement;
    customer.innerText = invoice.customer_name;
    const createdAtDate = new Date(invoice.createdAt);
    const day = createdAtDate.getDate().toString().padStart(2, '0');
    const month = (createdAtDate.getMonth() + 1).toString().padStart(2, '0');
    const year = createdAtDate.getFullYear().toString();

    const datePart = `${day}-${month}-${year}`; // dd-mm-yyyy format
    const timePart = createdAtDate.toLocaleTimeString(); // Extracts the time part

    const pay = document.getElementById('dtSpan') as HTMLInputElement;
    pay.innerText = ` ${datePart}     ${timePart}`;
    // const pay= document.getElementById("dtSpan") as HTMLInputElement;
    // pay.innerText=this.formattedDate+'  '+this.formattedtime;
    this.formattedDate = this.dateObject1.toISOString().split('T')[0];

    // Format time
    this.formattedtime = this.dateObject1
      .toISOString()
      .split('T')[1]
      .split('.')[0];
    this.datey = invoice.date;
    this.pro = invoice.product_details;
    // this.dis=invoice.discount
    // console.log(this.dis);

    let proarr = [];

    for (let i = 0; i < this.pro.length; i++) {
      this.pname = this.pro[i].Product_name;
      this.pcost = this.pro[i].Product_price;
      this.pqua = this.pro[i].quantity;
      this.pamount = this.pro[i].amount;
      this.procato = this.pro[i].Product_category;
      proarr.push({
        Product_name: this.pname,
        quantity: this.pqua,
        amount: this.pamount,
        price: this.pcost,
        productcat: this.procato,
      });

      const that: {
        proarr: Array<{
          Product_name: string;
          quantity: number;
          price: number;
          amount: number;
          productcat: string;
        }>;
      } = {
        proarr: [
          {
            Product_name: this.pname,
            quantity: this.pqua,
            amount: this.pamount,
            price: this.pcost,
            productcat: this.procato,
          },
          // Your item objects here
        ],
      };
      this.table = '';

      proarr.map((item) => {
        if (item.Product_name) {
          let row: string = '<tr>';
          row =
            row +
            `<td> ${item.Product_name}</td><td> ${item.productcat}</td><td>${item.price}</td><td>${item.quantity}</td><td>${item.amount}</td></tr>`;
          this.table = this.table + row;
        }
      });

      const tabledata = document.getElementById('tbody') as HTMLInputElement;
      tabledata.innerHTML = this.table;
    }

    // const qua= document.getElementById("tqtySpan") as HTMLInputElement;
    // qua.innerText=this.quantity;

    // const discountrate= document.getElementById("discountSpan") as HTMLInputElement;
    // discountrate.innerText=invoice.discount;

    //   const totalitem= document.getElementById("titemSpan") as HTMLInputElement;
    //   totalitem.innerText=invoice.totalItem

    // const totalquantity=  document.getElementById("tqtySpan")  as HTMLInputElement;
    // totalquantity.innerText=invoice.totalQuantity

    const mobile = document.getElementById('mobSpan') as HTMLInputElement;
    mobile.innerText = invoice.customer_phone;

    const gross = document.getElementById('grossSpan') as HTMLInputElement;
    gross.innerText = invoice.sub_total;

    const gst = document.getElementById('gstSpan') as HTMLInputElement;
    gst.innerText = invoice.gst;

    // this.roundgst=invoice.sgst+invoice.cgst
    // console.log(this.roundgst);

    const netamount = document.getElementById('netSpan') as HTMLInputElement;
    netamount.innerText = invoice.total;

    const invnum = document.getElementById('invNoSpan') as HTMLInputElement;
    invnum.innerText = invoice.invoice_no;
    const paymode = document.getElementById('paySpan') as HTMLInputElement;
    paymode.innerText = invoice.payment_mode;

    // console.log(this.product.name);

    const invoiceInput = document.getElementById(
      'print-space'
    ) as HTMLInputElement;

    const trail = document.getElementById('trail') as HTMLInputElement;
    invoiceInput.style.display = 'block';

    trail.style.visibility = 'hidden';

    window.print();

    invoiceInput.style.display = 'none';
    trail.style.visibility = 'visible';
  }
  @ViewChild('Record') Record!: ElementRef;

  exportToExcel(datalist: any[], fileName: string): void {
    const filteredData = datalist.flatMap((item, index) => {
      const date = new Date(item.createdAt);
      const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}-${date.getFullYear()}`;

      let serviceName = '';
      let serviceprice = '';
      let servgender = '';
      let staffname = '';
      let servdisc = '';
      let servquantity = '';
      let servamount = '';
      let servcat = '';

      if (item.product_details && item.product_details.length > 0) {
        serviceName = item.product_details
          .map((service: any) => service.Product_name)
          .join(', ');
        serviceprice = item.product_details
          .map((service: any) => service.Product_price)
          .join(', ');
        // servgender = item.product_details.map((service: any) => service.service_gender).join(', ');
        staffname = item.product_details
          .map((service: any) => service.staffname)
          .join(', ');
        servdisc = item.product_details
          .map((service: any) => service.discount)
          .join(', ');
        servquantity = item.product_details
          .map((service: any) => service.quantity)
          .join(', ');
        servamount = item.product_details
          .map((service: any) => service.amount)
          .join(', ');
        servcat = item.product_details
          .map((service: any) => service.Product_category)
          .join(', ');
      }

      return {
        Sno: index + 1,
        ID: item.invoice_no,
        'Customer Name': item.customer_name,
        PhoneNo: item.customer_phone,
        Paymode: item.payment_mode,
        'Product Name': serviceName,
        'Product Category': servcat,
        Staffname: staffname,
        // 'Gender':servgender,
        Cost: serviceprice,
        Quantity: servquantity,
        Discount: servdisc,
        Amount: servamount,
        'Sub Total': item.sub_total,
        GST: item.gst,
        Total: item.total,
        Date: formattedDate,
      };
    });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
  export() {
    this.exportToExcel(this.datalist, 'Product Report');
  }
  exportToExcel2(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
      document.getElementById('Record1')
    );
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    const totalSalesRow = [null, 'Grand Total:', this.totalamountexcel];

    const rowCount = ws['!ref']
      ? XLSX.utils.decode_range(ws['!ref']).e.r + 1
      : 0;
    // XLSX.utils.sheet_add_json(ws, [totalSalesRow], { skipHeader: true, origin: `G${rowCount + 2}`, });
    XLSX.utils.sheet_add_json(ws, [totalSalesRow], {
      skipHeader: true,
      origin: `N2`,
    });
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Save the file
    XLSX.writeFile(wb, 'Invoice Details.xlsx');
  }

  isDropdownOpen1 = false;

  toggleDropdown1() {
    this.isDropdownOpen1 = !this.isDropdownOpen1;
  }
  logout() {
    this.router.navigate(['login']);
    this.data.removeToken();
  }
  editprofile() {
    this.token = localStorage.getItem('token');
    let decodetoken = this.helper.decodeToken(this.token);
    this.data.findadminal(decodetoken.sub).subscribe((result) => {
      this.profile = result;

      this.dialog.open(EditprofileComponent, {
        width: '792px',
        height: '381px',
        data: this.profile.findadmin,
      });
    });
  }

  pageSize: number = 4;
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

  goToPage(page: number) {
    this.currentPage = page;
  }
  visiblePages(): number[] {
    const total = this.totalPages();
    const current = this.currentPage;

    // Display 5 pages at a time
    const startPage = Math.max(current - 2, 1);
    const endPage = Math.min(startPage + 4, total);

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }

  pay(e: any) {
    this.selectpaymode = e.target.value;
    // this.list();
    // console.log(this.selectpaymode);
  }

  servebill() {
    this.router.navigate(['service_bill']);
  }
  probill() {
    this.router.navigate(['product_bill']);
  }

  getstaff() {
    return this.data.getstaff().subscribe((result: any) => {
      this.getstafflist = result.liststaff;
    });
  }
}
