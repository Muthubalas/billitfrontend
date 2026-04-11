import { Component, OnInit,Input,ViewChild,ElementRef} from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../auth.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-updateprobill',
  templateUrl: './updateprobill.component.html',
  styleUrls: ['./updateprobill.component.css'],
  providers:[DatePipe]
})
export class UpdateprobillComponent implements OnInit {
  selectedInvoice1: any;

  dynamicHeight: number = 350;
  defaultHeight: number = 271.999;
  b: any;
  c: any;
  sel: any;
  getpro: any[]=[];
  getstafflist: any;
  selectedpro: any;
  keyword="Product_name"
  subtotal: any;
  disrate: any = 0;
  tableRows: string[] = [];
  value: any;
  discountrate:any=0;
  gstamount: any;
  gstrate:any=0;
  roundgst:any=0;
  grandtotal: any;
  total: any;
  catprod: any;
  getcat:any=[];
  payMode: any;
  invoice_no: any;
  a:any;
  catArr:any=[]
  subt: any;
  cat:any;
  selectedprice: any;
  i: any;
  Product_category: any;
  selectedProductId: any;
  datalist: any;
  pri: any;
  showpay:boolean=false;
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
  helper=new JwtHelperService();

  token: any;
  profilerole: any;
  role: any;
  cash:any;
  upi: any;
  prodcost: any;
  onlinepay: boolean=false;
  gstpercent: any;
  receivedCusphno: any;
  minDate:string;
  rainbowmedia:boolean=false;
  memoriesaddr:boolean=false;
  marvelmanapakaddr:boolean=false;
  marvelannanagar:boolean=false;
  marvelomraddr:boolean=false;
  marvelselaiyur:boolean=false;
  marvelvelachery:boolean=false;
  dsaloon:boolean=false;
  blush:boolean=false;
  // total: number = 0;
  constructor(private data:DataService,private router:Router,private auth:AuthService,
    public datepipe:DatePipe) {
      this.minDate = datepipe.transform(new Date(), 'yyyy-MM-dd')!;
    }

  ngOnInit(): void {
    if("https://chillbreezeomr-backend.billitnow.in/"===this.data.endpoint){
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
    else if("https://marvelmanapakkam-backend.billitnow.in/"===this.data.endpoint){
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
    else if("https://marvelomr-backend.billitnow.in/"===this.data.endpoint){
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
    else if("https://marvel-ag-backend.billitnow.in/"===this.data.endpoint){
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
    else if("https://billitnow-backend.rainbowmedia.co.in/"===this.data.endpoint){
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
    else if("https://dsaloon-backend.billitnow.in/"===this.data.endpoint){
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

    
    this.data.cusphno$.subscribe((cusphno) => {
      this.receivedCusphno = cusphno;
      const url = this.receivedCusphno

      this.data.getcusdetails(url).subscribe(
        (result) => {
          this.a = result;
    this.selectedInvoice1.customer_name=this.a.details.customer_name;
    this.selectedInvoice1.membership_no=this.a.details.membership_no

          // this.cdr.detectChanges();
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

const mins=this.date.getMinutes();
this.min=mins<10?'0'+mins:mins.toString();

this.noon=this.hr>=12?'PM':'AM';
this.time=this.hr+":"+this.min+" "+this.noon
this.timestr=this.time.toString()
    this.selectedInvoice1 = this.data.selectedInvoice1;


    if (this.selectedInvoice1 && this.selectedInvoice1.product_details) {
        this.selectedInvoice1.product_details.forEach((detail:any) => {
          detail.sp = detail.Product_price;
          delete detail.Product_price;


        });
      }
        if(this.selectedInvoice1.payment_mode=="cash and upi"){
      this.showpay=true;
      this.onlinepay=true;
      }
      else{
        this.selectedInvoice1.cash_amount="";
        this.selectedInvoice1.UPI_amount=""
        this.showpay=false;
        this.onlinepay=false;
      }
      this.gstrate = Math.round((this.selectedInvoice1.gst / this.selectedInvoice1.sub_total) * 100);
      const productCategories = this.selectedInvoice1.product_details.map((item: any) => item.Product_name);
      const data = { prodname: productCategories };

      for (let i = 0; i < productCategories.length; i++) {
        const url = data.prodname[i]

        this.data.getprodcat(url).subscribe(
          (result: any) => {
            this.catprod = result;

            this.getcat = this.catprod.details;

            this.catArr.push(this.getcat);
            // this.catArr[i] = this.getcat;
            const retailProducts = this.getcat.filter((product:any) => product.Product_type === "Retail");
            this.catArr[i] = retailProducts;
            this.catArr.push(this.getcat)



          }
        );
      }




    const newRow = {
      // Product_category:'',
      Product_name: '',
      staff_name: '',
      quantity: 0,
      Product_price: 0,
      amount: 0,
    };

    this.getdata()
this.getproductlist()
this.getstaff()

  }


  isOpen1:boolean = false;

  toggleSidebar1() {
    this.isOpen1 = !this.isOpen1;
  }
  @ViewChild('productInput') productInput!: ElementRef;
  getdata() {

    const memdet = {
      customer_phone: this.selectedInvoice1.customer_phone
    };

    const url = memdet.customer_phone

    this.data.getcusdetails(url).subscribe(
      (result) => {
        this.a = result;

        // Check if membership details are available
        if (this.a && this.a.details) {
          this.selectedInvoice1.customer_name = this.a.details.customer_name;
          // console.log(this.selectedInvoice1.customer_name);

          // Extract membership number
          this.selectedInvoice1.membership_no = this.a.details.membership_no;
          // console.log(this.selectedInvoice1.membership_no);
        } else {
          console.log('No details or membership information available.');
        }
      },
      (error) => {
        console.error(error);
        // Handle the error as needed
      }
    );
  }
  changedate(getdate:any){
    this.selectedInvoice1.date=getdate.target.value;
  }
  addy(){
    const newRow = {
      // select_items: " ",
      staff_name: '',
      Product_category:"",
      quantity: 0,
      sp: 0,
      amount: 0,
     discount:0
    };

    this.selectedInvoice1.product_details.push(newRow);
    // this.updatebill()
    this.tableRows.push(this.createTableRow(this.selectedInvoice1.product_details.length - 1));
    // this.updateTotalItem();

    this.filteredProducts = this.getpro;
  }

  createTableRow(index: number): string {
    const item =this.selectedInvoice1.product_details[index];
    const prodname = item.Product_name;
    const productName = prodname && prodname.Product_name  ? prodname.Product_name : prodname ;
    return `<tr>
       <td style="padding:2px 5px">${productName}</td>
       <td style="padding:2px 5px">${item.Product_category}</td>
       <td style="padding:2px 5px">${item.sp}</td>
       <td style="padding:2px 5px">${item.quantity}
       <td style="padding:2px 5px">${item.amount}</td>

    </tr>`;
  }
  filteredProducts=this.getpro;
  getproductlist(){
    return this.data.totalproretail().subscribe((result:any)=>{
      const uniqueProductNames = [...new Set(result.listproduct.map((product: any) => product.Product_name))];
      this.getpro = uniqueProductNames.map(productName => result.listproduct.find((product: any) => product.Product_name === productName));
      // this.getpro=result.listserv;
      this.filteredProducts = this.getpro;

    })
  }

  selectserv(i: any, event: any) {
    const inputValue = event.target.value.toLowerCase().replace(/\s/g, '');; // Ensure case-insensitivity
    this.filteredProducts = this.getpro.filter(item =>
      item.Product_name.toLowerCase().replace(/\s/g, '').startsWith(inputValue)
    );

    const data = this.filteredProducts.find(item => item.Product_name.toLowerCase().replace(/\s/g, '') === inputValue);

    const url =data.Product_name

      this.data.getprodcat(url).subscribe(
        (result:any) => {
          this.catprod = result;
          // console.log(this.catprod.details);
          this.getcat=this.catprod.details
          // console.log(this.getcat);
          this.catArr.push(this.getcat)


          this.selectedInvoice1.product_details[i].Product_category= this.getcat;
          this.selectedInvoice1.product_details[i].sp = 0;
          this.selectedInvoice1.product_details[i].discount = 0;
          this.selectedInvoice1.product_details[i].amount = 0;
          this.selectedInvoice1.product_details[i].quantity = 1;

  // this.catArr[i] = this.getcat;
  const retailProducts = this.getcat.filter((product:any) => product.Product_type === "Retail");
  this.catArr[i] = retailProducts;

        })
  }


capitalizeFirstLetter(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
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

  params.append('payment_mode', this.selectedInvoice1.payment_mode);
  params.append('customer_name', this.selectedInvoice1.customer_name);
  params.append('customer_phone', this.selectedInvoice1.customer_phone);
  params.append('invoice_no', this.selectedInvoice1.invoice_no);
  params.append('sub_total', this.selectedInvoice1.sub_total.toString());
  params.append('gst', this.selectedInvoice1.gst);
  params.append('total', this.selectedInvoice1.total);
  params.append('date', this.selectedInvoice1.date);

   params.append('membership_no', this.selectedInvoice1.membership_no)
      params.append('cash',this.selectedInvoice1.cash_amount)
      params.append('upi', this.selectedInvoice1.UPI_amount)
      this.gstpercent=this.gstrate || 0;
      params.append('gst_percent',this.gstpercent)
      params.append('product_details', JSON.stringify(this.selectedInvoice1.product_details.map((item:any) => {
        let proname = item.Product_name && item.Product_name.Product_name
          ? item.Product_name.Product_name
          : item.Product_name;
          const Product_name=proname;
          let procat=item.Product_category && item.Product_category.Product_category
          ? item.Product_category.Product_category
          : item.Product_category;
        const Product_category =procat;
        const staffname = item.staffname || '';
        const Product_price = item.sp || 0;
        const quantity = item.quantity || 0;
        const discount = item.disper || 0;
        const amount = item.amount || 0;

        return {
          Product_name,
          Product_category,
          staffname,
          Product_price,
          quantity,
          discount,
          amount
        };
      })));
  return this.data.endpoint + "/productpdf?" + params.toString();
}
async secondFunction(){
  console.log("a");

  let arr=[];

  for(let i=0;i<this.selectedInvoice1.product_details.length;i++){
    let staffname = this.selectedInvoice1.product_details[i].staffname?this.selectedInvoice1.product_details[i].staffname:"";
    // console.log(staffname);

  let serviceNameObj = this.selectedInvoice1.product_details[i].Product_name;
  let proname = serviceNameObj && serviceNameObj.Product_name
    ? serviceNameObj.Product_name
    : serviceNameObj;
  // console.log(proname);
let category=this.selectedInvoice1.product_details[i].Product_category;
let prodcat=category && category.Product_category ? category.Product_category : category;
  let  prodid= this.selectedInvoice1.product_details[i].Product_id;

    let proquantity = this.selectedInvoice1.product_details[i].quantity || 0;
    let proamount = this.selectedInvoice1.product_details[i].amount || 0;
    let prorate = this.selectedInvoice1.product_details[i].sp || 0;
    let prodiscount= this.selectedInvoice1.product_details[i].discount || 0;
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
    Product_name:proname,
    Product_category:prodcat,
    quantity:proquantity,
    Product_id:prodid,
    discount:prodiscount,
    Product_price:prorate,
    amount:proamount,
    staffname:staffname
  })
  }

  var id={
    _id:this.selectedInvoice1._id
  }
  let customername=this.capitalizeFirstLetter(this.selectedInvoice1.customer_name);


    let data: any;
    if(arr.length>0){
      if (isNaN( this.selectedInvoice1.total)) {
        alert("please put the bill correctly")
        window.location.reload()
         }else{
if (this.selectedInvoice1.payment_mode === "cash and upi") {
  if(this.selectedInvoice1.cash_amount && this.selectedInvoice1.UPI_amount !==""){
  data = {
    payment_mode: this.selectedInvoice1.payment_mode,
    customer_name: customername,
    customer_phone: this.selectedInvoice1.customer_phone,
    invoice_no: this.selectedInvoice1.invoice_no,
    sub_total: this.selectedInvoice1.sub_total,
    discount: this.selectedInvoice1.discount,
    gst: this.selectedInvoice1.gst,
    cash: this.selectedInvoice1.cash_amount,
    upi: this.selectedInvoice1.UPI_amount,
    total: this.selectedInvoice1.total,
    product_details: arr,
    date:this.selectedInvoice1.date
  };

  const shortenedUrl = await this.shortenUrl(this.generateBillUrl());
  this.sendBillViaWhatsApp(this.selectedInvoice1.customer_phone, shortenedUrl);
  const url = id._id


  this.data.updateprobill(url, data).subscribe(
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
    payment_mode: this.selectedInvoice1.payment_mode,
    customer_name:customername,
    customer_phone: this.selectedInvoice1.customer_phone,
    invoice_no: this.selectedInvoice1.invoice_no,
    sub_total: this.selectedInvoice1.sub_total,
    discount: this.selectedInvoice1.discount,
    gst: this.selectedInvoice1.gst,
    cash: "",
    upi:"",
    total: this.selectedInvoice1.total,
    product_details: arr,
    date:this.selectedInvoice1.date
  };
  const shortenedUrl = await this.shortenUrl(this.generateBillUrl());
  this.sendBillViaWhatsApp(this.selectedInvoice1.customer_phone, shortenedUrl);

  const url =id._id


  this.data.updateprobill(url, data).subscribe(
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

sendBillViaWhatsApp(customerPhone: string, url: string): void {
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
isDropdownOpen1 = false;

toggleDropdown1() {
  this.isDropdownOpen1 = !this.isDropdownOpen1;
}
logout(){
  this.router.navigate(['login'])
  this.data.removeToken()

}
  getstaff(){
    return this.data.getstaff().subscribe((result:any)=>{
      this.getstafflist=result.liststaff;
      // console.log(this.getstafflist);

    })
  }
    customFilter = function(products: any[], query: string): any[] {
      const lowerQuery = query.toLowerCase();
      return products.filter(Product_name => Product_name.Product_name.toLowerCase().startsWith(lowerQuery));
    }


    @Input() sideNavOpen: boolean = false;


    // sideNavOpen: boolean = false;

    toggleSideNav() {
      this.sideNavOpen = !this.sideNavOpen;
    }

    onfocused(e:any){

    }

    select(i:any,e:any){
      this.sel=e.target.value;


      }
    selectevent(i:any,data:any){
      this.selectedpro=data;
      const memdet = {
        Product_name: data.Product_name
      };
      const url = memdet.Product_name

      this.data.getprodcat(url).subscribe(
        (result:any) => {
          this.catprod = result;
          // console.log(this.catprod.details);
          this.getcat=this.catprod.details
          // console.log(this.getcat);
          this.catArr.push(this.getcat)


          this.selectedInvoice1.product_details[i].Product_category= this.getcat;
          this.selectedInvoice1.product_details[i].sp = 0;
          this.selectedInvoice1.product_details[i].discount = 0;
          this.selectedInvoice1.product_details[i].amount = 0;
          this.selectedInvoice1.product_details[i].quantity = 1;

  // this.catArr[i] = this.getcat;
  const retailProducts = this.getcat.filter((product:any) => product.Product_type === "Retail");
  this.catArr[i] = retailProducts;

        })





    }

    oncategoryselection(i: any, Product_category: any,selectedprice: any,selectedProductId:any): void {
      // if (Product_category) {

// this.selectedprice=selectedprice
this.selectedInvoice1.product_details[i].Product_id=selectedProductId;

        this.selectedInvoice1.product_details[i].amount=1*selectedprice;

        this.selectedInvoice1.product_details[i].Product_price=selectedprice;
        this.prodcost=undefined;
      // } else {
      //   console.log('No option selected or invalid selection');
      // }
      this.calculateSubtotal()
      const data = {
        quantity: 1,
        Product_price: selectedprice,
        selectedprice: selectedprice, // Add selectedprice to the data object
    };

    this.Quantity(i, data);

this.selectedprice=selectedprice;
this.selectedInvoice1.cash_amount="";
this.selectedInvoice1.UPI_amount=""

    }

    onProductCostChange(index: number, rowData: any) {

      this.prodcost= rowData.sp;
      this.selectedInvoice1.product_details[index].amount=rowData.sp;
      rowData.discount=0;
      this.selectedInvoice1.cash_amount="";
      this.selectedInvoice1.UPI_amount=""
      this.calculateSubtotal()
      // this.prodis(index,rowData)

    }


    Quantity(i: any, data: any) {
// console.log(this.prodcost);

 if(this.prodcost!=undefined){
        this.selectedInvoice1.product_details[i].Product_price=data.quantity*this.prodcost;
        this.selectedInvoice1.product_details[i].sp=data.quantity*this.prodcost;
        // console.log( this.selectedInvoice1.product_details[i].sp);

        this.selectedInvoice1.product_details[i].amount =data.quantity*this.prodcost;
        this. prodis(i,data)
      }
      else{

if( data.Product_id){
    this.data.getquantity(data.Product_id).subscribe((result:any)=>{
      this.datalist=result.Listproduct;
      this.pri=this.datalist[0].Product_price;
      if(data.quantity>this.datalist[0].Product_quantity){
        // alert("out of stock")
        Swal.fire({
          title: 'Warning',
          text: 'out of stock',
          icon: 'warning',
          confirmButtonText: 'OK'
        })
        data.quantity=data.quantity-1;
        // this.selectedInvoice1.product_details[i].sp="";
        // this.selectedInvoice1.product_details[i].amount=""
      }
      else{
        this.selectedInvoice1.product_details[i].sp=data.quantity*this.pri;
      }
      // this.selectedInvoice1.product_details[i].sp=data.quantity*this.pri;
      this. prodis(i,data)
      // this.selectedInvoice1.product_details[i].amount = data.quantity * this.pri;
    })
  }else{
    this.selectedInvoice1.product_details[i].sp=data.quantity*this.selectedInvoice1.product_details[i].Product_price;
    this.b=data.quantity;
//     console.log(data.quantity);
// console.log(data.price);
this. prodis(i,data)
    this.selectedInvoice1.product_details[i].amount = data.quantity * data.Product_price;
  }

}
this.selectedInvoice1.cash_amount="";
this.selectedInvoice1.UPI_amount=""
      this.calculateSubtotal()

    }
    prodis(i:any,data:any){
      // console.log(data.discount);
      this.selectedInvoice1.product_details[i].disper=data.prodisc;

  let discountamount=this.selectedInvoice1.product_details[i].sp * (data.discount/100)

  this.selectedInvoice1.product_details[i].amount=this.selectedInvoice1.product_details[i].sp-discountamount;
  this.selectedInvoice1.cash_amount="";
          this.selectedInvoice1.UPI_amount=""
  this.calculateSubtotal()

    }
    onKeywordChange(value: string) {

    }
    onchangesearch(event: Event){


    }
    calculateSubtotal() {

      this.subt = this.selectedInvoice1.product_details.reduce((total: number, currentItem: any) => total + currentItem.amount, 0);

      this.selectedInvoice1.sub_total=this.subt.toFixed(2)


      this.changegst()
  }

  discount(){

    if (!isNaN(this.selectedInvoice1.sub_total)) {
    this.value=this.selectedInvoice1.sub_total*(this.disrate/100)
   this.selectedInvoice1.discount=this.value.toFixed(2)
    this.changegst();
    }
    }
    changegst(){
      if (!isNaN(this.selectedInvoice1.sub_total)) {
      this.gstamount=(this.selectedInvoice1.sub_total)*(this.gstrate/100)

      this.selectedInvoice1.gst=this.gstamount.toFixed(2)
       this.tt()
      }
      this.selectedInvoice1.cash_amount="";
      this.selectedInvoice1.UPI_amount=""

    }
    tt(){

const subTotal = parseFloat(this.selectedInvoice1.sub_total);
const gstAmount = parseFloat(this.selectedInvoice1.gst);

if (!isNaN(subTotal) && !isNaN(gstAmount)) {
  this.total = subTotal + gstAmount;
  this.selectedInvoice1.total = this.total.toFixed(2);
}

    }

    selectpay(e:any){
      this.selectedInvoice1.payment_mode=e.target.value;
      if(this.selectedInvoice1.payment_mode=="cash and upi"){
        this.showpay=true;
        this.onlinepay=true;
        }
        else{
          this.showpay=false;
          this.onlinepay=false;
          this.selectedInvoice1.cash_amount="";
          this.selectedInvoice1.UPI_amount=""
        }
      // console.log(this.selectedInvoice1.payment_mode);

    }
    updateCash() {
      if (this.selectedInvoice1.cash_amount) {
        this.selectedInvoice1.UPI_amount = parseFloat((this.selectedInvoice1.total - this.selectedInvoice1.cash_amount).toFixed(2));
      } else {
        this.selectedInvoice1.UPI_amount = parseFloat(this.selectedInvoice1.total);
      }
    }

    updateUPI() {
      if (this.selectedInvoice1.UPI_amount) {
        this.selectedInvoice1.cash_amount = parseFloat((this.selectedInvoice1.total - this.selectedInvoice1.UPI_amount).toFixed(2));
      } else {
        this.selectedInvoice1.cash_amount = parseFloat(this.selectedInvoice1.total);
      }
    }
    deleteRow(index: number) {
      this.selectedInvoice1.product_details.splice(index, 1);
      this.calculateSubtotal()
      // this.calculateTotal(); // Update the total after deleting a row
    }
    updatebill(){
      let arr=[];

    for(let i=0;i<this.selectedInvoice1.product_details.length;i++){
      let staffname = this.selectedInvoice1.product_details[i].staffname?this.selectedInvoice1.product_details[i].staffname:"";
      // console.log(staffname);

    let serviceNameObj = this.selectedInvoice1.product_details[i].Product_name;
    let proname = serviceNameObj && serviceNameObj.Product_name
      ? serviceNameObj.Product_name
      : serviceNameObj;
    // console.log(proname);
  let category=this.selectedInvoice1.product_details[i].Product_category;
  let prodcat=category && category.Product_category ? category.Product_category : category;
    let  prodid= this.selectedInvoice1.product_details[i].Product_id;

      let proquantity = this.selectedInvoice1.product_details[i].quantity || 0;
      let proamount = this.selectedInvoice1.product_details[i].amount || 0;
      let prorate = this.selectedInvoice1.product_details[i].sp || 0;
      let prodiscount= this.selectedInvoice1.product_details[i].discount || 0;
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
      Product_name:proname,
      Product_category:prodcat,
      quantity:proquantity,
      Product_id:prodid,
      discount:prodiscount,
      Product_price:prorate,
      amount:proamount,
      staffname:staffname
    })
    // console.log(arr);

    }
    var id={
      _id:this.selectedInvoice1._id
    }



  let data: any;
  if(arr.length>0){
    if (isNaN( this.selectedInvoice1.total)) {
      alert("please put the bill correctly")
      window.location.reload()
       }else{
  if (this.selectedInvoice1.payment_mode === "cash and upi") {
    if(this.selectedInvoice1.cash_amount && this.selectedInvoice1.UPI_amount !==""){
    data = {
      payment_mode: this.selectedInvoice1.payment_mode,
      customer_name: this.selectedInvoice1.customer_name,
      customer_phone: this.selectedInvoice1.customer_phone,
      invoice_no: this.selectedInvoice1.invoice_no,
      sub_total: this.selectedInvoice1.sub_total,
      discount: this.selectedInvoice1.discount,
      gst: this.selectedInvoice1.gst,
      cash: this.selectedInvoice1.cash_amount,
      upi: this.selectedInvoice1.UPI_amount,
      total: this.selectedInvoice1.total,
      product_details: arr,
      date:this.selectedInvoice1.date
    };
    const url = id._id;


    this.data.updateprobill(url, data).subscribe(
      (result:any) => {


        })
        this.tableRows = [];

        for (let i = 0; i < this.selectedInvoice1.product_details.length; i++) {
          this.tableRows.push(this.createTableRow(i));
        }

        const tabledata = document.getElementById("tbody") as HTMLInputElement;
        tabledata.innerHTML = this.tableRows.join("");
        const invoiceInput = document.getElementById("print-space") as HTMLInputElement;
        const screen= document.getElementById("probilldetail") as HTMLInputElement;
        const top=document.getElementById("top1") as HTMLInputElement;
        const trail=document.getElementById("trail") as HTMLInputElement;
        invoiceInput.style.display="block"

         screen.style.visibility="hidden"
         top.style.visibility="hidden"
         trail.style.visibility="hidden"

         window.print()
         invoiceInput.style.display="none"

         screen.style.visibility="visible"
         top.style.visibility="visible"
         trail.style.visibility="visible"
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
      payment_mode: this.selectedInvoice1.payment_mode,
      customer_name: this.selectedInvoice1.customer_name,
      customer_phone: this.selectedInvoice1.customer_phone,
      invoice_no: this.selectedInvoice1.invoice_no,
      sub_total: this.selectedInvoice1.sub_total,
      discount: this.selectedInvoice1.discount,
      gst: this.selectedInvoice1.gst,
      cash: "",
      upi:"",
      total: this.selectedInvoice1.total,
      product_details: arr,
      date:this.selectedInvoice1.date
    };
    const url = id._id


    this.data.updateprobill(url, data).subscribe(
      (result:any) => {


        })
        this.tableRows = [];

        for (let i = 0; i < this.selectedInvoice1.product_details.length; i++) {
          this.tableRows.push(this.createTableRow(i));
        }

        const tabledata = document.getElementById("tbody") as HTMLInputElement;
        tabledata.innerHTML = this.tableRows.join("");
        const invoiceInput = document.getElementById("print-space") as HTMLInputElement;
        const screen= document.getElementById("probilldetail") as HTMLInputElement;
        const top=document.getElementById("top1") as HTMLInputElement;
        const trail=document.getElementById("trail") as HTMLInputElement;
        invoiceInput.style.display="block"

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
    printBill() {

      let arr=[];

      for(let i=0;i<this.selectedInvoice1.product_details.length;i++){
        let staffname = this.selectedInvoice1.product_details[i].staffname?this.selectedInvoice1.product_details[i].staffname:"";
        // console.log(staffname);

      let serviceNameObj = this.selectedInvoice1.product_details[i].Product_name;
      let proname = serviceNameObj && serviceNameObj.Product_name
        ? serviceNameObj.Product_name
        : serviceNameObj;
      // console.log(proname);
    let category=this.selectedInvoice1.product_details[i].Product_category;
    let prodcat=category && category.Product_category ? category.Product_category : category;
      let  prodid= this.selectedInvoice1.product_details[i].Product_id;

        let proquantity = this.selectedInvoice1.product_details[i].quantity || 0;
        let proamount = this.selectedInvoice1.product_details[i].amount || 0;
        let prorate = this.selectedInvoice1.product_details[i].sp || 0;
        let prodiscount= this.selectedInvoice1.product_details[i].discount || 0;
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
        Product_name:proname,
        Product_category:prodcat,
        quantity:proquantity,
        Product_id:prodid,
        discount:prodiscount,
        Product_price:prorate,
        amount:proamount,
        staffname:staffname
      })
      // console.log(arr);

      }
      var id={
        _id:this.selectedInvoice1._id
      }
      let data: any;
      if(arr.length>0){
        if (isNaN( this.selectedInvoice1.total)) {
          alert("please put the bill correctly")
          window.location.reload()
           }else{
      if (this.selectedInvoice1.payment_mode === "cash and upi") {
        if(this.selectedInvoice1.cash_amount && this.selectedInvoice1.UPI_amount !==""){
        data = {
          payment_mode: this.selectedInvoice1.payment_mode,
          customer_name: this.selectedInvoice1.customer_name,
          customer_phone: this.selectedInvoice1.customer_phone,
          invoice_no: this.selectedInvoice1.invoice_no,
          sub_total: this.selectedInvoice1.sub_total,
          discount: this.selectedInvoice1.discount,
          gst: this.selectedInvoice1.gst,
          cash: this.selectedInvoice1.cash_amount,
          upi: this.selectedInvoice1.UPI_amount,
          total: this.selectedInvoice1.total,
          product_details: arr,
          date:this.selectedInvoice1.date
        };
        const url = id._id;


        this.data.updateprobill(url, data).subscribe(
          (result:any) => {
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
          )

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
          payment_mode: this.selectedInvoice1.payment_mode,
          customer_name: this.selectedInvoice1.customer_name,
          customer_phone: this.selectedInvoice1.customer_phone,
          invoice_no: this.selectedInvoice1.invoice_no,
          sub_total: this.selectedInvoice1.sub_total,
          discount: this.selectedInvoice1.discount,
          gst: this.selectedInvoice1.gst,
          cash: "",
          upi:"",
          total: this.selectedInvoice1.total,
          product_details: arr,
          date:this.selectedInvoice1.date
        };
        const url = id._id


        this.data.updateprobill(url, data).subscribe(
          (result:any) => {
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

            }
          )

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



}
