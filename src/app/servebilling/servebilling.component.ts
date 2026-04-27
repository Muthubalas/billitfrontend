import { Component, OnInit,ChangeDetectorRef,Input } from '@angular/core';
import { DataService } from '../data.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdatememComponent } from '../updatemem/updatemem.component';
import { AddcustomerComponent } from '../addcustomer/addcustomer.component';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

import { AddcustomerserveComponent } from '../addcustomerserve/addcustomerserve.component';
import { EditprofileComponent } from '../editprofile/editprofile.component';
import { DatePipe } from '@angular/common';
interface User {
  _id: string;
  customer_name: string;
  customer_phone: string;
  customer_id: string;
  membership_no: string;
  gender:string;
  // ... other fields
}

@Component({
  selector: 'app-servebilling',
  templateUrl: './servebilling.component.html',
  styleUrls: ['./servebilling.component.css'],
  providers:[DatePipe]
})
export class ServebillingComponent implements OnInit {
  tableRows: string[] = [];
  ans: any;

  dynamicHeight: number = 350;
  defaultHeight: number = 271.999;
  payMode:string='';
  // subtotal: any ;
  discountrate:any=0;
  roundgst:any=0;

  membership_no: any;
  gender:any;
  customer_phone: any;
  customer_name: any;
  // gstamount: any;
  disrate:any=0;
  // value:any;
  // total: any;
  grandtotal: any;
  a:any; // or a!: User;
  getservbillids: any;
  getstafflist: any[] = [];
  // getservice: any;
  getservice: any[]=[];
  gstrate:any=0;
  keyword="service_name"
  selectedpro: string = '';
  item:any=[]
  b: any;
  c: any;
  selectpaymode: any;
  inv: any;
  date: any;
  formatdate: any;
  hrs: any;
  hr: any;
  noon: any;
  time: any;
  timestr: any;
  min: any;
  subt: any;
  showpay:boolean=false
  // cost:any=0;
  // roundgst: any;
  profilerole: any;
  token: any;
  helper=new JwtHelperService();
  profile: any;
  role: any;
  // onlinetot:any;
  // cash: any;
  // upi: any;

  subtotal: number = 0;
  value: number = 0;
  gstamount: number = 0;

  cash:any;
  upi: any;

  total: number = 0;
  pdfurl: string='';
  invoiceno: any;
  servecost: any;
  onlinepay: boolean=false;
  marvelannanagar:boolean=false;
  gstpercent: any;
  currentDate: string;
  // currentDate: string = '';
  newdate: Date | null = null;
  originalDate: any;
  formattedDate: string="";
  changeformat: any;
  savedate: any;
  receivedCusphno: any;
  minDate: string;
  rainbowmedia:boolean=false;
  marvelselaiyur:boolean=false;
  memoriesaddr:boolean=false;
  marvelmanapakaddr:boolean=false;
  marvelvelachery:boolean=false;
  marvelomraddr:boolean=false;
  dsaloon:boolean=false;
  blush:boolean=false;
  // servecost: any;
  // grandtotal: string = "0.00";
  constructor(private datas:DataService,private cdr: ChangeDetectorRef,private dialog:MatDialog,
    private router:Router,private auth:AuthService,public datapipe:DatePipe) {

      const datePipe = new DatePipe('en-US');
      this.currentDate = datePipe.transform(new Date(), 'yyyy-MM-dd')!;
      this.minDate = datePipe.transform(new Date(), 'yyyy-MM-dd')!;
      this.savedate=this.currentDate



     }

  ngOnInit(): void {
    if("https://chillbreezeomr-backend.billitnow.in/" ===this.datas.endpoint){
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
else if("https://marvelmanapakkam-backend.billitnow.in/"===this.datas.endpoint){
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
else if("https://marvelomr-backend.billitnow.in/"===this.datas.endpoint){
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
else if("https://marvel-ag-backend.billitnow.in/"===this.datas.endpoint){
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
else if("https://billitnow-backend.rainbowmedia.co.in/"===this.datas.endpoint){
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
else if("https://dsaloon-backend.billitnow.in/"===this.datas.endpoint){
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
else if("https://marvel-selaiyur-backend.billitnow.in/"===this.datas.endpoint){
  this.memoriesaddr=false;
  this.marvelmanapakaddr=false;
  this.marvelomraddr=false;
  this.marvelannanagar=false;
  this.rainbowmedia=false;
  this.marvelselaiyur=true;
  this.dsaloon=false;
  this.marvelvelachery=false;
   this.blush=false;
}
else if("https://velachery-backend.billitnow.in/"===this.datas.endpoint){
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
else if("https://blush-backend.billitnow.in/"===this.datas.endpoint){
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


this.datas.cusphno$.subscribe((cusphno) => {
  this.receivedCusphno = cusphno;
   this.customer_phone = this.customer_phone.trim();
  if (this.customer_phone.length == 10) {
  const url = this.receivedCusphno;

  this.datas.getcusdetails(url).subscribe(
    (result) => {
      this.a = result;
this.customer_name=this.a.details.customer_name;
this.membership_no=this.a.details.membership_no;
this.gender=this.a.details.gender;
if (this.membership_no !== "") {

  this.updateButtonVisibility();
}else{
  this.updateButtonVisibility1()
}
      this.cdr.detectChanges();
    })
  }
  else{

      this.customer_name='';
      this.membership_no = '';
this.gender= '';
  }
})

this.datas.cusphno1$.subscribe((cusphno) => {
  this.receivedCusphno = cusphno;

  const url = this.receivedCusphno

  this.datas.getcusdetails(url).subscribe(
    (result) => {


      this.a = result;
this.customer_name=this.a.details.customer_name;
this.membership_no=this.a.details.membership_no;
this.gender=this.a.details.gender;
if (this.membership_no !== "") {
  this.updateButtonVisibility();
}
      this.cdr.detectChanges();
    })

});



    this.token=localStorage.getItem('token')
    let decodetoken=this.helper.decodeToken(this.token)
    this.role=decodetoken.role;
    if(decodetoken.role=="0"){
      this.profilerole="Admin"
    }
    else{
      this.profilerole="Manager"
    }
    this.date=new Date();
    var year = this.date.getFullYear();
var month =this.date.getMonth() + 1;
var day =this. date.getDate();
this.formatdate=`${day}-${month}-${year}`;
this.hrs=this.date.getHours()
this.hr=this.hrs<10?'0'+this.hrs:this.hrs;
// console.log(this.hr);

const mins=this.date.getMinutes();
this.min=mins<10?'0'+mins:mins.toString();
// console.log(this.min);

this.noon=this.hr>=12?'PM':'AM';
this.time=this.hr+":"+this.min+" "+this.noon
this.timestr=this.time.toString()
    // this.item = [
    //   {
    //     select_items: "select product",
    //     quantity: 1,
    //     gender:'',
    //     service_price: 0,
    //     prodisc:0,
    //     amount: 0,
    //     cost:0,
    //     prod: null
    //   }
    // ];
    this.  getstaff()
    this.getservbillid()
// this.getdata()
this.getservicelist()
  }
  customFilter = function(products: any[], query: string): any[] {
    const lowerQuery = query.toLowerCase();
    return products.filter(prod => prod.service_name.toLowerCase().startsWith(lowerQuery));
  }
  updateButtonVisibility() {
    const add = document.querySelector('.plus');
    if (add) {
      add.innerHTML = '<button style="position: relative;display:none; right: -5px !important; top: 29px !important;  border-radius: 5px;background-color: #C28E02; border: none;color: white;"><i class="fa fa-plus" aria-hidden="true"  (click)="updatemem()"></i></button>';
    }
  }
  updateButtonVisibility1() {
    const add = document.querySelector('.plus');
    if (add) {
      add.innerHTML = '<button style="position: relative; right: -5px !important; top: 29px !important;  border-radius: 5px;background-color: #C28E02; border: none;color: white;"><i class="fa fa-plus" aria-hidden="true"  (click)="updatemem()"></i></button>';
    }
  }
  changedate(getdate:any){
this.originalDate=getdate.target.value;
this.savedate=this.originalDate
  }
public isDisabled: boolean = true;


toggleInputField() {
  this.isDisabled = !this.isDisabled;
}


  servebill(){
    this.router.navigate(['servebill'])
  }
  probill(){
    this.router.navigate(['product_bill'])
  }
  onfocused(e:any){

  }
  isOpen1:boolean = false;

  toggleSidebar1() {
    this.isOpen1 = !this.isOpen1;
  }
  selectevent(i:any,data:any){
    this.selectedpro=data;
    // console.log(this.selectedpro);
    this.item[i].service_price=data.service_price;
    data.quantity=1;
    // this.Quantity(i, data)
    this.item[i].cost = data.quantity * data.service_price;
    this.item[i].amount = this.item[i].cost;
    data.amount= this.item[i].cost;
    // console.log("amount",this.item[i].amount );

    // data.quantity=1;
    this.servecost=undefined;
    // this.item[i].amount = data.quantity * data.service_price;
    this.calculateSubtotal()
    this.cash="";
this.upi="";
    this.Quantity(i, data)
    // this.onServiceCostChange(i,data)
  }
  onKeywordChange(value: string) {

  }
  onchangesearch(event: Event){
  // console.log("RANDOM SEARCH:", event);

  }
  onServiceCostChange(index: number, rowData: any) {
    // console.log(`Changed service cost for row ${index + 1}: ${rowData.cost}`);
    this.item[index].amount = rowData.cost;
    this.servecost= rowData.cost;
    this.calculateSubtotal()
  }
  Quantity(i: any, data: any) {
    // console.log("service cost",this.servecost);
if(this.servecost!=undefined){
  this.item[i].cost = data.quantity * this.servecost;
  this.item[i].amount = this.item[i].cost;
}
else{
  this.cdr.detectChanges();
//   console.log(i);
// console.log(data);

  this.b=data.quantity;
//   console.log(data.quantity);
// console.log(data.service_price);
this.item[i].cost = data.quantity * data.service_price;
this.item[i].amount = this.item[i].cost;
  // this.item[i].amount = data.quantity * data.service_price;
  this.c=this.item[i].amount;
  // console.log(this.c);
}
this.cash="";
this.upi="";
    this.calculateSubtotal()

  }
  prodis(i:any,data:any){
// console.log(data.prodisc);
this.item[i].disper=data.prodisc;
// console.log(this.item[i].disper);

let discountamount=this.item[i].cost * (data.prodisc/100)
// console.log(discountamount);
this.item[i].amount=this.item[i].cost-discountamount;
// console.log(this.item[i].amount);
this.cash="";
this.upi="";
this. calculateSubtotal()

  }
  calculateSubtotal() {


    this.subt = this.item.reduce((total: number, currentItem: any) => total + currentItem.amount, 0);

    this.subtotal=this.subt.toFixed(2)
    this.discount()
}

discount(){
  // this.calculateSubtotal()
  if (!isNaN(this.subtotal)) {
  this.value=this.subtotal*(this.disrate/100)
  this.discountrate=this.value.toFixed(2)
  this.changegst();
  }
  }
  changegst(){
    if (!isNaN(this.subtotal) && !isNaN(this.value)) {
    this.gstamount=(this.subtotal)*(this.gstrate/100)

    this.roundgst=this.gstamount.toFixed(2)
     this.tt()
    }
    this.cash="";
    this.upi="";
  }
  tt(){
    this.total=this.subtotal-this.value+this.gstamount
    this.grandtotal=this.total.toFixed(2)
  }
  updateCash() {
    if (this.cash) {
      this.upi = parseFloat((this.grandtotal - this.cash).toFixed(2));
    } else {
      this.upi = parseFloat(this.grandtotal);
    }
  }

  updateUPI() {
    if (this.upi) {
      this.cash = parseFloat((this.grandtotal - this.upi).toFixed(2));
    } else {
      this.cash = parseFloat(this.grandtotal);
    }
  }

  onStaffSelection(i:any,data:any) {
    // console.log('Selected Country:', data.selectedCountry);
    this.item[i].name=data.selectedStaff;
    // console.log( this.item[i].name);

  }
  ongenderSelection(i:any,data:any){
    const selectedGender = data.target.value;

    this.item[i].selectedgender = selectedGender;
    // console.log( this.item[i].selectedgender);

  }
  selectpay(e:any){

    this.selectpaymode=e.target.value;
    // console.log(this.selectpaymode);

    if(this.selectpaymode=="cash and upi"){
this.showpay=true;
this.onlinepay=true;
    }
    else{
      this.showpay=false;
      this.onlinepay=false;
      this.cash= "";
      this.upi="";
    }
    // console.log(this.selectpaymode);

  }
  public num1: number = 0;
  public num2: number = 0;
  public result: number = 0;

  public addNumbers(): void {
    this.result = this.num1 + this.num2;
  }


@Input() sideNavOpen: boolean = false;


// sideNavOpen: boolean = false;

toggleSideNav() {
  this.sideNavOpen = !this.sideNavOpen;
}
isDropdownOpen1 = false;

  toggleDropdown1() {
    this.isDropdownOpen1 = !this.isDropdownOpen1;
  }
  logout(){
    this.router.navigate(['login'])
    this.datas.removeToken()

  }

getdata(){
  // const memdet = {
  //   customer_phone: this.customer_phone
  // };
  this.customer_phone = this.customer_phone.trim();
  if (this.customer_phone.length == 10) {
    const memdet = {
      customer_phone: this.customer_phone
    };

  const url = memdet.customer_phone

  // console.log(url);


  this.datas.getcusdetails(url).subscribe(
    (result) => {
      this.a = result;
      // console.log(this.a.details);
      if(this.a.details==null){
        this.dialog.open(AddcustomerserveComponent,{
          width:'792.336px',
      height: '526.996px',
      data: { phoneNumber: this.customer_phone },

        })

        // this.router.navigate(['addcustomer'])
      }


      // this.customer_name = this.a.customer_name;
      this.customer_name = this.a.details.customer_name;
      // console.log(this.customer_name);

      this.membership_no = this.a.details.membership_no;
      this.gender = this.a.details.gender;

      // console.log(this.a);
      if (this.membership_no === null || this.membership_no === "") {
        const add = document.querySelector('.plus');
        if (add) {
          add.innerHTML = '<button style="position: relative; right: -5px !important; top: 29px !important;  border-radius: 5px;background-color: #C28E02; border: none;color: white;"><i class="fa fa-plus" aria-hidden="true"  (click)="updatemem()"></i></button>';
        }
      } else {
        const add = document.querySelector('.plus');
        if (add) {
          add.innerHTML = ' ';
        }
      }
    },
    (error) => {
      console.error(error);
      // Handle the error as needed
    }
  );
  }
  else{
    this.customer_name='';
    this.membership_no = '';
     this.gender='';
  }
}
getservbillid(){
  return this.datas.getservebillid().subscribe((result:any)=>{
    this.getservbillids=result.serviceinvoice_no;
    // console.log(this.getservbillids);
    // this.service.controls['id'].setValue(this.getserviceids);
  })
 }
 getstaff(){
  return this.datas.getstaff().subscribe((result:any)=>{
    this.getstafflist=result.liststaff;
    // console.log(this.getstafflist);

  })
}
filteredServices = this.getservice;
getservicelist(){
  return this.datas.getservice().subscribe((result:any)=>{
    this.getservice=result.listserv;
    this.filteredServices=this.getservice
    // console.log(this.getservice);

  })
 }
 selectserv(i: any, event: any) {
  const inputValue = event.target.value.toLowerCase().replace(/\s/g, ''); // Remove spaces and ensure case-insensitivity
  this.filteredServices = this.getservice.filter(item =>
    item.service_name.toLowerCase().replace(/\s/g, '').startsWith(inputValue)
  );

  const data = this.filteredServices.find(item => item.service_name.toLowerCase().replace(/\s/g, '') === inputValue);
  this.item[i].prod = data ? data.service_name : '';

  if (data) {
    this.selectedpro = data;
    this.item[i].service_price = data.service_price;
    data.quantity = 1;
    this.item[i].cost = data.quantity * data.service_price;
    this.item[i].amount = this.item[i].cost;
    data.amount = this.item[i].cost;

    this.servecost = undefined;
    this.calculateSubtotal();
    this.cash = "";
    this.upi = "";
    this.Quantity(i, data);
  }
  else{
    this.item[i].cost ="";
    this.item[i].amount = 0;
    // data.amount =0;
    this.calculateSubtotal();
    this.Quantity(i, data);
  }
  // this.calculateSubtotal();
}
 PreviewInvoice(invoiceno: any) {
  this.invoiceno = invoiceno;
  this.datas.GenerateInvoicePDF(invoiceno).subscribe(res => {
    let blob: Blob = res.body as Blob;
    let url = window.URL.createObjectURL(blob);
    this.pdfurl = url;
    // this.modalservice.open(this.popupview, { size: 'lg' });
    //window.open(url);
  });
}
 selectpro(e:any){

 }
 editprofile(){

  this.token=localStorage.getItem('token')
  let decodetoken=this.helper.decodeToken(this.token)
  this.datas.findadminal(decodetoken.sub).subscribe(
    (result) => {
      this.profile=result;


            this.dialog.open(EditprofileComponent,{
              width:'792px',
              height:'381px',
          data:this.profile.findadmin

            })
    })
  }
 addRow() {
  this.item.push(
    {
      select_items: "",
      prod:'',
      quantity: 1,
      gender:'',
      service_price: 0,
      prodisc:0,
      amount: 0,
cost:0,
name:''
    }
  );
  this.tableRows.push(this.createTableRow(this.item.length - 1));
  this.updateFilteredServices();

}
updateFilteredServices() {
  if (this.item.length) {

    this.filteredServices = this.getservice;
  }
  // this.filteredServices = this.getservice.filter(item =>
  //   this.item.every((row:any) => row.prod !== item.service_name)
  // );
}

createTableRow(index: number): string {
  // if(this.servecost!=undefined){

      const item = this.item[index];
      // console.log(item);

      return `<tr>
      <td style="padding:2px 5px">${item.prod.service_name}</td>
      <td style="padding:2px 5px">${item.cost}</td>
      <td style="padding:2px 5px">${item.quantity}</td>

      <td style="padding:2px 5px">${item.amount}</td>

      </tr>`;

}

deleteRow(index: number) {
  this.item.splice(index, 1);
  this.tableRows.splice(index, 1);
  this.calculateSubtotal();
}
capitalizeFirstLetter(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}



updatemem(){
  this.dialog.open(UpdatememComponent,{
    width: '792px',
height: '250px',
data: { phoneNumber: this.customer_phone },
  })
}
isDropdownOpen = false;

toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
}

addcustomer(){
  this.dialog.open(AddcustomerComponent,{
    width:'792.336px',
height: '526.996px',
  })
 }




 async shortenUrl(longUrl: string): Promise<string> {
  const apiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`;
  
  try {
    const response = await fetch(apiUrl);
    return await response.text(); // TinyURL returns plain text instead of JSON
  } catch (error) {
    console.error("Error:", error);
    return "";
  }
}
sendBillViaWhatsApp(customerPhone: string, url: string): void {

  if (!customerPhone || !/^(\+\d{1,3}[- ]?)?\d{10}$/.test(customerPhone)) {
    // console.error('Invalid customer phone number');
    return;
  }

  const formattedPhone = customerPhone.startsWith('+') ? customerPhone : `+91${customerPhone}`;

  const whatsappMessage = `Hello! Your bill is ready. Click the link to view: ${url}`;
  const whatsappLink = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(whatsappMessage)}`;

  window.open(whatsappLink, '_blank');
}

sendingBillInProgress: boolean = false;

async sendServBill1() {
  // Check if sending bill is already in progress
  if (this.sendingBillInProgress) {
    return; // Exit function if already in progress
  }

  this.sendingBillInProgress = true; // Set flag to true indicating process has started

  let arr = [];

  for (let i = 0; i < this.item.length; i++) {
    let staffname = this.item[i].name;
    let gender = this.item[i].selectedgender;
    let proname = this.item[i].prod;

    if (!staffname || !proname || !gender) {
      Swal.fire({
        title: 'Warning',
        text: 'Please fill mandatory field',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    let proquantity = this.item[i].quantity || 0;
    let proamount = this.item[i].amount || 0;
    let cost = this.item[i].cost || 0;
    let discount = this.item[i].disper || 0;

    arr.push({
      service_name: proname,
      service_gender: gender,
      staffname: staffname,
      service_price: cost,
      quantity: proquantity,
      discount: discount,
      amount: proamount,
    });
  }

  let customername = this.customer_name ? this.customer_name : '';
   let gender = this.gender ? this.gender : '';
  customername = this.capitalizeFirstLetter(customername);
  let customerphone = this.customer_phone ? this.customer_phone : '';
  let membership = this.getservbillids ? this.getservbillids : '';
  let paymode = this.selectpaymode ? this.selectpaymode : '';

  if (customername !== '' && customerphone !== '' && paymode !== '' && arr.length > 0 && this.getservbillids !== '') {
    if (isNaN(this.grandtotal)) {
      alert("please put the bill correctly")
      window.location.reload()
       }else{
    let data: any;
    if (paymode === "cash and upi") {
      if(this.cash && this.upi!==""){
      data = {
        payment_mode:paymode,
        customer_name: customername,
        gender:gender,
        customer_phone:customerphone,
        invoice_no: this.getservbillids,
        sub_total:this.subtotal,
        // discount:this.discountrate,
        gst: this.roundgst,
        cash:  this.cash,
        upi: this.upi,
        total:this.grandtotal,
        service_details: arr,
        date:this.savedate,
        membership_no:this.membership_no
      };
      const shortenedUrl = await this.shortenUrl(this.generateBillUrl1());
      this.sendBillViaWhatsApp(this.customer_phone, shortenedUrl);
      this.datas.saveservinvoice(data).subscribe((result:any)=>{
        this.inv=result
        this.sendingBillInProgress = false;
window.location.reload()
      })
    }else{
      Swal.fire({
        title: 'Warning',
        text: 'Please fill cash and upi',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
    } else {
      data = {
        payment_mode:paymode,
        customer_name: customername,
        customer_phone:customerphone,
        gender:gender,
        invoice_no: this.getservbillids,
        sub_total:this.subtotal,
        // discount:this.discountrate,
        gst: this.roundgst,
        cash: "",
        upi:"",
        total:this.grandtotal,
        service_details: arr,
        date:this.savedate,
        membership_no:this.membership_no
      };
      const shortenedUrl = await this.shortenUrl(this.generateBillUrl1());
      this.sendBillViaWhatsApp(this.customer_phone, shortenedUrl);
      this.datas.saveservinvoice(data).subscribe((result:any)=>{
        this.inv=result
        this.sendingBillInProgress = false;
window.location.reload()
      })
    }
  }
  } else {
    Swal.fire({
      title: 'Warning',
      text: 'Please fill mandatory field',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
  }
}


generateBillUrl1(): string {
  let params = new URLSearchParams();

  params.append('payment_mode', this.selectpaymode);
  params.append('customer_name', this.capitalizeFirstLetter(this.customer_name || ''));
  params.append('customer_phone', this.customer_phone || '');
   params.append('gender', this.gender || '');
  params.append('invoice_no', this.getservbillids || '');
  params.append('sub_total', this.subtotal.toString());
  params.append('gst', this.roundgst);
  params.append('total', this.grandtotal);
  params.append('date', this.savedate);
  this.gstpercent = this.gstrate || 0;
  params.append('gst_percent', this.gstpercent)
  params.append('membership_no', this.membership_no)
  params.append('cash', this.cash)
  params.append('upi', this.upi)
  params.append('service_details', JSON.stringify(this.item.map((item:any) => ({
    service_name: item.prod,
    service_gender: item.selectedgender,
    staffname: item.name,
    service_price: item.cost || 0,
    quantity: item.quantity || 0,
    discount: item.disper || 0,
    amount: item.amount || 0,
  }))));


  return this.datas.endpoint + "/servpdf?" + params.toString();
}
printInvoice() {
  const invoiceInput = document.getElementById("print-space") as HTMLInputElement;
  const screen = document.getElementById("probilldetail") as HTMLInputElement;
  const top = document.getElementById("top1") as HTMLInputElement;
  const trail = document.getElementById("trail") as HTMLInputElement;

  // Hide unnecessary elements before printing
  invoiceInput.style.display = "block";
  screen.style.visibility = "hidden";
  top.style.visibility = "hidden";
  trail.style.visibility = "hidden";

  // Perform printing
  window.print();

  // Restore visibility of elements after printing
  invoiceInput.style.display = "none";
  screen.style.visibility = "visible";
  top.style.visibility = "visible";
  trail.style.visibility = "visible";
}

// Function to handle saving and printing of service invoice
saveAndPrintServiceInvoice() {
  this.tableRows = [];
  if (this.sendingBillInProgress) {
    return; // Exit function if already in progress
  }

  this.sendingBillInProgress = true; // Set flag to true indicating process has started

  // Prepare table rows for invoice
  for (let i = 0; i < this.item.length; i++) {
    this.tableRows.push(this.createTableRow1(i));
  }

  // Display the table content in the invoice
  const tabledata = document.getElementById("tbody") as HTMLInputElement;
  tabledata.innerHTML = this.tableRows.join("");

  // Validate mandatory fields before proceeding
  if (!this.validateMandatoryFields()) {
    Swal.fire({
      title: 'Warning',
      text: 'Please fill the mandatory fields',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
    this.sendingBillInProgress = false;
    return;
  }

  // Prepare data for saving service invoice
  const serviceDetails = this.prepareServiceDetails();
  const paymentMode = this.selectpaymode ? this.selectpaymode : "";
  const customerName = this.capitalizeFirstLetter(this.customer_name ? this.customer_name : "");
  const customerPhone = this.customer_phone ? this.customer_phone : "";
  const membershipNo = this.getservbillids ? this.getservbillids : "";

  const data = {
    payment_mode: paymentMode,
    customer_name: customerName,
    customer_phone: customerPhone,
    gender:this.gender,
    invoice_no: membershipNo,
    sub_total: this.subtotal,
    discount: this.discountrate,
    gst: this.roundgst,
    cash: paymentMode === "cash and upi" ? this.cash : "",
    upi: paymentMode === "cash and upi" ? this.upi : "",
    total: this.grandtotal,
    service_details: serviceDetails,
    date: this.savedate,
    membership_no: membershipNo
  };

  // Save service invoice
  this.datas.saveservinvoice(data).subscribe((result: any) => {
    this.inv = result;

    // Print invoice after saving
    this.printInvoice();

    // Reload the page
    window.location.reload();
  });
}

// Function to validate mandatory fields
validateMandatoryFields() {
  return (this.customer_name && this.customer_phone && this.selectpaymode && this.item.length > 0 && this.getservbillids);
}

// Function to prepare service details for saving
prepareServiceDetails() {
  const arr = [];
  for (let i = 0; i < this.item.length; i++) {
    const item = this.item[i];
    const staffName = item.name;
    const gender = item.selectedgender;
    const serviceName = item.prod;
    const quantity = item.quantity || 0;
    const amount = item.amount || 0;
    const cost = item.cost || 0;
    const discount = item.disper || 0;

    if (!staffName || !serviceName || !gender) {
      return null; // Exit function if mandatory fields are missing
    }

    arr.push({
      service_name: serviceName,
      service_gender: gender,
      staffname: staffName,
      service_price: cost,
      quantity: quantity,
      discount: discount,
      amount: amount
    });
  }
  return arr;
}
printservbill1(){
  this.tableRows = [];
  if (this.sendingBillInProgress) {
    return; // Exit function if already in progress
  }

  this.sendingBillInProgress = true; // Set flag to true indicating process has started

  for (let i = 0; i < this.item.length; i++) {
    this.tableRows.push(this.createTableRow1(i));
  }

  // Display the table content in the invoice
  const tabledata = document.getElementById("tbody") as HTMLInputElement;
  tabledata.innerHTML = this.tableRows.join("");

  let arr=[];


  for(let i=0;i<this.item.length;i++){

      let staffname = this.item[i].name;


      let gender = this.item[i].selectedgender;
      let proname = this.item[i].prod;


      // let proname =  this.item[i].prod.service_name;
      if (!staffname || !proname || !gender) {

        Swal.fire({
          title: 'Warning',
          text: 'Please fill mandatory fields',
          icon: 'warning',
          confirmButtonText: 'OK'
        });
        return;
      }
      let proquantity = this.item[i].quantity || 0;
      let proamount = this.item[i].amount || 0;

      let cost=this.item[i].cost || 0;
      let discount=this.item[i].disper||0;
     arr.push({
      service_name:proname,
      service_gender:gender,
      staffname:staffname,
      service_price:cost,
      quantity:proquantity,
      discount:discount,
      amount:proamount,

    })


    }

    let customername=this.customer_name?this.customer_name:"";
     customername=this.capitalizeFirstLetter(customername);

    let customerphone=this.customer_phone?this.customer_phone:"";
    let gender=this.gender;
    let membership=this.getservbillids?this.getservbillids:"";
    let paymode=this.selectpaymode?this.selectpaymode:"";
    if(customername!='' && customerphone!='' && paymode!='' && arr.length > 0 && this.getservbillids!=""){
    var currentdate=new Date()
    if (isNaN(this.grandtotal)) {
      alert("please put the bill correctly")
      window.location.reload()
       }else{
    let data: any;

    if (paymode === "cash and upi") {
      if(this.cash && this.upi!==""){
      data = {
        payment_mode:paymode,
        customer_name: customername,
        customer_phone:customerphone,
        gender:gender,
        invoice_no: this.getservbillids,
        sub_total:this.subtotal,
        discount:this.discountrate,
        gst: this.roundgst,
        cash:  this.cash,
        upi: this.upi,
        total:this.grandtotal,
        service_details: arr,
        date:this.savedate,
        membership_no:this.membership_no
      };
      this.datas.saveservinvoice(data).subscribe((result:any)=>{
        this.inv=result

        const invoiceInput = document.getElementById("print-space") as HTMLElement;
        const screen = document.getElementById("probilldetail") as HTMLElement;
        const top = document.getElementById("top1") as HTMLElement;
        const trail = document.getElementById("trail") as HTMLElement;
        invoiceInput.style.display="block"

         screen.style.visibility="hidden"
         top.style.visibility="hidden"
         trail.style.visibility="hidden"
         this.sendingBillInProgress = false;
         window.print()
         invoiceInput.style.display="none"

         screen.style.visibility="visible"
         top.style.visibility="visible"
         trail.style.visibility="visible"
         window.location.reload()
      })
    }
    else{
      Swal.fire({
        title: 'Warning',
        text: 'Please fill cash and upi',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
    } else {
      data = {
        payment_mode:paymode,
        customer_name: customername,
        customer_phone:customerphone,
        invoice_no: this.getservbillids,
        sub_total:this.subtotal,
        discount:this.discountrate,
        gst: this.roundgst,
        cash: "",
        upi:"",
        total:this.grandtotal,
        service_details: arr,
        date:this.savedate,
        membership_no:this.membership_no
      };
      this.datas.saveservinvoice(data).subscribe((result:any)=>{
        this.inv=result
        const invoiceInput = document.getElementById("print-space") as HTMLElement;
        const screen = document.getElementById("probilldetail") as HTMLElement;
        const top = document.getElementById("top1") as HTMLElement;
        const trail = document.getElementById("trail") as HTMLElement;
        invoiceInput.style.display="block"

         screen.style.visibility="hidden"
         top.style.visibility="hidden"
         trail.style.visibility="hidden"
         this.sendingBillInProgress = false;
         window.print()
         invoiceInput.style.display="none"

         screen.style.visibility="visible"
         top.style.visibility="visible"
         trail.style.visibility="visible"
         window.location.reload()

      })
    }
  }







}

else{
  Swal.fire({
    title: 'Warning',
    text: 'Please fill the mandatory field',
    icon: 'warning',
    confirmButtonText: 'OK'
  })
}
}

generateTableRows(): string {
  let tableRows = '';
  for (let i = 0; i < this.item.length; i++) {
    tableRows += this.createTableRow1(i);
  }
  return tableRows;
}

createTableRow1(index: number): string {
  // if(this.servecost!=undefined){

      const item = this.item[index];
      // console.log(item);

      return `<tr>
      <td style="padding:2px 5px">${item.prod}</td>
      <td style="padding:2px 5px">${item.cost}</td>
      <td style="padding:2px 5px">${item.quantity}</td>

      <td style="padding:2px 5px">${item.amount}</td>

      </tr>`;

}




printBill() {

  let arr = [];
  let arr1 = [];

  for (let i = 0; i < this.item.length; i++) {
    // Extract data for API call
    let staffname = this.item[i].name;
    let gender = this.item[i].selectedgender;
    let proname = this.item[i].prod;
    let proquantity = this.item[i].quantity || 0;
    let proamount = this.item[i].amount || 0;
    let cost = this.item[i].cost || 0;
    let discount = this.item[i].disper || 0;

    if (!staffname || !proname || !gender) {
      Swal.fire({
        title: 'Warning',
        text: 'Please fill mandatory fields',
        icon: 'warning',
        confirmButtonText: 'OK'
      });

      return;
    }

    arr.push({
      service_name: proname,
      service_gender: gender,
      staffname: staffname,
      service_price: cost,
      quantity: proquantity,
      discount: discount,
      amount: proamount,
    });
  }

  // Prepare data for API call
  let customername = this.customer_name ? this.capitalizeFirstLetter(this.customer_name) : "";
  let customerphone = this.customer_phone ? this.customer_phone : "";
  let gender=this.gender;
  let membership = this.getservbillids ? this.getservbillids : "";
  let paymode = this.selectpaymode ? this.selectpaymode : "";

  if (customername !== '' && customerphone !== '' && paymode !== '' && arr.length > 0 && this.getservbillids !== "") {
    let data = {
      payment_mode: paymode,
      customer_name: customername,
      customer_phone: customerphone,
      gender:gender,
      invoice_no: this.getservbillids,
      sub_total: this.subtotal,
      discount: this.discountrate,
      gst: this.roundgst,
      cash: paymode === "cash and upi" ? this.cash : "",
      upi: paymode === "cash and upi" ? this.upi : "",
      total: this.grandtotal,
      service_details: arr,
      date: this.savedate,
      membership_no: this.membership_no
    };
    if (paymode === "cash and upi" && !data.cash && !data.upi) {
      Swal.fire({
        title: 'Warning',
        text: 'Please provide either cash or upi',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    // Call API
    this.datas.saveservinvoice(data)
    .subscribe(
      (result: any) => {
        console.log(result);

        // After successful API call, proceed with printing
        let printContents = document.getElementById('print-space')!.innerHTML;
        let printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.open();
          printWindow.document.write(`
            <html>
              <head>
                <title>Print Page</title>
                <style>
            #internal-print-space {
              font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
              font-weight: bolder;
              width: 80mm;
              margin: 5mm;
            }
            @import url('http://fonts.cdnfonts.com/css/vcr-osd-mono');
  #internal-print-space{

  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-weight: bolder;
  }
  #internal-print-space p{
    margin-block: 0 !important;
  }

  .print-data-section {
    margin-top: 30px !important;
  }

  #internal-print-space table {
    margin: 15px 0 15px 0 !important;
    width: 100% !important;
    border-top: 2px solid;
    border-bottom: 2px solid;
  }

  #internal-print-space table tbody{
    border-top: 2px solid;
  }
  #internal-print-space table {
    border-collapse: collapse; /* Add this line to collapse table borders */
  }

  #internal-print-space table td {
    padding: 2px 5px;
    font-weight: bolder;
    // border-top: 2px solid;
  }
  #tbody#SelExample{
  width:100px;
  }
  #internal-print-space{
    width: 80mm;
    margin: 5mm;
    /* width: 229mm;
    margin: 55mm; */
  }

  #internal-print-space th{
  padding: 2px 5px;
  }
  .print-main-text{
  font-size: 28px;
  font-weight: bold;
  text-transform: uppercase;
  padding-bottom:5px ;
  }
  .print-sub-text{
  font-size: 17px;
  font-weight: 800;
  }
  .print-common-text{
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 17px;
  }
  .tga {
  margin-right: 10px;
  }

  .na span {
  font-weight: 700;
  border-top: 1px solid;
  border-bottom: 1px solid;
  padding: 2px;
  }
  .na {

  font-size: 15px;
  text-align: left;
  font-weight: bold;
  margin-right: 10px;
  }
  #thank{
  padding-top: 10px;
  text-align: center;
  }
  #grossSpan,#cgstSpan,#sgstSpan,#netSpan{
  text-align: right;
  }
  .calc{
  width:88%;
  display: flex;
  justify-content: space-between
  }
  .tga,.na{
  width:140px;
  }
  #colon{
  flex:10%;
  }
  #netSpan{
  border-top: 1px dashed #000;
  border-bottom: 1px dashed #000;
  font-weight: 800;
  }
  #amt{
  text-align: left;
  }
  /* #price,#tot{
  text-align: right;
  } */
  @media print {

  @page {
    margin: 0;
  }

  body {
    margin: 0;
  }
  }
  @media print {
  .page-container {
    visibility: hidden;
  }
  #internal-print-space {
   visibility: visible;
    position: absolute;
    left: 0;
    top: 0;
  }
  }
            /* Add other CSS styles here */
          </style>
              </head>
              <body>${printContents}</body>
            </html>`
          );
          printWindow.document.close();
          printWindow.print();
          window.location.reload();
        } else {
          console.error("Failed to open the print window.");
        }
      },
      (error) => {
        console.error('API call failed:', error);
        // Optionally handle errors
        Swal.fire({
          title: 'Error',
          text: 'API call failed',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  } else {
    Swal.fire({
      title: 'Warning',
      text: 'Please fill mandatory fields',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
  }
}


}



















































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































