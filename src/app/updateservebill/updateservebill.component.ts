import { Component, OnInit,Input,ChangeDetectorRef} from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-updateservebill',
  templateUrl: './updateservebill.component.html',
  styleUrls: ['./updateservebill.component.css'],
  providers:[DatePipe]
})
export class UpdateservebillComponent implements OnInit {
  receivedData: any;
  tableRows: string[] = [];
  ans: any;
  payMode:any;
  subtotal: any ;
  discountrate:any=0;
  roundgst:any=0;
  showpay:boolean=false;
  dynamicHeight: number = 350;
  defaultHeight: number = 271.999;
  membership_no: any;
  customer_phone: any;
  customer_name: any;
  gstamount: any;
  disrate:any=0;
  value:any;
  total: any;
  grandtotal: any;
  a:any; // or a!: User;
  getservbillids: any;
  getstafflist: any[] = [];
  // getservice: any;
  getservice: any[]=[];
  gstrate:any=0;
  keyword="service_name"
  selectedpro:any;
  item:any=[]
  newRow:any=[]
  b: any;
  c: any;
  selectpaymode: any;
  selectedInvoice: any;
  sel: any;
  sername: any;
  selectedpros: any;
  subt: any;
  serviceprice: any;
  datalist: any;
  helper=new JwtHelperService();

  token: any;
  profilerole: any;
  role: any;
  servicecost: any;
  onlinepay: boolean=false;
  gstpercent: any;
  minDate:string;
  rainbowmedia:boolean=false;
  memoriesaddr:boolean=false;
  marvelmanapakaddr:boolean=false;
  marvelannanagar:boolean=false;
  marvelomraddr:boolean=false;
  marvelvelachery:boolean=false;
  marvelselaiyur:boolean=false;
  dsaloon:boolean=false;
  blush:boolean=false;
  constructor(private data:DataService,private router:Router,private cdr: ChangeDetectorRef,
    private auth:AuthService,public datepipe:DatePipe) {
      this.minDate = datepipe.transform(new Date(), 'yyyy-MM-dd')!;
  }

  ngOnInit(): void {
    if("https://chillbreezeomr-backend.billitnow.in/" ===this.data.endpoint){
      this.memoriesaddr=true;
      this.marvelmanapakaddr=false;
      this.marvelomraddr=false;
      this.marvelannanagar=false;
      this.rainbowmedia=false;
      this.marvelvelachery=false;
      this.dsaloon=false;
      this.marvelselaiyur=false;
       this.blush=false;
    }
    else if("https://marvelmanapakkam-backend.billitnow.in/"===this.data.endpoint){
      this.memoriesaddr=false;
      this.marvelmanapakaddr=true;
      this.marvelomraddr=false;
      this.marvelannanagar=false;
      this.rainbowmedia=false;
      this.marvelvelachery=false;
      this.dsaloon=false;
      this.marvelselaiyur=false;
       this.blush=false;
    }
    else if("https://marvelomr-backend.billitnow.in/"===this.data.endpoint){
      this.memoriesaddr=false;
      this.marvelmanapakaddr=false;
      this.marvelomraddr=true;
      this.marvelannanagar=false;
      this.rainbowmedia=false;
      this.marvelvelachery=false;
      this.dsaloon=false;
      this.marvelselaiyur=false;
       this.blush=false;
    }
    else if("https://marvel-ag-backend.billitnow.in/"===this.data.endpoint){
      this.memoriesaddr=false;
      this.marvelmanapakaddr=false;
      this.marvelomraddr=false;
      this.marvelannanagar=true;
      this.rainbowmedia=false;
      this.marvelvelachery=false;
      this.dsaloon=false;
      this.marvelselaiyur=false;
       this.blush=false;
    }
    else if("https://billitnow-backend.rainbowmedia.co.in/"===this.data.endpoint){
      this.memoriesaddr=false;
      this.marvelmanapakaddr=false;
      this.marvelomraddr=false;
      this.marvelannanagar=false;
      this.rainbowmedia=true;
      this.marvelvelachery=false;
      this.dsaloon=false;
      this.marvelselaiyur=false;
       this.blush=false;
    }
    else if("https://dsaloon-backend.billitnow.in/"===this.data.endpoint){
      this.memoriesaddr=false;
      this.marvelmanapakaddr=false;
      this.marvelomraddr=false;
      this.marvelannanagar=false;
      this.rainbowmedia=false;
      this.marvelvelachery=false;
      this.dsaloon=true;
      this.marvelselaiyur=false;
       this.blush=false;
    }
    else if("https://marvel-selaiyur-backend.billitnow.in/"===this.data.endpoint){
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
    else if("https://velachery-backend.billitnow.in/"===this.data.endpoint){
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
    else if("https://blush-backend.billitnow.in/"===this.data.endpoint){
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
    this.role=decodetoken.role
    if(decodetoken.role=="0"){
      this.profilerole="Admin"
    }
    else{
      this.profilerole="Manager"
    }
    this.selectedInvoice = this.data.selectedInvoice;
    if (this.selectedInvoice && this.selectedInvoice.service_details) {
        this.selectedInvoice.service_details.forEach((detail:any) => {
          detail.sp = detail.service_price; // Rename service_price to sp
          delete detail.service_price;


        });
      }
      if(this.selectedInvoice.payment_mode=="cash and upi"){
        this.showpay=true;
        this.onlinepay=true;
        }
        else{
          this.onlinepay=false;
          this.selectedInvoice.cash_amount="";
          this.selectedInvoice.UPI_amount=""
          this.showpay=false;
        }
        this.gstrate = Math.round((this.selectedInvoice.gst / this.selectedInvoice.sub_total) * 100);

    // let  serviceprice=this.selectedInvoice.service_details[i].sp

    const newRow = {
      service_name: '',
      staff_name: '',
      quantity: 0,
      service_price: 0,
      amount: 0,
    };

    // this.selectedInvoice.service_details.push(newRow);
this.getdata()
this.getservicelist()
this.getstaff()
  }
  changedate(getdate:any){
    this.selectedInvoice.date=getdate.target.value;
  }
addy(){
  const newRow = {
    select_items: " ",
    staff_name: '',
    quantity: 1,
    sp: 0,
    amount: 0,
    discount:0

  };

  this.selectedInvoice.service_details.push(newRow);
  // this. updatebill()
  // this.tableRows.push(this.createTableRow(this.item.length - 1));
  // this.updateTotalItem();
  this.updateFilteredServices();

}
updateFilteredServices() {
  this.filteredServices = this.getservice.filter(item =>
    this.item.every((row:any) => row.prod !== item.service_name)
  );
}
createTableRow(index: number): string {
  const item =this.selectedInvoice.service_details[index];
  const prodname = item.service_name;
  const productName = prodname && prodname.service_name  ? prodname.service_name : prodname ;
  return `<tr>
     <td style="padding:2px 5px">${productName}</td>

     <td style="padding:2px 5px">${item.sp}</td>
     <td style="padding:2px 5px">${item.quantity}
     <td style="padding:2px 5px">${item.amount}</td>

  </tr>`;
}
getservicelist(){
  return this.data.getservice().subscribe((result:any)=>{
    this.getservice=result.listserv;
    this.filteredServices=this.getservice

  })
 }
 ongenderSelection(i:any,data:any){
  const selectedGender = data.target.value;
  this.selectedInvoice.service_details[i].service_gender=selectedGender;
  // this.item[i].selectedgender = selectedGender;
  // console.log( this.item[i].selectedgender);

}
getstaff(){
  return this.data.getstaff().subscribe((result:any)=>{
    this.getstafflist=result.liststaff;


  })
}

  customFilter = function(products: any[], query: string): any[] {
    const lowerQuery = query.toLowerCase();
    return products.filter(service_name => service_name.service_name.toLowerCase().startsWith(lowerQuery));
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
  this.data.removeToken()

}

  onfocused(e:any){

  }
  // Inside your component code
  updateCash() {
    if (this.selectedInvoice.cash_amount) {
      this.selectedInvoice.UPI_amount = parseFloat((this.selectedInvoice.total - this.selectedInvoice.cash_amount).toFixed(2));
    } else {
      this.selectedInvoice.UPI_amount = parseFloat(this.selectedInvoice.total);
    }
  }

  updateUPI() {
    if (this.selectedInvoice.UPI_amount) {
      this.selectedInvoice.cash_amount = parseFloat((this.selectedInvoice.total - this.selectedInvoice.UPI_amount).toFixed(2));
    } else {
      this.selectedInvoice.cash_amount = parseFloat(this.selectedInvoice.total);
    }
  }

  select(i:any,e:any){
    this.sel=e.target.value;


    }
    filteredServices=this.getservice
  selectevent(i:any,data:any){
    this.selectedpro=data;

    if(this.selectedInvoice.service_details[i].quantity){
      this.selectedInvoice.service_details[i].sp =this.selectedInvoice.service_details[i].quantity*this.selectedpro.service_price;
      this.selectedInvoice.service_details[i].amount =this.selectedInvoice.service_details[i].quantity* data.service_price;
    }else{
          data.quantity=1;
          this.selectedInvoice.service_details[i].sp =this.selectedpro.service_price;
          this.selectedInvoice.service_details[i].amount =this.selectedInvoice.service_details[i].quantity* data.service_price;
    }
this.servicecost=undefined;
    this.selectedInvoice.service_details[i].service_price=data.service_price;
    this.selectedInvoice.cash_amount="";
    this.selectedInvoice.UPI_amount=""
    this.calculateSubtotal()
  }
  selectserv(i: any, event: any) {
    const inputValue = event.target.value.toLowerCase().replace(/\s/g, ''); // Ensure case-insensitivity
    this.filteredServices = this.getservice.filter(item =>
      item.service_name.toLowerCase().replace(/\s/g, '').startsWith(inputValue)
    );

    const data = this.filteredServices.find(item => item.service_name.toLowerCase().replace(/\s/g, '') === inputValue);

    // const inputValue = event.target.value.toLowerCase(); // Ensure case-insensitivity
    // this.filteredServices = this.getservice.filter(item =>
    //   item.service_name.toLowerCase().startsWith(inputValue)
    // );

    // console.log('filteredServices:', this.filteredServices);

    // const data = this.filteredServices.find(item => item.service_name.toLowerCase() === inputValue);

    console.log('data:', data);

    if (data) {
      this.selectedpro=data;
      if(this.selectedInvoice.service_details[i].quantity){
        this.selectedInvoice.service_details[i].sp =this.selectedInvoice.service_details[i].quantity*this.selectedpro.service_price;
        this.selectedInvoice.service_details[i].amount =this.selectedInvoice.service_details[i].quantity* data.service_price;
      }else{
            data.quantity=1;
            this.selectedInvoice.service_details[i].sp =this.selectedpro.service_price;
            this.selectedInvoice.service_details[i].amount =this.selectedInvoice.service_details[i].quantity* data.service_price;
      }
  this.servicecost=undefined;
      this.selectedInvoice.service_details[i].service_price=data.service_price;
      this.selectedInvoice.cash_amount="";
      this.selectedInvoice.UPI_amount=""
      this.calculateSubtotal()
    }
    else{
      this.servicecost=undefined;
      this.selectedInvoice.service_details[i].service_price=0;
      this.selectedInvoice.cash_amount="";
      this.selectedInvoice.UPI_amount=""
      this.selectedInvoice.service_details[i].sp =0
      this.selectedInvoice.service_details[i].amount =0;
      this.calculateSubtotal()
     }
  }
  onKeywordChange(value: string) {

  }
  onchangesearch(event: Event){

  }


  updateServicePriceAndCalculate(i: any, quantity: number, servicePrice: number) {
    this.serviceprice = servicePrice;
    this.selectedInvoice.service_details[i].sp = quantity * this.serviceprice;
  }
  onServiceCostChange(index: number, rowData: any) {
    this.selectedInvoice.service_details[index].amount=rowData.sp;
    this.servicecost=rowData.sp;
    this.selectedInvoice.cash_amount="";
    this.selectedInvoice.UPI_amount=""
    this.calculateSubtotal()
  }
  Quantity(i: any, data: any) {
if(this.servicecost!=undefined){
  this.selectedInvoice.service_details[i].sp=data.quantity*this.servicecost;
  this.selectedInvoice.service_details[i].amount =data.quantity*this.servicecost;
}
else{
  if(data.service_name){
  this.data.getquantityserve(data.service_name).subscribe((result:any)=>{
    this.datalist=result.details;
    this.serviceprice=this.datalist[0].service_price;
    this.serviceprice=result.details[0].service_price;
    this.selectedInvoice.service_details[i].sp=data.quantity*this.serviceprice;

    this.selectedInvoice.service_details[i].amount =  this.selectedInvoice.service_details[i].sp;
    this.calculateSubtotal()
    this. prodis(i,data)
  })

}
else{
  this.selectedInvoice.service_details[i].sp=data.quantity*this.selectedInvoice.service_details[i].service_price;
//  this.selectedInvoice.service_details[i].sp = data.quantity * data.service_price;
//     this.selectedInvoice.service_details[i].amount = data.quantity * data.service_price;
}
this.selectedInvoice.service_details[i].sp = data.quantity * data.service_price;
    this.selectedInvoice.service_details[i].amount = data.quantity * data.service_price;
}
this.selectedInvoice.cash_amount="";
this.selectedInvoice.UPI_amount=""
      this.calculateSubtotal()
      // this. prodis(i,data)
  }
  prodis(i:any,data:any){
    this.selectedInvoice.service_details[i].disno=data.discount;
  let discountamount= this.selectedInvoice.service_details[i].sp * (data.discount/100)
  this.selectedInvoice.service_details[i].amount= this.selectedInvoice.service_details[i].sp-discountamount;
  this.calculateSubtotal()
  this.selectedInvoice.cash_amount="";
  this.selectedInvoice.UPI_amount=""
  }
  calculateSubtotal() {
    this.subt = this.selectedInvoice.service_details.reduce((total: number, currentItem: any) => total + parseFloat(currentItem.amount || 0), 0);
    this.selectedInvoice.sub_total = this.subt.toFixed(2);
    this.changegst();
  }

//   calculateSubtotal() {

//     this.subt = this.selectedInvoice.service_details.reduce((total: number, currentItem: any) => total + currentItem.amount, 0);
//     // console.log(this.selectedInvoice.sub_total);
//     this.selectedInvoice.sub_total=  this.subt.toFixed(2)
//     this.changegst()
// }

discount(){
  // this.calculateSubtotal()
  if (!isNaN(this.selectedInvoice.sub_total)) {
  this.value=this.selectedInvoice.sub_total*(this.disrate/100)
 this.selectedInvoice.discount=this.value.toFixed(2)
  this.changegst();
  }
  }
  changegst(){
    if (!isNaN(this.selectedInvoice.sub_total)) {
    this.gstamount=(this.selectedInvoice.sub_total)*(this.gstrate/100)

    this.selectedInvoice.gst=this.gstamount.toFixed(2)
     this.tt()
    }
    this.selectedInvoice.cash_amount="";
    this.selectedInvoice.UPI_amount=""

  }
  tt(){
const subTotal = parseFloat(this.selectedInvoice.sub_total);
const gstAmount = parseFloat(this.selectedInvoice.gst);

// Check if conversion was successful
if (!isNaN(subTotal) && !isNaN(gstAmount)) {
this.total = subTotal + gstAmount;
this.selectedInvoice.total = this.total.toFixed(2);
}

  }

isOpen1:boolean = false;

toggleSidebar1() {
  this.isOpen1 = !this.isOpen1;
}
  onStaffSelection(i:any,data:any) {
    // console.log('Selected Country:', data.selectedCountry);
    this.item[i].name=data.selectedStaff;
  }
  selectpay(e:any){
    this.selectedInvoice.payment_mode=e.target.value;
    if(this.selectedInvoice.payment_mode=="cash and upi"){
      this.showpay=true;
      this.onlinepay=true;
      }
      else{
        this.showpay=false;
        this.onlinepay=false;
        this.selectedInvoice.cash_amount="";
        this.selectedInvoice.UPI_amount=""
      }

  }



  deleteRow(index: number) {
    this.selectedInvoice.service_details.splice(index, 1);
    this.calculateSubtotal()

  }

  getdata() {
    const memdet = {
      customer_phone: this.selectedInvoice.customer_phone
    };

    const url = memdet.customer_phone;

    this.data.getcusdetails(url).subscribe(
      (result) => {
        this.a = result;

        // Check if membership details are available
        if (this.a && this.a.details) {
          this.selectedInvoice.customer_name = this.a.details.customer_name;
          this.selectedInvoice.membership_no = this.a.details.membership_no;
        } else {
          console.log('No details or membership information available.');
        }
      },
      (error) => {
        console.error(error);

      }
    );
  }
  capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

onClick(): void {
  this.sendservbill();
  this.secondFunction();
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

generateBillUrl(): string {
  let params = new URLSearchParams();

  params.append('payment_mode', this.selectedInvoice.payment_mode);
  params.append('customer_name', this.selectedInvoice.customer_name);
  params.append('customer_phone', this.selectedInvoice.customer_phone);
  params.append('invoice_no', this.selectedInvoice.invoice_no);
  params.append('sub_total', this.selectedInvoice.sub_total.toString());
  params.append('gst', this.selectedInvoice.gst);
  params.append('total', this.selectedInvoice.total);
  params.append('date', this.selectedInvoice.date);

   params.append('membership_no', this.selectedInvoice.membership_no)
      params.append('cash',this.selectedInvoice.cash_amount)
      params.append('upi', this.selectedInvoice.UPI_amount)
      this.gstpercent=this.gstrate || 0;
      params.append('gst_percent',this.gstpercent)
      params.append('service_details', JSON.stringify(this.selectedInvoice.service_details.map((item:any) => {
        let proname = item.service_name && item.service_name.service_name
          ? item.service_name.service_name
          : item.service_name;
          const service_name=proname;
        const service_gender = item.service_gender || '';
        const staffname = item.staffname || '';
        const service_price = item.sp || 0;
        const quantity = item.quantity || 0;
        const discount = item.disper || 0;
        const amount = item.amount || 0;

        return {
          service_name,
          service_gender,
          staffname,
          service_price,
          quantity,
          discount,
          amount
        };
      })));
      const url = this.data.endpoint + "/servpdf?" + params.toString();
  
      console.log("Generated URL:", url); // Log the generated URL
      return url;
  // return this.data.endpoint + "/servpdf?" + params.toString();
}
async secondFunction(){
  console.log("a");

  let arr=[];

  for(let i=0;i<this.selectedInvoice.service_details.length;i++){
    let staffname = this.selectedInvoice.service_details[i].staffname;

  let serviceNameObj = this.selectedInvoice.service_details[i].service_name;
  let proname = serviceNameObj && serviceNameObj.service_name
    ? serviceNameObj.service_name
    : serviceNameObj;

    let proquantity = this.selectedInvoice.service_details[i].quantity || 0;
    let proamount = this.selectedInvoice.service_details[i].amount || 0;
    let prorate = this.selectedInvoice.service_details[i].sp || 0;
    let discount= this.selectedInvoice.service_details[i].disno || this.selectedInvoice.service_details[i].discount;
    let gender=this.selectedInvoice.service_details[i].service_gender?this.selectedInvoice.service_details[i].service_gender:"";
    if (!proname || !staffname || prorate === "") {
      Swal.fire({
        title: 'Warning',
        text: 'Please fill mandatory fields',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }
   arr.push({
    service_name:proname,
    quantity:proquantity,
    service_price:prorate,
    amount:proamount,
    staffname:staffname,
    discount:discount,
    service_gender:gender
  })
  }

  var id={
    _id:this.selectedInvoice._id
  }
  let customername=this.capitalizeFirstLetter(this.selectedInvoice.customer_name);


    let data: any;
    if(arr.length>0){
      if (isNaN( this.selectedInvoice.total)) {
        alert("please put the bill correctly")
        window.location.reload()
         }else{
if (this.selectedInvoice.payment_mode === "cash and upi") {
  if(this.selectedInvoice.cash_amount && this.selectedInvoice.UPI_amount !==""){
  data = {
    payment_mode: this.selectedInvoice.payment_mode,
    customer_name: customername,
    customer_phone: this.selectedInvoice.customer_phone,
    invoice_no: this.selectedInvoice.invoice_no,
    sub_total: this.selectedInvoice.sub_total,
    discount: this.selectedInvoice.discount,
    gst: this.selectedInvoice.gst,
    cash: this.selectedInvoice.cash_amount,
    upi: this.selectedInvoice.UPI_amount,
    total: this.selectedInvoice.total,
    service_details: arr,
    date:this.selectedInvoice.date
  };

  const shortenedUrl = await this.shortenUrl(this.generateBillUrl());
  this.sendBillViaWhatsApp(this.selectedInvoice.customer_phone, shortenedUrl);
  const url =id._id
  this.data.updateservicebill(url, data).subscribe(
    (result:any) => {


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
    payment_mode: this.selectedInvoice.payment_mode,
    customer_name:customername,
    customer_phone: this.selectedInvoice.customer_phone,
    invoice_no: this.selectedInvoice.invoice_no,
    sub_total: this.selectedInvoice.sub_total,
    discount: this.selectedInvoice.discount,
    gst: this.selectedInvoice.gst,
    cash: "",
    upi:"",
    total: this.selectedInvoice.total,
    service_details: arr,
    date:this.selectedInvoice.date
  };
  const shortenedUrl = await this.shortenUrl(this.generateBillUrl());
  this.sendBillViaWhatsApp(this.selectedInvoice.customer_phone, shortenedUrl);
  const url = id._id
  this.data.updateservicebill(url, data).subscribe(
    (result:any) => {


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
sendservbill(){
  let arr=[];

  for(let i=0;i<this.selectedInvoice.service_details.length;i++){
    let staffname = this.selectedInvoice.service_details[i].staffname;

  let serviceNameObj = this.selectedInvoice.service_details[i].service_name;
  let proname = serviceNameObj && serviceNameObj.service_name
    ? serviceNameObj.service_name
    : serviceNameObj;

    let proquantity = this.selectedInvoice.service_details[i].quantity || 0;
    let proamount = this.selectedInvoice.service_details[i].amount || 0;
    let prorate = this.selectedInvoice.service_details[i].sp || 0;
    let discount= this.selectedInvoice.service_details[i].disno || this.selectedInvoice.service_details[i].discount || 0;
    let gender=this.selectedInvoice.service_details[i].service_gender?this.selectedInvoice.service_details[i].service_gender:"";
    if (!proname || !staffname || prorate === "") {
      Swal.fire({
        title: 'Warning',
        text: 'Please fill mandatory fields',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }
   arr.push({
    service_name:proname,
    quantity:proquantity,
    service_price:prorate,
    amount:proamount,
    staffname:staffname,
    discount:discount,
    service_gender:gender
  })
  }

  var id={
    _id:this.selectedInvoice._id
  }
  let customername=this.capitalizeFirstLetter(this.selectedInvoice.customer_name);


    let data: any;
    if(arr.length>0){
if (this.selectedInvoice.payment_mode === "cash and upi") {
  data = {
    payment_mode: this.selectedInvoice.payment_mode,
    customer_name: customername,
    customer_phone: this.selectedInvoice.customer_phone,
    invoice_no: this.selectedInvoice.invoice_no,
    sub_total: this.selectedInvoice.sub_total,
    discount: this.selectedInvoice.discount,
    gst: this.selectedInvoice.gst,
    cash: this.selectedInvoice.cash_amount,
    upi: this.selectedInvoice.UPI_amount,
    total: this.selectedInvoice.total,
    service_details: arr,
    date:this.selectedInvoice.date
  };
} else {
  data = {
    payment_mode: this.selectedInvoice.payment_mode,
    customer_name:customername,
    customer_phone: this.selectedInvoice.customer_phone,
    invoice_no: this.selectedInvoice.invoice_no,
    sub_total: this.selectedInvoice.sub_total,
    discount: this.selectedInvoice.discount,
    gst: this.selectedInvoice.gst,
    cash: "",
    upi:"",
    total: this.selectedInvoice.total,
    service_details: arr,
    date:this.selectedInvoice.date
  };
}
const createdAtDate = new Date(this.selectedInvoice.createdAt);
const day = createdAtDate.getDate().toString().padStart(2, '0');
const month = (createdAtDate.getMonth() + 1).toString().padStart(2, '0');
const year = createdAtDate.getFullYear().toString();

const datePart = `${day}-${month}-${year}`;
const timePart = createdAtDate.toLocaleTimeString();
const date =  ` ${datePart}     ${timePart}`;
      let params = new URLSearchParams();

      // Add parameters to the instance
      params.append('payment_mode', this.selectedInvoice.payment_mode);
      params.append('customer_name', customername);
      params.append('customer_phone', this.selectedInvoice.customer_phone);
      params.append('invoice_no', this.selectedInvoice.invoice_no);
      params.append('sub_total', this.selectedInvoice.sub_total.toString());
      params.append('gst', this.selectedInvoice.gst);
      params.append('total', this.selectedInvoice.total);
      params.append('date', date);

       params.append('membership_no', this.selectedInvoice.membership_no)
          params.append('cash',this.selectedInvoice.cash_amount)
          params.append('upi', this.selectedInvoice.UPI_amount)
          this.gstpercent=this.gstrate || 0;
          params.append('gst_percent',this.gstpercent)
      params.append('service_details', JSON.stringify(arr));
      const url = this.data.endpoint + "/servpdf?" + params.toString();
      console.log("urlcontant============>",url);
      
      this.sendBillViaWhatsApp(this.selectedInvoice.customer_phone, url);

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
sendBillViaWhatsApp(customerPhone: string, url: string): void {
  console.log("customerPhone============>",customerPhone);
  console.log("url============>",url);
  
  // Ensure the customer phone number is valid
  if (!customerPhone || !/^(\+\d{1,3}[- ]?)?\d{10}$/.test(customerPhone)) {
    return;
  }

  // Format the phone number to include the country code
  const formattedPhone = customerPhone.startsWith('+') ? customerPhone : `+91${customerPhone}`;

  // Create a deep link for WhatsApp with a pre-filled message
  const whatsappMessage = `Hello! Your bill is ready. Click the link to view: ${url}`;
  const whatsappLink = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(whatsappMessage)}`;

  // Open the link in a new tab or window
  window.open(whatsappLink, '_blank');
}
updatebill(){
  let arr=[];


for(let i=0;i<this.selectedInvoice.service_details.length;i++){
  let staffname = this.selectedInvoice.service_details[i].staffname;
let serviceNameObj = this.selectedInvoice.service_details[i].service_name;
let proname = serviceNameObj && serviceNameObj.service_name
  ? serviceNameObj.service_name
  : serviceNameObj;

  let proquantity = this.selectedInvoice.service_details[i].quantity || 0;
  let proamount = this.selectedInvoice.service_details[i].amount || 0;
  let prorate = this.selectedInvoice.service_details[i].sp || 0;
  let discount= this.selectedInvoice.service_details[i].disno || this.selectedInvoice.service_details[i].discount;
  let gender=this.selectedInvoice.service_details[i].service_gender?this.selectedInvoice.service_details[i].service_gender:"";
  if (!proname || !staffname || prorate === undefined) {
    Swal.fire({
      title: 'Warning',
      text: 'Please fill mandatory fields',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
    return;
  }
 arr.push({
  service_name:proname,
  quantity:proquantity,
  service_price:prorate,
  amount:proamount,
  staffname:staffname,
  discount:discount,
  service_gender:gender
})
}

var id={
  _id:this.selectedInvoice._id
}
let customername=this.capitalizeFirstLetter(this.selectedInvoice.customer_name);



  let data: any;
  if(arr.length>0){
    if (isNaN( this.selectedInvoice.total)) {
      alert("please put the bill correctly")
      window.location.reload()
       }else{
if (this.selectedInvoice.payment_mode === "cash and upi") {

if( this.selectedInvoice.cash_amount && this.selectedInvoice.UPI_amount !== ""){
data = {
  payment_mode: this.selectedInvoice.payment_mode,
  customer_name: customername,
  customer_phone: this.selectedInvoice.customer_phone,
  invoice_no: this.selectedInvoice.invoice_no,
  sub_total: this.selectedInvoice.sub_total,
  discount: this.selectedInvoice.discount,
  gst: this.selectedInvoice.gst,
  cash: this.selectedInvoice.cash_amount,
  upi: this.selectedInvoice.UPI_amount,
  total: this.selectedInvoice.total,
  service_details: arr,
  date:this.selectedInvoice.date
};
const url = id._id

this.data.updateservicebill(url, data).subscribe(
  (result:any) => {

  })

this.tableRows = [];

for (let i = 0; i < this.selectedInvoice.service_details.length; i++) {
  this.tableRows.push(this.createTableRow(i));
}
const createdAtDate = new Date(this.selectedInvoice.createdAt);
const day = createdAtDate.getDate().toString().padStart(2, '0');
const month = (createdAtDate.getMonth() + 1).toString().padStart(2, '0');
const year = createdAtDate.getFullYear().toString();

const datePart = `${day}-${month}-${year}`;
const timePart = createdAtDate.toLocaleTimeString();
// const pay = document.getElementById("dtSpan") as HTMLInputElement;
// pay.innerText = `${this.datepipe.transform(this.selectedInvoice.date,'dd-MM-YYYY')}`;

const tabledata = document.getElementById("tbody") as HTMLInputElement;
tabledata.innerHTML = this.tableRows.join("");

  const invoiceInput = document.getElementById("print-space") as HTMLInputElement;
  const screen= document.getElementById("probilldetail") as HTMLInputElement;
  const top=document.getElementById("top1") as HTMLInputElement;
  const trail=document.getElementById("trail") as HTMLInputElement;
  invoiceInput.style.display="block";

   screen.style.visibility="hidden"
   top.style.visibility="hidden"
   trail.style.visibility="hidden"

   window.print()
   invoiceInput.style.display="none"

   screen.style.visibility="visible"
   top.style.visibility="visible"
   trail.style.visibility="visible"
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
  payment_mode: this.selectedInvoice.payment_mode,
  customer_name:customername,
  customer_phone: this.selectedInvoice.customer_phone,
  invoice_no: this.selectedInvoice.invoice_no,
  sub_total: this.selectedInvoice.sub_total,
  discount: this.selectedInvoice.discount,
  gst: this.selectedInvoice.gst,
  cash: "",
  upi:"",
  total: this.selectedInvoice.total,
  service_details: arr,
  date:this.selectedInvoice.date
};
const url = id._id

this.data.updateservicebill(url, data).subscribe(
  (result:any) => {

  })

this.tableRows = [];

for (let i = 0; i < this.selectedInvoice.service_details.length; i++) {
  this.tableRows.push(this.createTableRow(i));
}
const createdAtDate = new Date(this.selectedInvoice.createdAt);
const day = createdAtDate.getDate().toString().padStart(2, '0');
const month = (createdAtDate.getMonth() + 1).toString().padStart(2, '0');
const year = createdAtDate.getFullYear().toString();

const datePart = `${day}-${month}-${year}`;
const timePart = createdAtDate.toLocaleTimeString();
// const pay = document.getElementById("dtSpan") as HTMLInputElement;
// pay.innerText = `${this.datepipe.transform(this.selectedInvoice.date,'dd-MM-YYYY')}`;

const tabledata = document.getElementById("tbody") as HTMLInputElement;
tabledata.innerHTML = this.tableRows.join("");

  const invoiceInput = document.getElementById("print-space") as HTMLInputElement;
  const screen= document.getElementById("probilldetail") as HTMLInputElement;
  const top=document.getElementById("top1") as HTMLInputElement;
  const trail=document.getElementById("trail") as HTMLInputElement;
  invoiceInput.style.display="block";

   screen.style.visibility="hidden"
   top.style.visibility="hidden"
   trail.style.visibility="hidden"

   window.print()
   invoiceInput.style.display="none"

   screen.style.visibility="visible"
   top.style.visibility="visible"
   trail.style.visibility="visible"
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
printBill1() {
  let printContents = document.getElementById('print-space')!.innerHTML;
  let printWindow = window.open('', '_blank');
  let arr=[];


  for(let i=0;i<this.selectedInvoice.service_details.length;i++){
    let staffname = this.selectedInvoice.service_details[i].staffname;
  let serviceNameObj = this.selectedInvoice.service_details[i].service_name;
  let proname = serviceNameObj && serviceNameObj.service_name
    ? serviceNameObj.service_name
    : serviceNameObj;

    let proquantity = this.selectedInvoice.service_details[i].quantity || 0;
    let proamount = this.selectedInvoice.service_details[i].amount || 0;
    let prorate = this.selectedInvoice.service_details[i].sp || 0;
    let discount= this.selectedInvoice.service_details[i].disno || this.selectedInvoice.service_details[i].discount;
    let gender=this.selectedInvoice.service_details[i].service_gender?this.selectedInvoice.service_details[i].service_gender:"";
    if (!proname || !staffname || prorate === undefined) {
      Swal.fire({
        title: 'Warning',
        text: 'Please fill mandatory fields',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }
   arr.push({
    service_name:proname,
    quantity:proquantity,
    service_price:prorate,
    amount:proamount,
    staffname:staffname,
    discount:discount,
    service_gender:gender
  })
  }

  var id={
    _id:this.selectedInvoice._id
  }
  let customername=this.capitalizeFirstLetter(this.selectedInvoice.customer_name);



    let data: any;
    if(arr.length>0){
      if (isNaN( this.selectedInvoice.total)) {
        alert("please put the bill correctly")
        window.location.reload()
         }else{
  if (this.selectedInvoice.payment_mode === "cash and upi") {

  if( this.selectedInvoice.cash_amount && this.selectedInvoice.UPI_amount !== ""){
  data = {
    payment_mode: this.selectedInvoice.payment_mode,
    customer_name: customername,
    customer_phone: this.selectedInvoice.customer_phone,
    invoice_no: this.selectedInvoice.invoice_no,
    sub_total: this.selectedInvoice.sub_total,
    discount: this.selectedInvoice.discount,
    gst: this.selectedInvoice.gst,
    cash: this.selectedInvoice.cash_amount,
    upi: this.selectedInvoice.UPI_amount,
    total: this.selectedInvoice.total,
    service_details: arr,
    date:this.selectedInvoice.date
  };
  const url = id._id

  this.data.updateservicebill(url, data).subscribe(
    (result:any) => {

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
    payment_mode: this.selectedInvoice.payment_mode,
    customer_name:customername,
    customer_phone: this.selectedInvoice.customer_phone,
    invoice_no: this.selectedInvoice.invoice_no,
    sub_total: this.selectedInvoice.sub_total,
    discount: this.selectedInvoice.discount,
    gst: this.selectedInvoice.gst,
    cash: "",
    upi:"",
    total: this.selectedInvoice.total,
    service_details: arr,
    date:this.selectedInvoice.date
  };
  const url = id._id

  this.data.updateservicebill(url, data).subscribe(
    (result:any) => {

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
    printWindow.close();

    // window.location.reload()

  } else {
    console.error("Failed to open the print window.");
  }
}



printBill() {

  let arr = [];

  for (let i = 0; i < this.selectedInvoice.service_details.length; i++) {
    let staffname = this.selectedInvoice.service_details[i].staffname;
    let serviceNameObj = this.selectedInvoice.service_details[i].service_name;
    let proname = serviceNameObj && serviceNameObj.service_name ? serviceNameObj.service_name : serviceNameObj;

    let proquantity = this.selectedInvoice.service_details[i].quantity || 0;
    let proamount = this.selectedInvoice.service_details[i].amount || 0;
    let prorate = this.selectedInvoice.service_details[i].sp || 0;
    let discount = this.selectedInvoice.service_details[i].disno || this.selectedInvoice.service_details[i].discount;
    let gender = this.selectedInvoice.service_details[i].service_gender ? this.selectedInvoice.service_details[i].service_gender : "";
    if (!proname || !staffname || prorate === undefined) {
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
      quantity: proquantity,
      service_price: prorate,
      amount: proamount,
      staffname: staffname,
      discount: discount,
      service_gender: gender
    });
  }

  var id = {
    _id: this.selectedInvoice._id
  };
  let customername = this.capitalizeFirstLetter(this.selectedInvoice.customer_name);

  let data: any;
  if (arr.length > 0) {
    if (isNaN(this.selectedInvoice.total)) {
      alert("Please put the bill correctly");
      window.location.reload();
    } else {
      if (this.selectedInvoice.payment_mode === "cash and upi") {
        if (this.selectedInvoice.cash_amount && this.selectedInvoice.UPI_amount !== "") {
          data = {
            payment_mode: this.selectedInvoice.payment_mode,
            customer_name: customername,
            customer_phone: this.selectedInvoice.customer_phone,
            invoice_no: this.selectedInvoice.invoice_no,
            sub_total: this.selectedInvoice.sub_total,
            discount: this.selectedInvoice.discount,
            gst: this.selectedInvoice.gst,
            cash: this.selectedInvoice.cash_amount,
            upi: this.selectedInvoice.UPI_amount,
            total: this.selectedInvoice.total,
            service_details: arr,
            date: this.selectedInvoice.date
          };
          const url = id._id;
          this.data.updateservicebill(url, data).subscribe(
            (result: any) => {
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
                printWindow.close();
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
            text: 'Please fill cash and upi',
            icon: 'warning',
            confirmButtonText: 'OK'
          });
          return; // Prevent further execution
        }
      } else {
        data = {
          payment_mode: this.selectedInvoice.payment_mode,
          customer_name: customername,
          customer_phone: this.selectedInvoice.customer_phone,
          invoice_no: this.selectedInvoice.invoice_no,
          sub_total: this.selectedInvoice.sub_total,
          discount: this.selectedInvoice.discount,
          gst: this.selectedInvoice.gst,
          cash: "",
          upi: "",
          total: this.selectedInvoice.total,
          service_details: arr,
          date: this.selectedInvoice.date
        };
        const url = id._id;
        this.data.updateservicebill(url, data).subscribe(
          (result: any) => {
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
              printWindow.close();
            } else {
              console.error("Failed to open the print window.");
            }
          });
      }
    }
  } else {
    Swal.fire({
      title: 'Warning',
      text: 'Please fill the mandatory field',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
    return; // Prevent further execution
  }

  // Check if either cash or upi is empty
  if (this.selectedInvoice.payment_mode === "cash and upi" &&
    (!this.selectedInvoice.cash_amount || !this.selectedInvoice.UPI_amount)) {
    Swal.fire({
      title: 'Warning',
      text: 'Please fill both cash and upi fields to proceed with printing',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
    return; // Prevent further execution
  }

  // Open print window only if all conditions are met

}




}
