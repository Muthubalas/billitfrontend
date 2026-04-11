import { Component, OnInit,ViewChild,Input,ElementRef,AfterViewInit } from '@angular/core';

import { DataService } from '../data.service';
import {  registerables } from 'chart.js';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../auth.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { EditprofileComponent } from '../editprofile/editprofile.component';
import { MatDialog } from '@angular/material/dialog';
// import html2pdf from 'html2pdf.js';
interface DateObject {
  [key: string]: string | undefined;
}
interface MonthlyData {
  [key: string]: number | undefined;
}
// import * as html2pdf from 'html2pdf.js'; // Importing as any
interface SaleData {
  type: string;
  data: {
    createdAt: string;
    total: string;
  }[];
}

interface HourlyData {
  hour: number;
  amount: number;
}
declare const Chart: any;
interface CustomerData {
  male: number;
  female: number;
}
interface BillItem {
  createdAt: string;
  customer_name: string;
  customer_phone: string;
  invoice_no:string;
  service_gender:string;
  service_price:string;
  // discount:string;

  type: string;
  total:string;
  gst:string;
  sub_total:string;
  payment_mode:string;
}
interface BillItem1 {
  createdAt: string;
  customer_name: string;
  customer_phone: string;
  invoice_no:string;
  Product_name:string;
  Product_category:string;
  // discount:string;
  table: any;
  type: string;
  total:string;
  gst:string;
  sub_total:string;
  payment_mode:string;
}
interface DataEntry {
  date: string;
  total: number;
}
interface ViewData {
  day: CustomerData;
  month: CustomerData;
  year: CustomerData;
}
type ViewType = keyof ViewData;
@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css'],
  providers: [DatePipe]
})

export class DashComponent implements OnInit {
  

  isClosed1: boolean=true;
  data:ViewData  = {
    day: { male: 0, female: 0 },
    month: { male: 0, female: 0 },
    year: { male: 0, female: 0 }
  };
  onlinepay:boolean=false;
  activeChart: 'day' | 'month' | 'year' = 'day';
  currentView: ViewType = 'day';
  pdfurl='';
  monthNamesArray:any;
  totalcustolist: any;
  totalcutomercount: any;
  totalbillcount: any;
  totalbillList: any[]=[];
  totalservcount: any;
  totaldaycount: any;
  totaldaysaleList: any;
  totalmonthsaleList: any;
  totalmonthcount: any;
  totalyearcount: any;
  totalyearsaleList: any;
  daynomalecount: any;
  monthnofemalecount: any;
  yearmalecount: any;
  daynofemalecount: any;
  graph_price:any
  monthnomalecount: any;
  yearfemalecount: any;
  graph_label:any[]=[];
   Jan: any[]=[];
    Feb: any[]=[];
   Mar: any[]=[];
   Apr: any[]=[];
   May: any[]=[];
   Jun: any[]=[];
   Jul: any[]=[];
   Aug: any[]=[];
   Sep: any[]=[];
   Oct: any[]=[];
   Nov: any[]=[];
   Dec: any[]=[];
  currentViewpoint: string = 'day'; // Set default view
  chart: any;
  myChart: any;
  helper=new JwtHelperService();
  datachart = {
    day: { labels: ['sun', 'mon', 'tue', 'wed', 'thr', 'fri', 'sat'], datasets: [{ label: 'Day Data...', data: [/* Day Data */] }] },
    month: { labels: ['Month Labels...'], datasets: [{ label: 'Month Data...', data: [/* Month Data */] }] },
    year: { labels: ['Year Labels...'], datasets: [{ label: 'Year Data...', data: [/* Year Data */] }] }
  };
  excel: any;
  lastfivedata: any;
  lastwo: any;
  userRole: any;
  count:any;
  totalsaleday: any;
  token:any;
  profilerole: any;
  list: any;
  pname: any;
  pcost: any;
hello:any
  pqua: any;
  pamount: any;
  procato: any;
  table: any;
  sname: any;
  scost: any;
  squa: any;
  sgen: any;
  samount: any;
  profile: any;
  gp: any;
  monthname: any;
  gstrate: any;
  formattedDate: any;
  staffname: any;
  recentbilldate:any;
  rainbowmedia:boolean=false;
  memoriesaddr:boolean=false;
marvelselaiyur:boolean=false;
  marvelmanapakaddr:boolean=false;
  marvelomraddr:boolean=false;
marvelvelachery:boolean=false;
  marvelannanagar:boolean=false;
   blush:boolean=false;
  dsaloon:boolean=false;
  dataEntries: DataEntry[] = [
    { date: "2025-01-12", total: 100 },
    { date: "2025-01-15", total: 200 },
    { date: "2023-01-01", total: 300 },
    { date: "2024-03-15", total: 200 },
    { date: "2023-01-01", total: 400 },
    { date: "2023-02-01", total: 50 },
    { date: "2024-02-01", total: 10 },
    { date: "2024-02-01", total: 20 }
  ];
  // servdetails: any;
  constructor(private service:DataService,private router:Router,private auth:AuthService,
    private dialog:MatDialog,public datePipe: DatePipe) {
    Chart.register(...registerables);
   }
   latestYearTotals: { [key: string]: number } = {};
  ngOnInit(): void {
    this.latestYearTotals = this.getMonthlyTotalsForLatestAvailableYear(this.dataEntries);
    console.log("Monthly Totals for Latest Available Year:", this.latestYearTotals);
if("https://chillbreezeomr-backend.billitnow.in/"===this.service.endpoint){
  this.memoriesaddr=true;
  this.marvelmanapakaddr=false;
  this.marvelomraddr=false;
  this.marvelannanagar=false;
  this.rainbowmedia=false;
  this.dsaloon=false;
  this.marvelselaiyur=false;
  this.marvelvelachery=false;
   this.blush=false;
}
else if("https://marvelmanapakkam-backend.billitnow.in/"===this.service.endpoint){
  this.memoriesaddr=false;
  this.marvelmanapakaddr=true;
  this.marvelomraddr=false;
  this.marvelannanagar=false;
  this.rainbowmedia=false;
  this.dsaloon=false;
  this.marvelselaiyur=false;
  this.marvelvelachery=false;
   this.blush=false;
}
else if("https://marvelomr-backend.billitnow.in/"===this.service.endpoint){
  this.memoriesaddr=false;
  this.marvelmanapakaddr=false;
  this.marvelomraddr=true;
  this.marvelannanagar=false;
  this.rainbowmedia=false;
  this.dsaloon=false;
  this.marvelselaiyur=false;
  this.marvelvelachery=false;
   this.blush=false;
}
else if("https://marvel-ag-backend.billitnow.in/"===this.service.endpoint){
  this.memoriesaddr=false;
  this.marvelmanapakaddr=false;
  this.marvelomraddr=false;
  this.marvelannanagar=true;
  this.rainbowmedia=false;
  this.dsaloon=false;
  this.marvelselaiyur=false;
  this.marvelvelachery=false;
   this.blush=false;
}
else if("https://billitnow-backend.rainbowmedia.co.in/"===this.service.endpoint){
  this.memoriesaddr=false;
  this.marvelmanapakaddr=false;
  this.marvelomraddr=false;
  this.marvelannanagar=false;
  this.rainbowmedia=true;
  this.dsaloon=false;
  this.marvelselaiyur=false;
  this.marvelvelachery=false;
   this.blush=false;
}
else if("https://dsaloon-backend.billitnow.in/"===this.service.endpoint){
  this.memoriesaddr=false;
  this.marvelmanapakaddr=false;
  this.marvelomraddr=false;
  this.marvelannanagar=false;
  this.rainbowmedia=false;
  this.dsaloon=true;
  this.marvelselaiyur=false;
  this.marvelvelachery=false;
   this.blush=false;
}
else if("https://marvel-selaiyur-backend.billitnow.in/"===this.service.endpoint){
  this.memoriesaddr=false;
  this.marvelmanapakaddr=false;
  this.marvelomraddr=false;
  this.marvelannanagar=false;
  this.rainbowmedia=false;
  this.marvelselaiyur=true;
  this.marvelvelachery=false;
  this.dsaloon=false;
   this.blush=false;
}
else if("https://velachery-backend.billitnow.in/"===this.service.endpoint){
  this.memoriesaddr=false;
  this.marvelmanapakaddr=false;
  this.marvelomraddr=false;
  this.marvelannanagar=false;
  this.rainbowmedia=false;
  this.marvelselaiyur=false;
  this.marvelvelachery=true;
  this.dsaloon=false;
  this.blush=false;
}
else if("https://blush-backend.billitnow.in/"===this.service.endpoint){
  this.memoriesaddr=false;
  this.marvelmanapakaddr=false;
  this.marvelomraddr=false;
  this.marvelannanagar=false;
  this.rainbowmedia=false;
  this.marvelselaiyur=false;
  this.marvelvelachery=false;
  this.dsaloon=false;
   this.blush=true;
}
this.token=localStorage.getItem('token')
let decodetoken=this.helper.decodeToken(this.token)
// console.log(decodetoken.sub);
this.userRole=decodetoken.role
if(decodetoken.role=="0"){
  this.profilerole="Admin"
}
else{
  this.profilerole="Manager"
}


    // const decodetoken=this.helper.decodeToken(tok)
    this.lastfive()
this.showDayChart()
this.totalbill()
this.totalservice()
this. totalcutomer()
this.totaldaynosale()
this. monthnosale()
this. yearnosale()
this. yearnosale()
this. daynomale()
this. yearnomale()
this.monthnomale()
this. daynofemale()
this. monthnofemale()
this. yearnofemale()

    // const data = {
    //   labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021'],
    //   datasets: [{
    //     label: 'Weekly Sales',
    //     data: [18, 12, 6, 9, 12, 3, 9],
    //     backgroundColor: [
    //       ' #FFF'
    //      ],
    //      borderColor:[

    //        ' #FA842F'

    //      ],
    //     // pointRadius:0,


    //     tension: 0.1
    //   }]
    // };


    // const config = {
    //   type: 'line',
    //   data,
    //   options: {
    //     scales: {
    //       x:{
    //         grid:{
    //           display:false
    //         }
    //       },
    //       y: {
    //         grid:{
    //           display:false
    //         }
    //       }
    //     }
    //   }
    // };


    // const myChart = new Chart(
    //   document.getElementById('myChart'),
    //   config
    // );

    // const chartVersion = document.getElementById('chartVersion');
    // if (chartVersion) {
    //   chartVersion.innerText = Chart.version!;
    // }

  }
  getMonthlyTotalsForLatestAvailableYear(entries: DataEntry[]): { [key: string]: number } {
    if (entries.length === 0) return {};

    // Step 1: Get the current year and current month (for comparison purposes)
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // 0 = January, 1 = February, etc.

    // Step 2: Get all available years in descending order (latest first)
    const years = [...new Set(entries.map(entry => new Date(entry.date).getFullYear()))].sort((a, b) => b - a);

    // Step 3: Initialize totals for all 12 months (default to 0)
    let monthlyTotals: { [key: string]: number } = {
      "Jan": 0, "Feb": 0, "Mar": 0, "Apr": 0, "May": 0, "Jun": 0,
      "Jul": 0, "Aug": 0, "Sep": 0, "Oct": 0, "Nov": 0, "Dec": 0
    };

    // Step 4: Process each month, checking data from the latest available year first
    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      let foundDataForMonth = false;  // Flag to check if data was found for the current month

      // Step 5: Check if we have data for the month in the latest year
      for (let year of years) {
        const monthEntries = entries.filter(entry => {
          const entryDate = new Date(entry.date);
          return entryDate.getMonth() === monthIndex && entryDate.getFullYear() === year;
        });

        if (monthEntries.length > 0) {
          monthlyTotals[Object.keys(monthlyTotals)[monthIndex]] = monthEntries.reduce((sum, entry) => sum + entry.total, 0);
          foundDataForMonth = true;
          break;
        }
      }

      // Step 6: If no data for the current month (e.g., Feb 2025), set it to 0
      if (!foundDataForMonth && monthIndex <= currentMonth) {
        monthlyTotals[Object.keys(monthlyTotals)[monthIndex]] = 0;
      }
    }

    return monthlyTotals;
  }
  

editprofile(){

this.token=localStorage.getItem('token')
let decodetoken=this.helper.decodeToken(this.token)
this.service.findadminal(decodetoken.sub).subscribe(
  (result) => {
    this.profile=result;


          this.dialog.open(EditprofileComponent,{
            width:'792px',
            height:'381px',
        data:this.profile.findadmin

          })
  })
}
  fetchDataForView(view: ViewType) {

    this.data[view].male = Math.floor(Math.random() * 50) + 1;
    this.data[view].female = Math.floor(Math.random() * 50) + 1;
  }

  switchView(view: ViewType) {
    this.currentView = view;
  }

  isClosed = false;
clear(){
  this.service.removeToken()
}

download(){
  const doc=new jsPDF()
  doc.setFontSize(3);
  doc.text("hello world",4,4)
  doc.save("sjhs")
}
viewPdf() {
  const doc = new jsPDF();
  doc.setFontSize(12);
  doc.text("hello world", 10, 10);

  // Get the raw PDF data as ArrayBuffer
  const pdfData = doc.output('arraybuffer');

  // Create a Blob from the PDF data
  const blob = new Blob([pdfData], { type: 'application/pdf' });

  // Create a data URL from the Blob
  const pdfDataUri = URL.createObjectURL(blob);

  // Open the data URL in a new tab
  const newTab = window.open();
  if (newTab) {
    newTab.document.write('<iframe width="100%" height="100%" src="' + pdfDataUri + '"></iframe>');
  } else {
    alert('Please allow pop-ups in your browser to view the PDF.');
  }
}
toggleMobileMenu() {
  // Implement the logic to toggle the mobile menu
  // For example, you can toggle a boolean variable
}
@ViewChild('printContent') printContent!: ElementRef;
@ViewChild('printContent1') printContent1!: ElementRef;






generatePDF(pro:any) {
  if (pro.UPI_amount === "" && pro.cash_amount === "") {

    const cash = document.getElementById("cashSpan1") as HTMLInputElement;
    const upi = document.getElementById("upiSpan1") as HTMLInputElement;

    if (cash) {
      cash.innerText = "";
    }

    if (upi) {
      upi.innerText = "";
    }
  } else {
    const cash = document.getElementById("cashSpan1") as HTMLInputElement;
   const upi = document.getElementById("upiSpan1") as HTMLInputElement;

    if (cash) {
      cash.innerText =  pro.cash_amount;
    }

    if (upi) {
      upi.innerText =  pro.UPI_amount;
    }
  }
  this.gstrate = Math.round((pro.gst / pro.sub_total) * 100);
// console.log(this.gstrate);
const gstrate=  document.getElementById("gstrate1")  as HTMLInputElement;
gstrate.innerText=this.gstrate;
  const invnum=  document.getElementById("invNoSpan")  as HTMLInputElement;
  invnum.innerText=pro.invoice_no;


const mobile=  document.getElementById("mobSpan")  as HTMLInputElement;
mobile.innerText=pro.customer_phone

const gross=  document.getElementById("grossSpan")  as HTMLInputElement;
gross.innerText=pro.sub_total

const gst=  document.getElementById("gstSpan")  as HTMLInputElement;
gst.innerText=pro.gst;
const createdAtDate = new Date(pro.createdAt);
const day = createdAtDate.getDate().toString().padStart(2, '0');
const month = (createdAtDate.getMonth() + 1).toString().padStart(2, '0');
const year = createdAtDate.getFullYear().toString();

const datePart = `${day}-${month}-${year}`; // dd-mm-yyyy format
const timePart = createdAtDate.toLocaleTimeString(); // Extracts the time part

const pay = document.getElementById("dtSpan") as HTMLInputElement;
this.recentbilldate=this.datePipe.transform(pro.date,'dd-MM-YYYY')
pay.innerText =this.recentbilldate;



const netamount=  document.getElementById("netSpan")  as HTMLInputElement;
netamount.innerText=pro.total

const customer= document.getElementById("custSpan") as HTMLInputElement;
customer.innerText=pro.customer_name
const paymode=  document.getElementById("paySpan")  as HTMLInputElement;
paymode.innerText=pro.payment_mode
  const pdf = new jsPDF();
  let proarr=[]
  this.list=pro.product_details;
  // console.log(this.list);

  for(let i=0;i<this.list.length;i++){

   this.pname=this.list[i].Product_name;
   this.pcost=this.list[i].Product_price     ;
   this.pqua=this.list[i].quantity;
   this.pamount=this.list[i].amount;
this.procato=this.list[i].Product_category;
   proarr.push({
    Product_name:this.pname,
    quantity:this.pqua,
    amount:this.pamount,
    price:this.pcost,
    productcat:this.procato,
   })
  //  console.log(proarr);


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
        `<td style="padding:2px 5px"> ${item.Product_name}</td><td style="padding:2px 5px"> ${item.productcat}</td>
        <td style="padding:2px 5px">${item.price}</td><td style="padding:2px 5px">${item.quantity}</td>
        <td style="padding:2px 5px">${item.amount}</td></tr>`;
      this.table = this.table + row;
    }
    // console.log(this.table);
  });

      const tabledata=document.getElementById("tbody") as HTMLInputElement
      tabledata.innerHTML = this.table;

  }

  const printContent = this.printContent.nativeElement;

  html2canvas(printContent).then((canvas) => {

    const imgData = canvas.toDataURL('image/png');

    pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());

    pdf.save('Product invoice.pdf');
  });
}
generatePDF1(pro:any) {
  if (pro.UPI_amount === "" && pro.cash_amount === "") {

    const cash = document.getElementById("cashSpan") as HTMLInputElement;
    const upi = document.getElementById("upiSpan") as HTMLInputElement;

    if (cash) {
      cash.innerText = "";
    }

    if (upi) {
      upi.innerText = "";
    }
  } else {
    const cash = document.getElementById("cashSpan") as HTMLInputElement;
   const upi = document.getElementById("upiSpan") as HTMLInputElement;

    if (cash) {
      cash.innerText =  pro.cash_amount;
    }

    if (upi) {
      upi.innerText =  pro.UPI_amount;
    }
  }
  this.gstrate = Math.round((pro.gst / pro.sub_total) * 100);
  // console.log(this.gstrate);
  const gstrate=  document.getElementById("gstrate4")  as HTMLInputElement;
  gstrate.innerText=this.gstrate;
  const invnum=  document.getElementById("invNoSpan1")  as HTMLInputElement;
  invnum.innerText=pro.invoice_no;


const mobile=  document.getElementById("mobSpan1")  as HTMLInputElement;
mobile.innerText=pro.customer_phone

const gross=  document.getElementById("grossSpan1")  as HTMLInputElement;
gross.innerText=pro.sub_total

const gst=  document.getElementById("gstSpan1")  as HTMLInputElement;
gst.innerText=pro.gst;
const createdAtDate = new Date(pro.createdAt);
const day = createdAtDate.getDate().toString().padStart(2, '0');
const month = (createdAtDate.getMonth() + 1).toString().padStart(2, '0');
const year = createdAtDate.getFullYear().toString();

const datePart = `${day}-${month}-${year}`; // dd-mm-yyyy format
const timePart = createdAtDate.toLocaleTimeString(); // Extracts the time part

const pay = document.getElementById("dtSpan1") as HTMLInputElement;
this.recentbilldate=this.datePipe.transform(pro.date,'dd-MM-YYYY')
pay.innerText =this.recentbilldate;

const netamount=  document.getElementById("netSpan1")  as HTMLInputElement;
netamount.innerText=pro.total

const customer= document.getElementById("custSpan1") as HTMLInputElement;
customer.innerText=pro.customer_name
const paymode=  document.getElementById("paySpan1")  as HTMLInputElement;
paymode.innerText=pro.payment_mode
  const pdf = new jsPDF();
  let serarr=[]
  this.list=pro.service_details;
  for(let i=0;i<this.list.length;i++){
    this.staffname=this.list[i].staffname;
    this.sname=this.list[i].service_name;
    this.scost=this.list[i].service_price;
    this.squa=this.list[i].quantity;
    this.samount=this.list[i].amount;
 this.sgen=this.list[i].service_gender;
 serarr.push({
     service_name:this.sname,
     quantity:this.squa,
     amount:this.samount,
     price:this.scost,
     gender:this.sgen,
     staffname:this.staffname
    })
   //  console.log(serarr);


   const that: { serarr: Array<{ service_name: string; quantity: number; price: number;amount:number;gender:string;staffname:string }> } = {
     serarr: [
       {
         service_name:this.sname,
         quantity:this.squa,
         amount:this.samount,
         price:this.scost,
         gender:this.sgen,
         staffname:this.staffname
       }

     ],


   };
   this.table = '';


   serarr.map((item) => {
     if (item.service_name) {
       let row: string = "<tr>";
       row =
         row +
         `<td style="padding:2px 5px"> ${item.service_name}</td><td style="padding:2px 5px"> ${item.staffname}</td>
         <td style="padding:2px 5px">${item.quantity}</td><td style="padding:2px 5px">${item.price}</td>
         <td style="padding:2px 5px">${item.amount}</td></tr>`;
       this.table = this.table + row;
     }

   });

       const tabledata=document.getElementById("tbody1") as HTMLInputElement
       tabledata.innerHTML = this.table;

   }
  const printContent1 = this.printContent1.nativeElement;

  html2canvas(printContent1).then((canvas) => {
    // console.log('Canvas:', canvas);
    const imgData = canvas.toDataURL('image/png');

    pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());

    pdf.save('Service invoice.pdf');
  });
}
viewdetail(pro: any) {

  if (pro.UPI_amount === "" && pro.cash_amount === "") {

    const cash = document.getElementById("cashSpan1") as HTMLInputElement;
    const upi = document.getElementById("upiSpan1") as HTMLInputElement;

    if (cash) {
      cash.innerText = "";
    }

    if (upi) {
      upi.innerText = "";
    }
  } else {
    const cash = document.getElementById("cashSpan1") as HTMLInputElement;
   const upi = document.getElementById("upiSpan1") as HTMLInputElement;

    if (cash) {
      cash.innerText =  pro.cash_amount;
    }

    if (upi) {
      upi.innerText =  pro.UPI_amount;
    }
  }
  const pdf = new jsPDF();

  this.gstrate = Math.round((pro.gst / pro.sub_total) * 100);
  // console.log(this.gstrate);
  const gstrate=  document.getElementById("gstrate1")  as HTMLInputElement;
  gstrate.innerText=this.gstrate;
    const invnum=  document.getElementById("invNoSpan")  as HTMLInputElement;
    invnum.innerText=pro.invoice_no;


  const mobile=  document.getElementById("mobSpan")  as HTMLInputElement;
  mobile.innerText=pro.customer_phone

  const gross=  document.getElementById("grossSpan")  as HTMLInputElement;
  gross.innerText=pro.sub_total

  const gst=  document.getElementById("gstSpan")  as HTMLInputElement;
  gst.innerText=pro.gst;
  const createdAtDate = new Date(pro.createdAt);
  const day = createdAtDate.getDate().toString().padStart(2, '0');
  const month = (createdAtDate.getMonth() + 1).toString().padStart(2, '0');
  const year = createdAtDate.getFullYear().toString();

  const datePart = `${day}-${month}-${year}`;
  const timePart = createdAtDate.toLocaleTimeString();

  const pay = document.getElementById("dtSpan") as HTMLInputElement;
  this.recentbilldate=this.datePipe.transform(pro.date,'dd-MM-YYYY')
  pay.innerText =this.recentbilldate;



  const netamount=  document.getElementById("netSpan")  as HTMLInputElement;
  netamount.innerText=pro.total

  const customer= document.getElementById("custSpan") as HTMLInputElement;
  customer.innerText=pro.customer_name
  const paymode=  document.getElementById("paySpan")  as HTMLInputElement;
  paymode.innerText=pro.payment_mode
  let proarr=[]
    this.list=pro.product_details;
    // console.log(this.list);

    for(let i=0;i<this.list.length;i++){

     this.pname=this.list[i].Product_name;
     this.pcost=this.list[i].Product_price     ;
     this.pqua=this.list[i].quantity;
     this.pamount=this.list[i].amount;
  this.procato=this.list[i].Product_category;
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

      ],


    };
    this.table = '';


    proarr.map((item) => {
      if (item.Product_name) {
        let row: string = "<tr>";
        row =
          row +
          `<td style="padding:2px 5px"> ${item.Product_name}</td><td style="padding:2px 5px"> ${item.productcat}</td>
          <td style="padding:2px 5px">${item.quantity}</td><td style="padding:2px 5px">${item.price}</td>
          <td style="padding:2px 5px">${item.amount}</td></tr>`;
        this.table = this.table + row;
      }
      // console.log(this.table);
    });

        const tabledata=document.getElementById("tbody") as HTMLInputElement
        tabledata.innerHTML = this.table;

    }
  const printContent = this.printContent.nativeElement;

  html2canvas(printContent).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');

    pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());

    const pdfData = pdf.output('blob');
    const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });
    const pdfDataUri = URL.createObjectURL(pdfBlob);

    const link = document.createElement('a');
    link.href = pdfDataUri;
    link.target = '_blank';
    link.textContent = 'Open PDF';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  });
}

viewdetail1(pro: any) {

  if (pro.UPI_amount === "" && pro.cash_amount === "") {

    const cash = document.getElementById("cashSpan") as HTMLInputElement;
    const upi = document.getElementById("upiSpan") as HTMLInputElement;

    if (cash) {
      cash.innerText = "";
    }

    if (upi) {
      upi.innerText = "";
    }
  } else {
    const cash = document.getElementById("cashSpan") as HTMLInputElement;
   const upi = document.getElementById("upiSpan") as HTMLInputElement;

    if (cash) {
      cash.innerText =  pro.cash_amount;
    }

    if (upi) {
      upi.innerText =  pro.UPI_amount;
    }
  }


  const pdf1 = new jsPDF();

  this.gstrate = Math.round((pro.gst / pro.sub_total) * 100);
  // console.log(this.gstrate);
  const gstrate=  document.getElementById("gstrate4")  as HTMLInputElement;
  gstrate.innerText=this.gstrate;
  const invnum=  document.getElementById("invNoSpan1")  as HTMLInputElement;
  invnum.innerText=pro.invoice_no;


  const mobile=  document.getElementById("mobSpan1")  as HTMLInputElement;
  mobile.innerText=pro.customer_phone

  const gross=  document.getElementById("grossSpan1")  as HTMLInputElement;
  gross.innerText=pro.sub_total

  const gst=  document.getElementById("gstSpan1")  as HTMLInputElement;
  gst.innerText=pro.gst;
  const createdAtDate = new Date(pro.createdAt);
  const day = createdAtDate.getDate().toString().padStart(2, '0');
  const month = (createdAtDate.getMonth() + 1).toString().padStart(2, '0');
  const year = createdAtDate.getFullYear().toString();

  const datePart = `${day}-${month}-${year}`; // dd-mm-yyyy format
  const timePart = createdAtDate.toLocaleTimeString(); // Extracts the time part

  const pay = document.getElementById("dtSpan1") as HTMLInputElement;
  this.recentbilldate=this.datePipe.transform(pro.date,'dd-MM-YYYY')
  pay.innerText =this.recentbilldate;



  const netamount=  document.getElementById("netSpan1")  as HTMLInputElement;
  netamount.innerText=pro.total

  const customer= document.getElementById("custSpan1") as HTMLInputElement;
  customer.innerText=pro.customer_name
  const paymode=  document.getElementById("paySpan1")  as HTMLInputElement;
  paymode.innerText=pro.payment_mode

      let serarr=[]
      this.list=pro.service_details;

      for(let i=0;i<this.list.length;i++){
       this.staffname=this.list[i].staffname;
       this.sname=this.list[i].service_name;
       this.scost=this.list[i].service_price;
       this.squa=this.list[i].quantity;
       this.samount=this.list[i].amount;
    this.sgen=this.list[i].service_gender;
    serarr.push({
        service_name:this.sname,
        quantity:this.squa,
        amount:this.samount,
        price:this.scost,
        gender:this.sgen,
        staffname:this.staffname
       })

      const that: { serarr: Array<{ service_name: string; quantity: number; price: number;amount:number;gender:string;staffname:string }> } = {
        serarr: [
          {
            service_name:this.sname,
            quantity:this.squa,
            amount:this.samount,
            price:this.scost,
            gender:this.sgen,
            staffname:this.staffname
          }

        ],


      };
      this.table = '';


      serarr.map((item) => {
        if (item.service_name) {
          let row: string = "<tr>";
          row =
            row +
            `<td style="padding:2px 5px"> ${item.service_name}</td><td style="padding:2px 5px"> ${item.staffname}</td>
            <td style="padding:2px 5px">${item.quantity}</td><td style="padding:2px 5px">${item.price}</td>
            <td style="padding:2px 5px">${item.amount}</td></tr>`;
          this.table = this.table + row;
        }

      });

          const tabledata=document.getElementById("tbody1") as HTMLInputElement
          tabledata.innerHTML = this.table;

      }
  const printContent = this.printContent1.nativeElement;

  html2canvas(printContent).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');

    pdf1.addImage(imgData, 'PNG', 0, 0, pdf1.internal.pageSize.getWidth(), pdf1.internal.pageSize.getHeight());

    const pdfData = pdf1.output('blob');
    const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });
    const pdfDataUri = URL.createObjectURL(pdfBlob);

    const link = document.createElement('a');
    link.href = pdfDataUri;
    link.target = '_blank';
    link.textContent = 'Open PDF';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  });
  }



  toggleSidebar() {
    this.isClosed = !this.isClosed;
  }
  // downloadPDF() {
  //   const element = document.getElementById('yourHiddenElementId'); // Replace 'yourHiddenElementId' with your element ID
  //   if (element) {
  //     html2pdf(element).save('hiddenElement.pdf');
  //   } else {
  //     console.error('Element not found');
  //   }
  // }
  @Input() sideNavOpen: boolean = false;


  // sideNavOpen: boolean = false;

  toggleSideNav() {
    this.sideNavOpen = !this.sideNavOpen;
  }
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  isDropdownOpen1 = false;

  toggleDropdown1() {
    this.isDropdownOpen1 = !this.isDropdownOpen1;
  }
  // toggleMainWidth() {
  //   this.isClosed1 =  !this.isClosed
  //   this.isClosed  = !this.isClosed1;
  // }
  servebill(){
    this.router.navigate(['service_bill'])
  }
  probill(){
    this.router.navigate(['product_bill'])
  }
  servereport(){
    this.router.navigate(['inv_summary'])
  }
  proreport(){
    this.router.navigate(['prorep'])
  }
  logout(){
    this.router.navigate(['login'])
    this.service.removeToken()

  }

  totalcutomer(){
    return this.service.totalcutomer().subscribe((result:any)=>{
      this.totalcutomercount=result.totalCount;
      this.totalcustolist=result.results;
      // console.log(this.totalcustolist);

    })
  }
  exportToExcel1(totalcustolist: any[], fileName: string): void {
    const filteredData = totalcustolist.map((item, index) => ({
      'S.No': index + 1, // Serial number
      'Date': this.formatDate(item.createdAt), // Formatted date
      'Product ID': item.customer_id,
      'Customer Name': item.customer_name,
      'Customer No': item.customer_phone,
      'Customer ID': item.customer_id,
      'Membership No': item.membership_no,
      'Gender':item.gender,
      'Location':item.address,
      'Email':item.email,
      'Insta ID':item.insta_id
    }));
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
  exportcustomer(){
    this.exportToExcel1( this.totalcustolist, 'customer list');
  }
  formatDate(date: string): string {
    const formattedDate = new Date(date);
    const day = formattedDate.getDate().toString().padStart(2, '0');
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
    const year = formattedDate.getFullYear();
    return `${day}-${month}-${year}`;
  }
  totalbill(){
    return this.service.totalbill().subscribe((result:any)=>{
      this.totalbillcount=result.totalCount;
      this.totalbillList=result.results;
      // console.log(this.totalbillList.map(item => item.data));
      this.excel=result;

      // console.log(this.totalbillList);

    })
  }
  lastfive(){
    return this.service.lastfive().subscribe((result:any)=>{
      this.lastfivedata=result.lastThreeServices;

      this.lastwo=result.lastTwoProducts;
      // console.log(this.lastwo);

    })
  }



  // totalbillList: any[] = [];
  showTable: boolean = true;

  checkRowCount() {
    this.showTable = this.getTotalRowCount() <= 5;
  }

  getTotalRowCount(): number {
    let rowCount = 0;
    for (const result of this.totalbillList) {
      for (const data of result.data) {
        rowCount += result.type === 'service' ?
          data.service_details.length :
          data.product_details.length;
      }
    }
    return rowCount;
  }
  exportsaleToExcel(){
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    const serviceData = this.extractFieldsForExport1('service');
    const productData = this.extractFieldsForExport1('product');

    const serviceSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(serviceData);
    const productSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(productData);

    XLSX.utils.book_append_sheet(workbook, serviceSheet, 'Service');
    XLSX.utils.book_append_sheet(workbook, productSheet, 'Product');

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    this.saveExcelFile1(excelBuffer, 'Today salelist.xlsx');
  }
  saveExcelFile1(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    const a: HTMLAnchorElement = document.createElement('a');
    document.body.appendChild(a);
    const url: string = window.URL.createObjectURL(data);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
  extractFieldsForExport1(type: string): any[] {
    const extractedData: any[] = [];
// console.log(this.totaldaysaleList);

    this.totaldaysaleList.forEach((result: any) => {
      if (result.type === type) {
        result.data.forEach((item: any) => {
          const invoiceNo = item.invoice_no;
          const customerName = item.customer_name;
          const customerPhone = item.customer_phone;
          const payment_mode = item.payment_mode;
          const sub_total = item.sub_total;
          const gst = item.gst
          const total = item.total
          this.formattedDate=this.datePipe.transform(item.date,'dd-MM-YYYY')
          this.gstrate = Math.round((item.gst / item.sub_total) * 100);

          if (type === 'service') {
            if (item.service_details && item.service_details.length > 0) {
              item.service_details.forEach((service: any) => {
                const serviceAmountWithGST = parseFloat(service.amount) + (parseFloat(service.amount) * this.gstrate / 100);
                let extractedItem: any = {
                  'Invoice No': invoiceNo,
                  'Customer Name': customerName,
                  'Customer Phone': customerPhone,
                  'Service Name': service.service_name,
                  'Gender': service.service_gender,
                  'Staff Name': service.staffname,
                  'Quantity': service.quantity,
                  'Service Price': service.service_price,
                  'Discount': service.discount,
                  'Amount': service.amount,
                  // 'Sub Total': sub_total,
                  'GST': gst,
                  'Total': serviceAmountWithGST,
                  'Transaction Type': payment_mode,
                  'Date': this.formattedDate,
                };
                extractedData.push(extractedItem);
              });
            }
          } else if (type === 'product') {
            if (item.product_details && item.product_details.length > 0) {
              item.product_details.forEach((product: any) => {
                const productAmountWithGST = parseFloat(product.amount) + (parseFloat(product.amount) * this.gstrate / 100);
                let extractedItem: any = {
                  'Invoice No': invoiceNo,
                  'Customer Name': customerName,
                  'Customer Phone': customerPhone,
                  'Product Name': product.Product_name,
                  'Category': product.Product_category,
                  'Staff Name': product.staffname,
                  'Quantity': product.quantity,
                  'Price': product.Product_price,
                  'Discount': product.discount,
                  'Amount': product.amount,
                  // 'Sub Total': sub_total,
                  'GST': gst,
                  'Total': productAmountWithGST,
                  'Transaction Type': payment_mode,
                  'Date': this.formattedDate,
                };
                extractedData.push(extractedItem);
              });
            }
          }
        });
      }
    });

    return extractedData;
  }




  exportToExcel(): void {
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    const data = this.extractFieldsForExport();

    const sheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(workbook, sheet, 'Bill List');

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    this.saveExcelFile(excelBuffer, 'Today bill_list.xlsx');
  }


  extractFieldsForExport(): any[] {
    const extractedData: any[] = [];
    let serialNo = 1;

    this.totalbillList.forEach((result: any) => {
      result.data.forEach((item: any) => {
        const invoiceNo = item.invoice_no;
        const customerName = item.customer_name;
        const customerPhone = item.customer_phone;
        const membership_no = item.membership_no;
        const payment_mode = item.payment_mode;
        const sub_total = item.sub_total;
        const gst = item.gst
        const total = item.total


        const extractedItem: any = {
          'Serial No': serialNo,
          'Invoice No': invoiceNo,
          'Customer Name': customerName,
          'Customer Phone': customerPhone,
          'Membership No':membership_no,
          'Transaction Type':payment_mode,
            'Sub Total': sub_total,
            'GST': gst,
            'Total': total,
        };

        extractedData.push(extractedItem);
        serialNo++; // Increment serial number
      });
    });

    return extractedData;
  }



  saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    const a: HTMLAnchorElement = document.createElement('a');
    document.body.appendChild(a);
    const url: string = window.URL.createObjectURL(data);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  exportToExcel2(totalbillList: any[], fileName: string): void {
    const filteredData = totalbillList.map((item, index) => ({
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
  exportbill(){
    this.exportToExcel2( this.totalbillList, 'totalbill list');
  }
  totalservice(){
    return this.service.totalservice().subscribe((result:any)=>{
      this.totalservcount=result.total;
      // console.log(this.totalservcount);

      this.servdetails=result.totalservice;
      // console.log(this.servdetails);

    })
  }

  servdetails: any[] = [];
  exportToExcels(): void {
    // Define mapping for headers
    const headerMapping: { [key: string]: string } = {
      'service_name': 'Service Name',
      'service_gender': 'Gender',
      'staffname': 'Staff Name',
      'quantity': 'Quantity',
      'service_price': 'Price',
      'discount': 'Discount',
      'amount': 'Amount'
    };

    let serialNo = 1; // Initialize serial number

    const allServiceDetails = this.servdetails.reduce(
      (acc: any[], curr: any) => {
        const detailsWithoutId = curr.service_details.map((detail: any) => {
          const modifiedDetail: any = {};
          // Add Serial No as the first field
          modifiedDetail['SN'] = serialNo++;
          // Map original keys to new keys using headerMapping and exclude _id
          Object.keys(detail).forEach((key: string) => {
            if (key !== '_id') {
              modifiedDetail[headerMapping[key] || key] = detail[key];
            }
          });
          return modifiedDetail;
        });
        return acc.concat(detailsWithoutId);
      },
      []
    );

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(allServiceDetails);

    // Reorder the columns to place 'Serial No' before 'Service Name'
    const columns: XLSX.ColInfo[] = [
      { wch: 10 }, // Width for Serial No column
      ...Object.keys(headerMapping).map(key => ({ wch: 20 })) // Default width for other columns
    ];
    worksheet['!cols'] = columns;

    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'service_details');
  }




  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    const a: HTMLAnchorElement = document.createElement('a');
    document.body.appendChild(a);
    a.href = URL.createObjectURL(data);
    a.download = `${fileName}_${new Date().getTime()}.xlsx`;
    a.click();
    document.body.removeChild(a);
  }
  exportToExcel3(totalbillList: any[], fileName: string): void {
    const filteredData = totalbillList.map((item, index) => ({
      'S.No': index + 1, // Serial number
      'Date': this.datePipe.transform(item.date,'dd-MM-YYYY'), // Formatted date
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
  exportservice(){
    this.exportToExcel3( this.totalbillList, 'totalbill list');
  }



  exportDataToExcel(resultArray: any[]) {
    const formattedData = this.formatDataForExport(resultArray);
    this.exportToExcelsale(formattedData);
  }



  formatDataForExport(data: any[]): any[] {
    return data.reduce((formattedArray, section) => {
      if (section.type === 'service' || section.type === 'product') {
        const formattedSection = {
          type: section.type,
          data: section.data.map((item: any) => ({
            ...item,
            details: (item.service_details || item.product_details).map((detail: any) => ({
              ...detail,
              service_name: detail.service_name || detail.Product_name,
              service_gender: detail.service_gender || '',
              staffname: detail.staffname,
              quantity: detail.quantity,
              service_price: detail.service_price || detail.Product_price,
              discount: detail.discount,
              amount: detail.amount,
            })),
          })),
        };
        formattedArray.push(formattedSection);
      }
      return formattedArray;
    }, []);
  }

  exportToExcelsale(data: any[]) {
    const wb = XLSX.utils.book_new();

    data.forEach(section => {
      const wsData = section.data.flatMap((item:any) => item.details); // Extract details
      const ws = XLSX.utils.json_to_sheet(wsData, {
        header: ['service_name', 'service_gender', 'staffname', 'quantity', 'service_price', 'discount', 'amount'],
      });
      XLSX.utils.book_append_sheet(wb, ws, section.type);
    });

    const date = new Date().toISOString().slice(0, 10);
    const filename = `sales_data_${date}.xlsx`;

    XLSX.writeFile(wb, filename);
  }



  monthnosale(){
    return this.service.monthnosale().subscribe((result:any)=>{
      this.totalmonthcount=result.total;
      this.totalmonthsaleList=result.resultArray;
    })
  }
 yearnosale(){
    return this.service.yearnosale().subscribe((result:any)=>{
      this.totalyearcount=result.total;
      this.totalyearsaleList=result.resultArray;
    })
  }

  daynomale(){
    return this.service.daynomale().subscribe((result:any)=>{
      this.daynomalecount=result.total;
      this.totalyearsaleList=result.maleCustomers;

      this.data.day.male = this.daynomalecount;

      this.updateYearFemaleCount();
    })
  }
  monthnomale(){
    return this.service.monthnomale().subscribe((result:any)=>{
      this.monthnomalecount=result.total;
      this.totalyearsaleList=result.maleCustomers;
// console.log(this.monthnomalecount);

      this.data.month.male = this.monthnomalecount;

      this.updateYearFemaleCount();
    })
  }
  yearnomale(){
    return this.service.yearnomale().subscribe((result:any)=>{
      this.yearmalecount=result.total;
      this.totalyearsaleList=result.femaleCustomers;
      // console.log(this.yearmalecount);

      this.data.year.male = this.yearmalecount;

      this.updateYearFemaleCount();
    })
  }
  daynofemale(){
    return this.service.daynofemale().subscribe((result:any)=>{
      this.daynofemalecount=result.total;
      this.totalyearsaleList=result.maleCustomers;
      // console.log(this.daynofemalecount);

      this.data.day.female = this.daynofemalecount;

    this.updateYearFemaleCount();
    })
  }
  monthnofemale(){
    return this.service.monthnofemale().subscribe((result:any)=>{
      this.monthnofemalecount=result.total;
      this.totalyearsaleList=result.maleCustomers;
// console.log( this.monthnofemalecount);

      this.data.month.female = this.monthnofemalecount;

    this.updateYearFemaleCount();
    })
  }
  yearnofemale(){
    return this.service.yearnofemale().subscribe((result:any)=>{
      this.yearfemalecount=result.total;


      this.totalyearsaleList=result.femaleCustomers;
      this.data.year.female = this.yearfemalecount;

    this.updateYearFemaleCount();
    })

  }
  updateYearFemaleCount() {

  }
  totaldaynosale(){
    return this.service.totaldaynosale().subscribe((result:any)=>{
      this.totaldaycount=result.total;
      this.totaldaysaleList=result.resultArray;


    })
  }





showDayChart() {
  console.log('Month Names:', this.monthname);
console.log('Graph Prices:', this.graph_price);
console.log('Chart Type:', this.activeChart);
  this.activeChart = 'day';
  const months: number[][] = new Array(12).fill(0).map(() => []);
  // Object to track the latest year for each month
  let latestYearForMonth: { [key: number]: number } = {};
  var temp_cost: any =0;
  this.service.yearnosale().subscribe((result: any) => {
    // console.log("result",result);
    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;
    const data: any[] = [];

    if (result && Array.isArray(result.resultArray)) {
      for (const entry of result.resultArray) {
        if (entry && Array.isArray(entry.data)) {
          for (const dataEntry of entry.data) {
         
         const date = new Date(dataEntry.date);
         const entryYear = date.getFullYear();
         const monthIndex = date.getMonth(); 
              
               
         if (!latestYearForMonth.hasOwnProperty(monthIndex) || latestYearForMonth[monthIndex] < entryYear) {
                        latestYearForMonth[monthIndex] = entryYear;
                        months[monthIndex] = []; // Reset the month's data if a newer year is found
                      }
                      if (latestYearForMonth[monthIndex] === entryYear) {
                                      months[monthIndex].push(dataEntry.total);
                                    }
                        
       
          }
        }
      }
      const monthlyTotals: number[] = months.map((month) => arraySum(month));


      const currentDate = new Date();
      const currentMonthIndex = currentDate.getMonth();

      const graph_price1: number[] = [];
      for (let i = currentMonthIndex - 5; i <= currentMonthIndex; i++) {
        const index = i < 0 ? i + 12 : i;
        graph_price1.push(monthlyTotals[index]);
      }


this.gp=graph_price1;
      function arraySum(arr:any) {
        return arr.reduce((acc:any, curr:any) => acc + parseInt(curr, 10), 0);
      }
      this.Jan = arraySum(months[0]);

  console.log("this.Jan ",this.Jan );
  
         this.Feb = arraySum(months[1]);
      this.Mar = arraySum(months[2]);
      this.Apr = arraySum(months[3]);
      this.May = arraySum(months[4]);
      this.Jun = arraySum(months[5]);
      this.Jul = arraySum(months[6]);
      this.Aug = arraySum(months[7]);
      this.Sep = arraySum(months[8]);
      this.Oct = arraySum(months[9]);
      this.Nov = arraySum(months[10]);
      this.Dec = arraySum(months[11]);
      console.log("this.Dec ",this.Dec );
      this.graph_price =[this.Jan, this.Feb, this.Mar, this.Apr, this.May, this.Jun, this.Jul, this.Aug, this.Sep, this.Oct, this.Nov, this.Dec];
      console.log("this.Dec ",this.graph_price );
var temp_count = 0;


function getElementByNegativeIndex(arr:any, negIndex:any) {
  const positiveIndex = arr.length + negIndex;
  // console.log(arr.length )
  return arr[positiveIndex];
}


function reversePortion(arr: number[], index: number): number[] {
  const reversedPart = arr.slice(0, index + 1).reverse();
  const rest = arr.slice(index + 1);
  return reversedPart.concat(rest);
}

const reverseArrayWithPrevious = (arr: number[], n: number): number[] => {
  const reversedPart = arr.slice(arr.length - n).reverse();
  const restOfArray = arr.slice(0, arr.length - n);
  return reversedPart.concat(restOfArray);
};

const test: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const n: number = 3;
const result1: number[] = reverseArrayWithPrevious(test, n);


function reverseArrayFromIndex(arr: number[], index: number): number[] {
  if (index < 0 || index >= arr.length) {
      throw new Error("Index out of range");
  }

  const part1 = arr.slice(0, index + 1);
  const part2 = arr.slice(index + 1);

  const reversedArray = [...part2, ...part1];

  return reversedArray;
}

const current_Date = new Date();

const currentMonth_Index = currentDate.getMonth();

const reversedArray = reverseArrayFromIndex(test, currentMonth_Index);
const lastSixElements = reversedArray.slice(-6);

const reversedprice = reverseArrayFromIndex(this.graph_price, currentMonth_Index);
const lastSixprice = reversedprice.slice(-6);
this.graph_price = lastSixprice;


const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const monthNamesArray = lastSixElements.map(index => monthNames[index]);



this.monthname=monthNamesArray;



    } else {
      console.error('Invalid or empty result structure:', result);

    }



    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    this.chart?.destroy();
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.monthname,
        datasets: [
          {
            label: '',
            data: this.graph_price,
            backgroundColor: ['#FFF'],
            borderColor: ['#FA842F'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false
          },
          datalabels: {
            display:false
          },
          tooltip: {

            enabled: true,
           mode: 'nearest',
            intersect: false,
          },

        },

        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              fontSize: 4
            }
          },
          y: {
            grid: {
              display: false
            },
            ticks: {
              min: 0,
              // max: 60,
              // stepSize: 10,
              maxTicksLimit: 5,
            }
          }}
      }
    });
  }
  );

  const ctx = document.getElementById('myChart') as HTMLCanvasElement;

  const monthChartData = [this.Jan];
  // console.log("this is chart :"+this.Jan);
  this.chart?.destroy();
  this.chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: this.monthname,
      datasets: [{
        label: '',
        data: this.graph_price,
        backgroundColor: [
          '#FFF'
        ],
        borderColor: [
          '#FA842F'
        ],
        borderWidth: 1
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              fontSize: 4
            }
          },
          y: {
            grid: {
              display: false
            }
          }
        }

      },
      elements: {
        line: {
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          shadow: {
            color: 'rgba(255, 99, 132, 0.4)',
            blur: 10,

            offsetY: 4,
            opacity: 1,
            mode: 'nearest',
            easing: 'linear'
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            fontSize: 4
          }
        },
        y: {
          grid: {
            display: false
          },
          ticks: {

            min: 0,
            max: 60,
            stepSize: 10

          }
        }
      }
    }
  }
  );
}


  showMonthChart() {
    this.activeChart = 'month';

    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    this.chart?.destroy();


    const monthChartData = [20, 45, 15, 30];

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
          label: '',
          data: monthChartData,
          backgroundColor: [
            ' #FFF'
           ],
           borderColor:[

             ' #FA842F'

           ],
          borderWidth: 1
        }]
      },options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x:{
            grid:{
              display:false
            },
            ticks: {
              fontSize: 4
            }
          },
          y: {
            grid:{
              display:false
            },
            ticks: {

              min: 0,
              max: 60,
              stepSize: 10

            }
          }
        }
      }
    });
  }
  showYearChart() {
    this.activeChart = 'year';

    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    this.chart?.destroy();
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [ '2019', '2020', '2021','2022','2023','2024'],
        datasets: [{
          label: '',
          data: [10,20,28,6,45,30],
          backgroundColor: [
            ' #FFF'
           ],
           borderColor:[

             ' #FA842F'

           ],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x:{
            grid:{
              display:false
            },
            ticks: {
              fontSize: 14
            }
          },
          y: {
            grid:{
              display:false
            },

            ticks: {

              min: 0,
              max: 60,
              stepSize: 10,
              fontSize: 14

            }
          }
        }
      }
    });
  }




  data1: any = {
    labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021'],
    datasets: [{
      label: 'Weekly Sales',
      data: [18, 12, 6, 9, 12, 3, 9],
      backgroundColor: ['#FFF'],
      borderColor: ['#FA842F'],
      tension: 0.1
    }]
  };



  ngAfterViewInit() {
    this.renderChart();
  }

  renderChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    this.myChart = new Chart(ctx, {
      type: 'line',
      data: this.data,
      options: {
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }

  viewData(option: string) {

    if (option === 'day') {

    } else if (option === 'month') {
      const data = {
        labels: ['ewgf', 'reg', 'rgf', '2018', '2019', '2020', '2021'],
        datasets: [{
          label: 'Weekly Sales',
          data: [18, 12, 6, 9, 12, 3, 9],
          backgroundColor: [
            ' #FFF'
           ],
           borderColor:[

             ' #FA842F'

           ],
          // pointRadius:0,


          tension: 0.1
        }]
      };

    } else if (option === 'year') {

    }

    this.updateChart();
  }

  updateChart() {

    if (this.myChart) {
      this.myChart.destroy();
    }

    this.renderChart();
  }
  isOpen1:boolean = false;

  toggleSidebar1() {
    this.isOpen1 = !this.isOpen1;
  }

}

