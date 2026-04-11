import { Component, OnInit,Input } from '@angular/core';
import { DataService } from '../data.service';
import { UpdatememComponent } from '../updatemem/updatemem.component';
import { MatDialog } from '@angular/material/dialog';
import { AddcustomerComponent } from '../addcustomer/addcustomer.component';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { EditprofileComponent } from '../editprofile/editprofile.component';
import { AddcustomerserveComponent } from '../addcustomerserve/addcustomerserve.component';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-probilling',
  templateUrl: './probilling.component.html',
  styleUrls: ['./probilling.component.css'],
  providers:[DatePipe]
})
export class ProbillingComponent implements OnInit {
  getprobillids: any;

  a:any;
  keyword="Product_name";
  customer_name: any;
  membership_no: any;
  customer_phone: any;
  getpro: any[]=[];
  item:any=[];
  tableRows: string[] = [];
  selectedpro: any;
  b: any;
  c: any;
  // subtotal: any;
  disrate: any = 0;
  // value: any;
  // prodis:0
  discountrate:any=0;
  // gstamount: any;
  gstrate:any=0;
  roundgst:any=0;
  grandtotal: any;
  // total: any;
  getstafflist: any;
  payMode: string = '';
  invoice_no: any;
  selectpaymode: any;
  proname: any;
  selectedCountry: any;
  selectedstaff: any;
  inv: any;
  date: any;
  formatdate: any;
  hrs: any;
  hr: any;
  noon: any;
  time: any;
  timestr: any;
  min: any;
  catArr:any=[]
  dynamicHeight: number = 350;
  defaultHeight: number = 271.999;
  showpay:boolean=false;
  procat=[{
    id:"1",
    category:"shampoo",
    rate:250},{id:"2",category:"soap",
    rate:20}]
  catprod: any;
  getcat:any=[];
  catName: any;
  subt: any;
  profilerole: any;
  token: any;
  helper=new JwtHelperService();
  profile: any;
  role: any;
  subtotal: number = 0;
  value: number = 0;
  gstamount: number = 0;
  onlinepay: boolean=false;
  cash:any;
  upi: any;

  total: number = 0;
  prodcost: any;
  gstpercent: any;
  newdate: Date | null = null;
  originalDate: any;
  formattedDate: string="";
  changeformat: any;
  savedate: any;
  currentDate: string;
  receivedCusphno: any;
  minDate: string;
  rainbowmedia:boolean=false;
  memoriesaddr:boolean=false;
  marvelmanapakaddr:boolean=false;
  marvelomraddr:boolean=false;
  marvelselaiyur:boolean=false;
  marvelannanagar:boolean=false;
  marvelvelachery:boolean=false;
  dsaloon:boolean=false;
  blush:boolean=false;
  constructor(private datas:DataService,private dialog:MatDialog,private router:Router,private auth:AuthService,
    public datapipe:DatePipe) {
    const datePipe = new DatePipe('en-US');
    this.currentDate = datePipe.transform(new Date(), 'yyyy-MM-dd')!;
    this.minDate = datePipe.transform(new Date(), 'yyyy-MM-dd')!;
    this.savedate=this.currentDate
  // const savedate=new Date(this.currentDate+ 'T00:00:00')
  //   this.savedate=datePipe.transform(savedate, 'yyyy-MM-ddTHH:mm:ss.SSSZ')!;
  }

  ngOnInit(): void {
    if("https://chillbreezeomr-backend.billitnow.in/"===this.datas.endpoint){
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
  this.marvelselaiyur=false;
  this.marvelvelachery=false;
  this.dsaloon=false;
   this.blush=false;
}else if("https://billitnow-backend.rainbowmedia.co.in/"===this.datas.endpoint){
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

      const url =this.receivedCusphno;

      this.datas.getcusdetails(url).subscribe(
        (result) => {


          this.a = result;
    this.customer_name=this.a.details.customer_name;
    this.membership_no=this.a.details.membership_no


    if (this.membership_no !== "") {

      this.updateButtonVisibility();
    }else{
      this.updateButtonVisibility1()
    }
          // this.cdr.detectChanges();
        })

    });
    this.datas.cusphno1$.subscribe((cusphno) => {
      this.receivedCusphno = cusphno;

      const url =this.receivedCusphno

      this.datas.getcusdetails(url).subscribe(
        (result) => {


          this.a = result;
    this.customer_name=this.a.details.customer_name;
    this.membership_no=this.a.details.membership_no;

    if (this.membership_no !== "") {
      this.updateButtonVisibility();
    }
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
    this. getproductlist()
    // this.getdata()
    this.getprobillinv()
    this.  getstaff()
//     this.item = [
// {
//   select_items: "select product",
//   quantity: 1,
//   gender:'',
//   service_price: 0,
//   prodisc:0,
//   Product_name: '',
//   Product_category: '',
//   cost:0,
//   amount: 0,
//   prod: null
// }
//     ];
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
  getdata() {
    this.customer_phone = this.customer_phone.trim();
    if (this.customer_phone.length == 10) {
      const memdet = {
        customer_phone: this.customer_phone
      };

    const url =memdet.customer_phone

    this.datas.getcusdetails(url).subscribe(
      (result) => {
        this.a = result;
        // console.log(this.a);
        if(this.a.details==null){
          this.dialog.open(AddcustomerserveComponent,{
            width:'792.336px',
        height: '526.996px',
        data: { phoneNumber: this.customer_phone },

          })

        }
        this.customer_name = this.a.details.customer_name;

        this.membership_no = this.a.details.membership_no;

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

      }
      );
    }
    else{
      this.customer_name='';
      this.membership_no = ''
    }
  }



  isDropdownOpen1 = false;

  toggleDropdown1() {
    this.isDropdownOpen1 = !this.isDropdownOpen1;
  }
  logout(){
    this.router.navigate(['login'])
    this.datas.removeToken()

  }
  onCountrySelection(i:any,data:any) {
    this.item[i].name=data.selectedCountry;
  }
  @Input() sideNavOpen: boolean = false;


  toggleSideNav() {
    this.sideNavOpen = !this.sideNavOpen;
  }
  isOpen1:boolean = false;

  toggleSidebar1() {
    this.isOpen1 = !this.isOpen1;
  }
  getprobillinv(){
    return this.datas.getprobillid().subscribe((result:any)=>{
      this.getprobillids=result.productinvoice_no;
      // this.service.controls['id'].setValue(this.getserviceids);
    })
   }
   addcustomer(){
    this.dialog.open(AddcustomerComponent,{
      width:'792.336px',
  height: '526.996px',
    })
   }

public isDisabled: boolean = true;
toggleInputField() {
  this.isDisabled = !this.isDisabled;
}
filteredProducts=this.getpro;
getproductlist(){
  return this.datas.totalproretail().subscribe((result:any)=>{
    const uniqueProductNames = [...new Set(result.listproduct.map((product: any) => product.Product_name))];
    this.getpro = uniqueProductNames.map(productName => result.listproduct.find((product: any) => product.Product_name === productName));
    // this.getpro=result.listserv;
    this.filteredProducts=this.getpro
  })
}

   isDropdownOpen = false;

   toggleDropdown() {
     this.isDropdownOpen = !this.isDropdownOpen;
   }
   servebill(){
    this.router.navigate(['service_bill'])
  }
  probill(){
    this.router.navigate(['probill'])
  }


  onfocused(e:any){

  }
  customFilter = function(products: any[], query: string): any[] {
    const lowerQuery = query.toLowerCase();
    return products.filter(prod => prod.Product_name.toLowerCase().startsWith(lowerQuery));
  }
  selectserv(i: any, event: any) {
    const inputValue = event.target.value.toLowerCase().replace(/\s/g, ''); // Ensure case-insensitivity
    this.filteredProducts = this.getpro.filter(item =>
      item.Product_name.toLowerCase().replace(/\s/g, '').startsWith(inputValue)
    );


    const data = this.filteredProducts.find(item => item.Product_name.toLowerCase().replace(/\s/g, '') === inputValue);
  this.item[i].prod=data.Product_name


    const url =data.Product_name

    this.datas.getprodcat(url).subscribe(
      (result:any) => {
        this.catprod = result;
        this.getcat=this.catprod.details
        this.catArr.push(this.getcat)
        this.item[i].Product_category= this.getcat;
        const retailProducts = this.getcat.filter((product:any) => product.Product_type === "Retail");
        this.catArr[i] = retailProducts;
  // this.catArr[i] = this.getcat;


      })

    this.calculateSubtotal()
  }
  selectevent(i:any,data:any){


    this.selectedpro=data;
    const memdet = {
      Product_name: data.Product_name
    };


    const url =memdet.Product_name;

    this.datas.getprodcat(url).subscribe(
      (result:any) => {
        this.catprod = result;
        this.getcat=this.catprod.details
        this.catArr.push(this.getcat)
        this.item[i].Product_category= this.getcat;

// this.catArr[i] = this.getcat;
const retailProducts = this.getcat.filter((product:any) => product.Product_type === "Retail");
this.catArr[i] = retailProducts;

      })

    this.calculateSubtotal()
  }
  disabledItemClick(event: any): void {
    event.stopPropagation();
  }

  oncategoryselection(i:any,data:any){


    this.item[i].id=data.Product_category.Product_id;

    data.quantity=1;
    this.item[i].cost=data.quantity*data.Product_category .Product_price;
    this.item[i].amount=data.quantity*data.Product_category
    .Product_price;
  this.item[i].Product_category=data.Product_category;
  this.prodcost=undefined;
  this.cash="";
this.upi="";
  this.calculateSubtotal()

  }
  onProductCostChange(index: number, rowData: any) {
    this.item[index].amount = rowData.cost;
    this.prodcost= rowData.cost;

    rowData.quantity=1
    rowData.prodisc=0
    this.calculateSubtotal()


  }
  Quantity(i: any, data: any) {

    // this.item[i].cost= data.quantity*data.Product_category.Product_price
    // this.item[i].amount = data.quantity*data.Product_category.Product_price
    if(this.prodcost!=undefined){



      if(data.quantity>data.Product_category.Product_quantity){

        Swal.fire({
          title: 'Warning',
          text: 'Out of stock',
          icon: 'warning',
          confirmButtonText: 'OK'
        });

        data.quantity="";
        this.item[i].cost="";
          this.item[i].amount = "";

      }else{

          // data.quantity=1;
              // this.item[i].cost=this.item[i].rate;
              if(data. Product_category.Product_category){
               this.item[i].cost=data.quantity * this.prodcost;
          this.item[i].amount = data.quantity *this.prodcost;
                }else{
                  Swal.fire({
                    title: 'Warning',
                    text: 'Please select product category',
                    icon: 'warning',
                    confirmButtonText: 'OK'
                  });
                }
      }
    }
    else{
    if(data.quantity>data.Product_category.Product_quantity){

      Swal.fire({
        title: 'Warning',
        text: 'Out of stock',
        icon: 'warning',
        confirmButtonText: 'OK'
      });

      data.quantity="";
      this.item[i].cost="";
        this.item[i].amount = "";

    }else{

        // data.quantity=1;
            // this.item[i].cost=this.item[i].rate;
            if(data. Product_category.Product_category

              ){
             this.item[i].cost= data.quantity*data.Product_category.Product_price
        this.item[i].amount =  data.quantity*data.Product_category.Product_price
              }else{
                Swal.fire({
                  title: 'Warning',
                  text: 'Please select product category',
                  icon: 'warning',
                  confirmButtonText: 'OK'
                });
              }
    }

    }
    this.cash="";
    this.upi="";

        this.calculateSubtotal()

      }
//   Quantity(i: any, data: any) {
// if(this.prodcost!=undefined){

//   if(data.quantity>data.Product_category.Product_quantity){

//     Swal.fire({
//       title: 'Warning',
//       text: 'Out of stock',
//       icon: 'warning',
//       confirmButtonText: 'OK'
//     });

//     data.quantity="";
//     this.item[i].cost="";
//       this.item[i].amount = "";

//   }else{

//       // data.quantity=1;
//           // this.item[i].cost=this.item[i].rate;
//           if(data. Product_category.Product_category){
//            this.item[i].cost=data.quantity * this.prodcost;
//       this.item[i].amount = data.quantity *this.prodcost;
//             }else{
//               Swal.fire({
//                 title: 'Warning',
//                 text: 'Please select product category',
//                 icon: 'warning',
//                 confirmButtonText: 'OK'
//               });
//             }
//   }
// }
// else{
// if(data.quantity>data.Product_category.Product_quantity){

//   Swal.fire({
//     title: 'Warning',
//     text: 'Out of stock',
//     icon: 'warning',
//     confirmButtonText: 'OK'
//   });

//   data.quantity="";
//   this.item[i].cost="";
//     this.item[i].amount = "";

// }else{

//     // data.quantity=1;
//         // this.item[i].cost=this.item[i].rate;
//         if(data. Product_category.Product_category

//           ){
//          this.item[i].cost=data.quantity * data.prod.Product_price;
//     this.item[i].amount = data.quantity *data.prod.Product_price;
//           }else{
//             Swal.fire({
//               title: 'Warning',
//               text: 'Please select product category',
//               icon: 'warning',
//               confirmButtonText: 'OK'
//             });
//           }
// }
// // console.log(data.Product_price);
// }
// this.cash="";
// this.upi="";

//     this.calculateSubtotal()

//   }
  calculateSubtotal() {
    this.subt = this.item.reduce((total: number, currentItem: any) => total + currentItem.amount, 0);
    this.subtotal=this.subt.toFixed(2)

    this.discount()
}

prodis(i:any,data:any){
  this.item[i].disper=data.prodisc;

let discountamount=this.item[i].cost * (data.prodisc/100)
this.item[i].amount=this.item[i].cost-discountamount;
this.cash="";
this.upi="";
this.calculateSubtotal()
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
    this.gstamount=(this.subtotal-this.value)*(this.gstrate/100)

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
  getstaff(){
    return this.datas.getstaff().subscribe((result:any)=>{
      this.getstafflist=result.liststaff;
      // console.log(this.getstafflist);

    })
  }

  onchangesearch(event: Event){
    // console.log("RANDOM SEARCH:", event);

    }
    addRow() {
      this.item.push(
        {
          select_items: " ",
          prod:'',
          Product_category: '',
          quantity: 1,
          prodis:0,
          Product_price: 0,
          amount: 0,
          cost:0,
        }
      );
      this.tableRows.push(this.createTableRow(this.item.length - 1));
      this.updateFilteredServices();

    }
    updateFilteredServices() {
      if (this.item.length) {

        this.filteredProducts = this.getpro;
      }
      // else {

      //   this.filteredProducts = this.getpro.filter(item =>
      //     this.item.every((row: any) => row.prod !== item.Product_name)
      //   );
      // }
    }

    // updateFilteredServices() {
    //   this.filteredProducts = this.getpro.filter(item =>
    //     this.item.every((row:any) => row.prod !== item.Product_name)
    //   );
    //   console.log(this.filteredProducts);

    // }
    createTableRow(index: number): string {
      const item = this.item[index];

      return `<tr>
        <td style="padding:2px 5px">${item.prod.Product_name}</td>
        <td style="padding:2px 5px">${item.Product_category.Product_category}</td>
        <td style="padding:2px 5px">${item.quantity}</td>
        <td style="padding:2px 5px">${item.cost}</td>
        <td style="padding:2px 5px">${item.amount}</td>

      </tr>`;
    }
    createTableRow1(index: number): string {
      const item = this.item[index];

      return `<tr>
        <td style="padding:2px 5px">${item.prod}</td>
        <td style="padding:2px 5px">${item.Product_category.Product_category}</td>
        <td style="padding:2px 5px">${item.quantity}</td>
        <td style="padding:2px 5px">${item.cost}</td>
        <td style="padding:2px 5px">${item.amount}</td>

      </tr>`;
    }
    deleteRow(index: number) {
      this.item.splice(index, 1);
      this.tableRows.splice(index, 1);
      // this.updateTotalItem()
      this.calculateSubtotal();
      // this.calculateSubquantity()
    }
    selectpay(e:any){
      this.selectpaymode=e.target.value;
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
    selectstaff(event:any){
      event.preventDefault();


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
    capitalizeFirstLetter(word: string): string {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    onClick(): void {
      // this.sendservbill();
      this.secondFunction();
    }
    secondFunction(): void {
      let arr=[];


      for(let i=0;i<this.item.length;i++){
        let staffname = this.item[i].name;
        let proid=this.item[i].id?this.item[i].id : " ";
        let proname = this.item[i].prod ? this.item[i].prod.Product_name : null;
        let category = this.item[i].Product_category.Product_category?this.item[i].Product_category.Product_category:"" ;
        if (!staffname || !proname || !category) {

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

        let cost=this.item[i].cost || 0;
        let discount=this.item[i].disper||0;

       arr.push({
        Product_name:proname,
        Product_category:category,
        staffname:staffname,
        Product_price:cost,
        quantity:proquantity,
        discount:discount,
        amount:proamount,
        Product_id:proid
      })

      }

        let customername=this.customer_name?this.customer_name:"";
         customername=this.capitalizeFirstLetter(customername);
        let customerphone=this.customer_phone?this.customer_phone:"";
        let membership=this.getprobillids?this.getprobillids:"";
        let paymode=this.selectpaymode?this.selectpaymode:"";
        if(customername!='' && customerphone!='' && paymode!='' && arr.length > 0){
        var currentdate=new Date()

        let data: any;

        if (paymode === "cash and upi") {
          data = {
            payment_mode:paymode,
            customer_name: customername,
            customer_phone:customerphone,
            invoice_no: this.getprobillids,
            sub_total:this.subtotal,
            // discount:this.discountrate,
            gst: this.roundgst,
            cash:  this.cash,
            upi: this.upi,
            total:this.grandtotal,
            product_details: arr,
            date:this.savedate,
            membership_no:this.membership_no
          };
        } else {
          data = {
            payment_mode:paymode,
            customer_name: customername,
            customer_phone:customerphone,
            invoice_no: this.getprobillids,
            sub_total:this.subtotal,
            // discount:this.discountrate,
            gst: this.roundgst,
            cash: "",
            upi:"",
            total:this.grandtotal,
            product_details: arr,
            date:this.savedate,
            membership_no:this.membership_no
          };
        }
          this.datas.saveproinvoice(data).subscribe((result:any)=>{
            this.inv=result
    window.location.reload()
          })
    }
    }

    onClick1(): void {
      // this.sendservbill1();
      this.secondFunction1();
    }
    secondFunction1(): void {
      let arr=[];


      for(let i=0;i<this.item.length;i++){
        let staffname = this.item[i].name;
        let proid=this.item[i].id?this.item[i].id : " ";
        let proname = this.item[i].prod;
        let category = this.item[i].Product_category.Product_category?this.item[i].Product_category.Product_category:"" ;
        if (!staffname || !proname || !category) {

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

        let cost=this.item[i].cost || 0;
        let discount=this.item[i].disper||0;

       arr.push({
        Product_name:proname,
        Product_category:category,
        staffname:staffname,
        Product_price:cost,
        quantity:proquantity,
        discount:discount,
        amount:proamount,
        Product_id:proid
      })

      }

        let customername=this.customer_name?this.customer_name:"";
         customername=this.capitalizeFirstLetter(customername);
        let customerphone=this.customer_phone?this.customer_phone:"";
        let membership=this.getprobillids?this.getprobillids:"";
        let paymode=this.selectpaymode?this.selectpaymode:"";
        if(customername!='' && customerphone!='' && paymode!='' && arr.length > 0){
        var currentdate=new Date()

        let data: any;

        if (paymode === "cash and upi") {
          data = {
            payment_mode:paymode,
            customer_name: customername,
            customer_phone:customerphone,
            invoice_no: this.getprobillids,
            sub_total:this.subtotal,
            // discount:this.discountrate,
            gst: this.roundgst,
            cash:  this.cash,
            upi: this.upi,
            total:this.grandtotal,
            product_details: arr,
            date:this.savedate,
            membership_no:this.membership_no
          };
        } else {
          data = {
            payment_mode:paymode,
            customer_name: customername,
            customer_phone:customerphone,
            invoice_no: this.getprobillids,
            sub_total:this.subtotal,
            // discount:this.discountrate,
            gst: this.roundgst,
            cash: "",
            upi:"",
            total:this.grandtotal,
            product_details: arr,
            date:this.savedate,
            membership_no:this.membership_no
          };
        }
          this.datas.saveproinvoice(data).subscribe((result:any)=>{
            this.inv=result
    window.location.reload()
          })
    }
    }





    updatemem(){
      this.dialog.open(UpdatememComponent,{
        width: '792px',
        height: '250px',
  data: { phoneNumber: this.customer_phone },
      })
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

      generateBillUrl(): string {
        let params = new URLSearchParams();

        params.append('payment_mode', this.selectpaymode);
        params.append('customer_name', this.capitalizeFirstLetter(this.customer_name || ''));
        params.append('customer_phone', this.customer_phone || '');
        params.append('invoice_no', this.getprobillids || '');
        params.append('sub_total', this.subtotal.toString());
        params.append('gst', this.roundgst);
        params.append('total', this.grandtotal);
        params.append('date', this.savedate);
        this.gstpercent = this.gstrate || 0;
        params.append('gst_percent', this.gstpercent)
        params.append('membership_no', this.membership_no)
        params.append('cash', this.cash)
        params.append('upi', this.upi)
        params.append('product_details', JSON.stringify(this.item.map((item:any) => ({
          Product_name: item.prod.Product_name,
          service_gender: item.selectedgender,
          staffname: item.name,
          Product_price: item.cost || 0,
          quantity: item.quantity || 0,
          discount: item.disper || 0,
          amount: item.amount || 0,
          Product_id:item.id,
          Product_category: item.Product_category.Product_category?item.Product_category.Product_category:"",

        }))));


return this.datas.endpoint + "productpdf" + params.toString();


      }
      generateBillUrl1(): string {
        let params = new URLSearchParams();

        params.append('payment_mode', this.selectpaymode);
        params.append('customer_name', this.capitalizeFirstLetter(this.customer_name || ''));
        params.append('customer_phone', this.customer_phone || '');
        params.append('invoice_no', this.getprobillids || '');
        params.append('sub_total', this.subtotal.toString());
        params.append('gst', this.roundgst);
        params.append('total', this.grandtotal);
        params.append('date', this.savedate);
        this.gstpercent = this.gstrate || 0;
        params.append('gst_percent', this.gstpercent)
        params.append('membership_no', this.membership_no)
        params.append('cash', this.cash)
        params.append('upi', this.upi)
        params.append('product_details', JSON.stringify(this.item.map((item:any) => ({
          Product_name: item.prod,
          service_gender: item.selectedgender,
          staffname: item.name,
          Product_price: item.cost || 0,
          quantity: item.quantity || 0,
          discount: item.disper || 0,
          amount: item.amount || 0,
          Product_id:item.id,
          Product_category: item.Product_category.Product_category?item.Product_category.Product_category:"",

        }))));



        return this.datas.endpoint + "/productpdf?" + params.toString();
      }
     async sendservbill(){
      let arr=[];


      for(let i=0;i<this.item.length;i++){
        let staffname = this.item[i].name;

        let proid=this.item[i].id?this.item[i].id : " ";
        let proname = this.item[i].prod ? this.item[i].prod.Product_name : null;
        let category = this.item[i].Product_category.Product_category?this.item[i].Product_category.Product_category:"" ;
        if (!staffname || !proname || !category) {

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

        let cost=this.item[i].cost || 0;
        let discount=this.item[i].disper||0;

       arr.push({
        Product_name:proname,
        Product_category:category,
        staffname:staffname,
        Product_price:cost,
        quantity:proquantity,
        discount:discount,
        amount:proamount,
        Product_id:proid
      })

      }

        let customername=this.customer_name?this.customer_name:"";
         customername=this.capitalizeFirstLetter(customername);
        let customerphone=this.customer_phone?this.customer_phone:"";
        let membership=this.getprobillids?this.getprobillids:"";
        let paymode=this.selectpaymode?this.selectpaymode:"";
        if(customername!='' && customerphone!='' && paymode!='' && arr.length > 0 && this.getprobillids!=""){
        var currentdate=new Date()
        if (isNaN(this.grandtotal)) {
          alert("please put the bill correctly")
          window.location.reload()
           }else{
        let data: any;
    var date=new Date();
        if (paymode === "cash and upi") {
          if(this.cash && this.upi !==""){
          data = {
            payment_mode:paymode,
            customer_name: customername,
            customer_phone:customerphone,
            invoice_no: this.getprobillids,
            sub_total:this.subtotal,
            date:this.savedate,
            // discount:this.discountrate,
            gst: this.roundgst,
            cash:  this.cash,
            upi: this.upi,
            total:this.grandtotal,
            product_details: arr,
            membership_no:this.membership_no
          };
          const shortenedUrl = await this.shortenUrl(this.generateBillUrl());
          this.sendBillViaWhatsApp(this.customer_phone, shortenedUrl);
          this.datas.saveproinvoice(data).subscribe((result:any)=>{
            this.inv=result
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
            invoice_no: this.getprobillids,
            sub_total:this.subtotal,
            date:this.savedate,
            // discount:this.discountrate,
            gst: this.roundgst,
            cash: "",
            upi:"",
            total:this.grandtotal,
            product_details: arr,
            membership_no:this.membership_no
          };
          const shortenedUrl = await this.shortenUrl(this.generateBillUrl());
          this.sendBillViaWhatsApp(this.customer_phone, shortenedUrl);
          this.datas.saveproinvoice(data).subscribe((result:any)=>{
            this.inv=result
    window.location.reload()
          })

        }
      }

    }
    else{
      Swal.fire({
        title: 'Warning',
        text: 'Please fill mandatory field',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
    }
    sendingBillInProgress: boolean = false;

    async sendservbill1() {
      // Check if sending bill is already in progress
      if (this.sendingBillInProgress) {
        return; // Exit function if already in progress
      }

      this.sendingBillInProgress = true; // Set flag to true indicating process has started

      let arr=[];


      for(let i=0;i<this.item.length;i++){
        let staffname = this.item[i].name;

        let proid=this.item[i].id?this.item[i].id : " ";
        let proname = this.item[i].prod ;
        let category = this.item[i].Product_category.Product_category?this.item[i].Product_category.Product_category:"" ;
        if (!staffname || !proname || !category) {

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

        let cost=this.item[i].cost || 0;
        let discount=this.item[i].disper||0;

       arr.push({
        Product_name:proname,
        Product_category:category,
        staffname:staffname,
        Product_price:cost,
        quantity:proquantity,
        discount:discount,
        amount:proamount,
        Product_id:proid
      })

      }

        let customername=this.customer_name?this.customer_name:"";
         customername=this.capitalizeFirstLetter(customername);
        let customerphone=this.customer_phone?this.customer_phone:"";
        let membership=this.getprobillids?this.getprobillids:"";
        let paymode=this.selectpaymode?this.selectpaymode:"";
        if(customername!='' && customerphone!='' && paymode!='' && arr.length > 0 && this.getprobillids!=""){
        var currentdate=new Date()
        if (isNaN(this.grandtotal)) {
          alert("please put the bill correctly")
          window.location.reload()
           }else{
        let data: any;
    var date=new Date();
        if (paymode === "cash and upi") {
          if(this.cash && this.upi !==""){
          data = {
            payment_mode:paymode,
            customer_name: customername,
            customer_phone:customerphone,
            invoice_no: this.getprobillids,
            sub_total:this.subtotal,
            date:this.savedate,
            // discount:this.discountrate,
            gst: this.roundgst,
            cash:  this.cash,
            upi: this.upi,
            total:this.grandtotal,
            product_details: arr,
            membership_no:this.membership_no
          };
          const shortenedUrl = await this.shortenUrl(this.generateBillUrl1());
          this.sendBillViaWhatsApp(this.customer_phone, shortenedUrl);
          this.datas.saveproinvoice(data).subscribe((result:any)=>{
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
            invoice_no: this.getprobillids,
            sub_total:this.subtotal,
            date:this.savedate,
            // discount:this.discountrate,
            gst: this.roundgst,
            cash: "",
            upi:"",
            total:this.grandtotal,
            product_details: arr,
            membership_no:this.membership_no
          };
          const shortenedUrl = await this.shortenUrl(this.generateBillUrl1());
          this.sendBillViaWhatsApp(this.customer_phone, shortenedUrl);
          this.datas.saveproinvoice(data).subscribe((result:any)=>{
            this.inv=result
            this.sendingBillInProgress = false;

    window.location.reload()
          })

        }
      }

    }
    else{
      Swal.fire({
        title: 'Warning',
        text: 'Please fill mandatory field',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
    }



    billSaved: boolean = false;
    printprobill(){
      if (this.billSaved) {
        return;
      }
      this.tableRows = [];

      for (let i = 0; i < this.item.length; i++) {
        this.tableRows.push(this.createTableRow(i));

      }
      const tabledata = document.getElementById("tbody") as HTMLInputElement;
      tabledata.innerHTML = this.tableRows.join("");

      let arr=[];
      for(let i=0;i<this.item.length;i++){
        let staffname = this.item[i].name;

        let proid=this.item[i].id?this.item[i].id : " ";

        let proname = this.item[i].prod ? this.item[i].prod.Product_name : null;
        let category = this.item[i].Product_category.Product_category?this.item[i].Product_category.Product_category:"" ;
        if (!staffname || !proname || !category) {

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

        let cost=this.item[i].cost || 0;
        let discount=this.item[i].disper||0;

       arr.push({
        Product_name:proname,
        Product_category:category,
        staffname:staffname,
        Product_price:cost,
        quantity:proquantity,
        discount:discount,
        amount:proamount,
        Product_id:proid
      })


      }
      let customername=this.customer_name?this.customer_name:"";
      let customerphone=this.customer_phone?this.customer_phone:"";
      let membership=this.getprobillids?this.getprobillids:"";
      let paymode=this.selectpaymode?this.selectpaymode:"";
      var currentdate=new Date()

      if(customername!='' && customerphone!='' && paymode!='' && arr.length > 0 && this.getprobillids!=""){
        if (isNaN(this.grandtotal)) {
alert("please put the bill correctly")
window.location.reload()
 }else{
        let data: any;

        if (paymode === "cash and upi") {
          if(this.cash && this.upi !==""){
          data = {
            payment_mode:paymode,
            customer_name: customername,
            customer_phone:customerphone,
            invoice_no: this.getprobillids,
            sub_total:this.subtotal,
            discount:this.discountrate,
            gst: this.roundgst,
            cash:  this.cash,
            upi: this.upi,
            total:this.grandtotal,
            product_details: arr,
            date:this.savedate,
            membership_no:this.membership_no
          };
          this.billSaved = true;
          this.datas.saveproinvoice(data).subscribe((result:any)=>{
                this.inv=result
  this.billSaved = false;
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
   window.location.reload()
   this.resetBillSaved();
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
            invoice_no: this.getprobillids,
            sub_total:this.subtotal,
            discount:this.discountrate,
            gst: this.roundgst,
            cash: "",
            upi:"",
            total:this.grandtotal,
            product_details: arr,
            date:this.savedate,
            membership_no:this.membership_no
          };
          this.billSaved = true;
          this.datas.saveproinvoice(data).subscribe((result:any)=>{
                this.inv=result
  this.billSaved = false;
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
   window.location.reload()
   this.resetBillSaved();
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
    printprobill1(){
      if (this.billSaved) {
        return;
      }
      this.tableRows = [];

      for (let i = 0; i < this.item.length; i++) {
        this.tableRows.push(this.createTableRow1(i));

      }
      const tabledata = document.getElementById("tbody") as HTMLInputElement;
      tabledata.innerHTML = this.tableRows.join("");

      let arr=[];
      for(let i=0;i<this.item.length;i++){
        let staffname = this.item[i].name;

        let proid=this.item[i].id?this.item[i].id : " ";

        let proname = this.item[i].prod;
        let category = this.item[i].Product_category.Product_category?this.item[i].Product_category.Product_category:"" ;
        if (!staffname || !proname || !category) {

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

        let cost=this.item[i].cost || 0;
        let discount=this.item[i].disper||0;

       arr.push({
        Product_name:proname,
        Product_category:category,
        staffname:staffname,
        Product_price:cost,
        quantity:proquantity,
        discount:discount,
        amount:proamount,
        Product_id:proid
      })


      }
      let customername=this.customer_name?this.customer_name:"";
      let customerphone=this.customer_phone?this.customer_phone:"";
      let membership=this.getprobillids?this.getprobillids:"";
      let paymode=this.selectpaymode?this.selectpaymode:"";
      var currentdate=new Date()

      if(customername!='' && customerphone!='' && paymode!='' && arr.length > 0 && this.getprobillids!=""){
        if (isNaN(this.grandtotal)) {
alert("please put the bill correctly")
window.location.reload()
 }else{
        let data: any;

        if (paymode === "cash and upi") {
          if(this.cash && this.upi !==""){
          data = {
            payment_mode:paymode,
            customer_name: customername,
            customer_phone:customerphone,
            invoice_no: this.getprobillids,
            sub_total:this.subtotal,
            discount:this.discountrate,
            gst: this.roundgst,
            cash:  this.cash,
            upi: this.upi,
            total:this.grandtotal,
            product_details: arr,
            date:this.savedate,
            membership_no:this.membership_no
          };
          this.billSaved = true;
  //         this.datas.saveproinvoice(data).subscribe((result:any)=>{
  //               this.inv=result
  // this.billSaved = false;
  // const invoiceInput = document.getElementById("print-space") as HTMLInputElement;
  // const screen= document.getElementById("probilldetail") as HTMLInputElement;
  // const top=document.getElementById("top1") as HTMLInputElement;
  // const trail=document.getElementById("trail") as HTMLInputElement;



  // invoiceInput.style.display="block"
  //  screen.style.visibility="hidden"
  //  top.style.visibility="hidden"
  //  trail.style.visibility="hidden"

  //  window.print()

  //  invoiceInput.style.display="none"
  //  screen.style.visibility="visible"
  //  top.style.visibility="visible"
  //  trail.style.visibility="visible"
  //  window.location.reload()
  //  this.resetBillSaved();
  //             })
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
            invoice_no: this.getprobillids,
            sub_total:this.subtotal,
            discount:this.discountrate,
            gst: this.roundgst,
            cash: "",
            upi:"",
            total:this.grandtotal,
            product_details: arr,
            date:this.savedate,
            membership_no:this.membership_no
          };
          this.billSaved = true;
  //         this.datas.saveproinvoice(data).subscribe((result:any)=>{
  //               this.inv=result
  // this.billSaved = false;
  // const invoiceInput = document.getElementById("print-space") as HTMLInputElement;
  // const screen= document.getElementById("probilldetail") as HTMLInputElement;
  // const top=document.getElementById("top1") as HTMLInputElement;
  // const trail=document.getElementById("trail") as HTMLInputElement;



  // invoiceInput.style.display="block"
  //  screen.style.visibility="hidden"
  //  top.style.visibility="hidden"
  //  trail.style.visibility="hidden"

  //  window.print()

  //  invoiceInput.style.display="none"
  //  screen.style.visibility="visible"
  //  top.style.visibility="visible"
  //  trail.style.visibility="visible"
  //  window.location.reload()
  //  this.resetBillSaved();
  //             })
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
    resetBillSaved() {
      this.billSaved = false;
    }

    printBill() {

      let arr=[];
      for(let i=0;i<this.item.length;i++){
        let staffname = this.item[i].name;

        let proid=this.item[i].id?this.item[i].id : " ";

        let proname = this.item[i].prod;
        let category = this.item[i].Product_category.Product_category?this.item[i].Product_category.Product_category:"" ;
        if (!staffname || !proname || !category) {

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

        let cost=this.item[i].cost || 0;
        let discount=this.item[i].disper||0;

       arr.push({
        Product_name:proname,
        Product_category:category,
        staffname:staffname,
        Product_price:cost,
        quantity:proquantity,
        discount:discount,
        amount:proamount,
        Product_id:proid
      })


      }
      let customername = this.customer_name ? this.capitalizeFirstLetter(this.customer_name) : "";
      let customerphone = this.customer_phone ? this.customer_phone : "";
      let membership = this.getprobillids ? this.getprobillids : "";
      let paymode = this.selectpaymode ? this.selectpaymode : "";
      if (customername !== '' && customerphone !== '' && paymode !== '' && arr.length > 0 && this.getprobillids !== "") {
        let data = {
          payment_mode: paymode,
          customer_name: customername,
          customer_phone: customerphone,
          invoice_no: this.getprobillids,
          sub_total: this.subtotal,
          discount: this.discountrate,
          gst: this.roundgst,
          cash: paymode === "cash and upi" ? this.cash : "",
          upi: paymode === "cash and upi" ? this.upi : "",
          total: this.grandtotal,
          product_details: arr,
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
        this.datas.saveproinvoice(data)
        .subscribe(
          (result: any) => {
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
        )
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
