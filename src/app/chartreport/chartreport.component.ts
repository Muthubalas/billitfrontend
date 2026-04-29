  import { Component, OnInit,ChangeDetectorRef, AfterViewInit } from '@angular/core';
  import { Router } from '@angular/router';
  import { FormControl } from '@angular/forms';
  import { AuthService } from '../auth.service';

  import { DataService } from '../data.service';
  import { MatDialog } from '@angular/material/dialog';
  import { EditprofileComponent } from '../editprofile/editprofile.component';
  import { JwtHelperService } from '@auth0/angular-jwt';

  import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

  import ChartDataLabels from 'chartjs-plugin-datalabels';
  declare const Chart: any;
  import * as XLSX from 'xlsx';
  interface MonthwiseReport {
    date: string; // Assuming the `date` field is a string
    // Add other fields as needed
  }
  interface ProductDetails {
    sno: number;
    Product_name: string;
    Product_category: string;
    staffname: string;
    Product_price: string;
    Product_id: string;
    discount: string;
    quantity: number;
    amount: number;
    _id: string;
  }

  interface ServiceDetails {
    sno: number;
    service_name: string;
    service_gender: string;
    staffname: string;
    quantity: number;
    service_price: number;
    discount: string;
    amount: number;
    _id: string;
  }

  interface InvoiceItem {
    _id: string;
    invoice_no: string;
    customer_name: string;
    customer_phone: string;
    product_details?: ProductDetails[];
    service_details?: ServiceDetails[];
    payment_mode: string;
    sub_total: string;
    gst: string;
    total: string | number;
    date: string;
    cash_amount: string;
    UPI_amount: string;
    createdAt: string;
    __v: number;
  }

  interface ModifiedDataItem {
    'SNO':number,
    'Invoice No': string;
    'Customer Name': string;

    'Date': string; 
    // 'Total': string | number;
    'Item Name'?: string;
    // product_category?: string;
    'GST':string
    'StaffName'?: string;
    'Amount'?: number;
    service_name?: string;
    service_price?: number;

  }

  @Component({
    selector: 'app-chartreport',
    templateUrl: './chartreport.component.html',
    styleUrls: ['./chartreport.component.css']
  })
  export class ChartreportComponent implements OnInit,AfterViewInit  {
    
    helper=new JwtHelperService();
    profile: any;
    token: any;

    profilerole: any;
    role: any;
    getstafflist: any;
    datalist: any;
    originalDataList: any[] = [];
    from: any;

    to: any;
    productname: any;
    inv: any;
    selectpaymode: any;
    customername: any;
    phoneNo: any;
    selectedInvoiceType: any;
    pageSize: number = 4;
    currentPage: number = 1;
    staffname: any;
    totalSales: number = 0;
    invoice:any;
    totalAmount: number = 0;
    a: any;
    dateControl = new FormControl();

    model: any;
    yearList: number[] = [];
    selectedYear: number = 0; // Default value
    selectedMonth: string = 'January';
    total: any;
    totalSaleAmnt:any;
    getmonthresult: any;
    constructor(private router:Router,private auth:AuthService,private data:DataService,
      config: NgbDatepickerConfig,private dialog:MatDialog, private cdr: ChangeDetectorRef) {
        const currentYear = new Date().getFullYear();
        for (let year = currentYear - 50; year <= currentYear + 20; year++) {
          this.yearList.push(year);
        }

        this.selectedYear = currentYear;
      }



    ngOnInit(): void {

      this.token=localStorage.getItem('token')
      let decodetoken=this.helper.decodeToken(this.token)
  this.role=decodetoken.role;
  // console.log(this.role);

      if(decodetoken.role=="0"){
        this.profilerole="Admin"
      }
      else{
        this.profilerole="Manager"
      }
      



    }
 ngAfterViewInit(): void {
    this.loadServiceChart();
    this.loadProductChart();
    this.loadGenderChart();
  }
   
  
loadServiceChart() {
  this.data.topServices().subscribe((result: any) => {


   
    const data = Array.isArray(result[0]) ? result[0] : result;

    const canvas = document.getElementById('serviceChart') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
      existingChart.destroy();
    }

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map((d: any) => d._id), 
        datasets: [{
          label: 'Service Revenue',
          data: data.map((d: any) => d.totalAmount), 
          backgroundColor: '#6C63FF'
        }]
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: (ctx: any) => {
                const item = data[ctx.dataIndex];
                return [
                  `₹ ${item.totalAmount}`,   
                  `Count: ${item.count}`
                ];
              }
            }
          }
        }
      }
    });

  });
}

   
loadProductChart() {
  this.data.topProducts().subscribe((result: any) => {
   

    
    const data = Array.isArray(result[0]) ? result[0] : result;
 console.log("data", data);
    const canvas = document.getElementById('productChart') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    
    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
      existingChart.destroy();
    }

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map((d: any) => d._id), 
        datasets: [{
          label: 'Product Revenue',
          data: data.map((d: any) => d.totalAmount), 
          backgroundColor: '#6C63FF'
        }]
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: (ctx: any) => {
                const item = data[ctx.dataIndex];
                return [
                  `₹ ${item.totalAmount}`,   
                  `Count: ${item.count}`
                ];
              }
            }
          }
        }
      }
    });

  });
}

loadGenderChart() {
  this.data.genderSale().subscribe((res: any) => {

    const raw = Array.isArray(res[0]) ? res[0] : res;

    const canvas = document.getElementById('genderChart') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 🔥 Destroy old chart
    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
      existingChart.destroy();
    }

    // 🔥 STEP 1: Merge genders
    const genderMap: any = {
      male: { total: 0, count: 0 },
      female: { total: 0, count: 0 },
      other: { total: 0, count: 0 }
    };

    raw.forEach((item: any) => {
      let g = (item.gender || '').toLowerCase();

      if (g === 'male') {
        genderMap.male.total += item.totalAmount;
        genderMap.male.count += item.count;
      } 
      else if (g === 'female') {
        genderMap.female.total += item.totalAmount;
        genderMap.female.count += item.count;
      } 
      else {
        // 🔥 null + unknown → OTHER
        genderMap.other.total += item.totalAmount;
        genderMap.other.count += item.count;
      }
    });

    // 🔥 STEP 2: Prepare chart data
    const labels = ['Male', 'Female', 'Other'];
    const values = [
      genderMap.male.total,
      genderMap.female.total,
      genderMap.other.total
    ];

    const counts = [
      genderMap.male.count,
      genderMap.female.count,
      genderMap.other.count
    ];

    // 🔥 STEP 3: Create chart
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: ['#4CAF50', '#FF4081', '#9E9E9E']
        }]
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: (ctx: any) => {
                const index = ctx.dataIndex;
                return [
                  `${labels[index]}`,
                  `₹ ${values[index]}`,
                  `Count: ${counts[index]}`
                ];
              }
            }
          }
        }
      }
    });

  });
}


    servebill(){
      this.router.navigate(['service_bill'])
    }
    probill(){
      this.router.navigate(['product_bill'])
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
      isOpen1:boolean = false;

      toggleSidebar1() {
        this.isOpen1 = !this.isOpen1;
      }


  }
