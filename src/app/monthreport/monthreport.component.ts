import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DataService } from '../data.service';
import { MatDialog } from '@angular/material/dialog';
import { EditprofileComponent } from '../editprofile/editprofile.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { JsonPipe } from '@angular/common';
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
  selector: 'app-monthreport',
  templateUrl: './monthreport.component.html',
  styleUrls: ['./monthreport.component.css']
})
export class MonthreportComponent implements OnInit {
  
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
    this.fetchYears();
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
    this.loadDataForChart();



  }
  fetchYears() {
  this.data.getYears().subscribe((years: number[]) => {
    this.yearList = years;

    // Auto select latest year
    this.selectedYear = this.yearList[0];

    // Load chart initially
    this.loadDataForChart();
  });
}

 
  onMonthChange(): void {

  }
  chartInstance: typeof Chart;



  private getDaysInMonth(year: number, month: string): number {

    const monthIndex = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].indexOf(month);
    return new Date(year, monthIndex + 1, 0).getDate();
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


    loadDataForChart() {
  this.data.monthwisereports(this.selectedYear).subscribe((res: any) => {


     const data = res.monthly ? res.monthly : res;
this.totalSaleAmnt=res.grandTotal;
    // Create 12 months array
    const monthlySales = new Array(12).fill(0);
 const monthlyCount = new Array(12).fill(0); 
    data.forEach((item: any) => {
     const index = item.month - 1;

      monthlySales[index] = item.total || 0;
      monthlyCount[index] = item.count || 0;
    });

    const chartData = this.getChartData(monthlySales);
    this.updateChart(chartData,monthlyCount);
  });
}


transformDataForExport(sortedArray: InvoiceItem[]): ModifiedDataItem[] {
  const modifiedData: ModifiedDataItem[] = [];
  let sno = 1;
  sortedArray.forEach(item => {

    if (item.product_details) {

      item.product_details.forEach(product => {
        // console.log(product);
        product.sno = sno;


        modifiedData.push({
          'SNO': sno++,
          'Invoice No': item.invoice_no,
          'Customer Name': item.customer_name,

          'Date': item.date,
          'Item Name': product.Product_name,
          'StaffName': product.staffname,
          'Amount': product.amount,
          'GST':item.gst,


        });


      });
    }

    if (item.service_details) {

      item.service_details.forEach(service => {
        service.sno=sno
        modifiedData.push({

          'SNO': sno++,
          'Invoice No': item.invoice_no,
          'Date': item.date,
          'Customer Name': item.customer_name,

          'Item Name': service.service_name,
          'StaffName': service.staffname,

          'Amount': service.amount,
          'GST':item.gst,

        });
      });
    }
  });

  return modifiedData;
}

exportToExcel(): void {
  const modifiedData = this.transformDataForExport(this.getmonthresult);

  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(modifiedData);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  const totalSalesRow = [null, 'Grand Total:', this.total];
  const rowCount = ws['!ref'] ? XLSX.utils.decode_range(ws['!ref']).e.r + 1 : 0;
  XLSX.utils.sheet_add_json(ws, [totalSalesRow], { skipHeader: true, origin: `I2`, });
  // XLSX.utils.sheet_add_json(ws, [totalSalesRow], { skipHeader: true, origin: `G${rowCount + 2}`, });
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, 'Month Report.xlsx');
}




yearchange(year: any) {
  this.selectedYear = year.target.value;
  this.loadDataForChart();
}
updateChart(data: any, monthlyCount: number[]): void {
  Chart.register(ChartDataLabels);
  const ctx = (document.getElementById('monthchart') as HTMLCanvasElement).getContext('2d');

  if (ctx) {
    // Destroy the existing chart to prevent memory leaks
    Chart.getChart(ctx)?.destroy();

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, '#9E2091');
    gradient.addColorStop(1, '#1F4783');
    data.datasets.forEach((dataset: any) => {
      dataset.backgroundColor = gradient;
    });

    const newChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        plugins: {
          legend: {
            display: false,
          },
           tooltip: {
            callbacks: {
              label: function (context: any) {
                const value = context.raw;
                const index = context.dataIndex;

                const count = monthlyCount[index];

                return [
                  `Amount: ₹${Math.round(value)}`,
                  `Bills: ${count}`   
                ];
              }
            }
          },
          datalabels: {
            color: 'black', // Set label text color
            anchor: 'top',
            align: 'top',
            formatter: function (value: any, context: any) {
              if (value > 0) {
                return Math.round(value).toString();
              } else {
                return '';
              }
            }
            // formatter: (value: any) => Math.round(value), // Format label text
          },
        },
        layout: {
          padding: {
            top: 40
          }
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
          },
        },
        animation: {
          onComplete: (animation: any) => {
            // ... your existing animation code
          },
        },
      },
    });

    this.cdr.detectChanges(); // Trigger change detection
  } else {
    console.error('Canvas 2D context is null.');
  }
}




getChartData(monthlySales: number[]): any {
  return {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Total Sales',
        data: monthlySales,
        borderWidth: 1,
        // backgroundColor: gradient,
      },
    ],
  };
}

}
