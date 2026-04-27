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
import * as XLSX from 'xlsx';
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
  'GST':string;
  // product_category?: string;
  'StaffName'?: string;
  'Amount'?: number;
  service_name?: string;
  service_price?: number;

}
declare const Chart: any;
interface ReportItem {
  UPI_amount: string;
  cash_amount: string;
  createdAt: string;
  customer_name: string;
  customer_phone: string;
  gst: string;
  invoice_no: string;
  payment_mode: string;
  product_details?: any[]; // You may need to adjust this based on the actual structure
  service_details?: any[]; // You may need to adjust this based on the actual structure
  sub_total: string;
  total: string;
  __v: number;
  _id: string;
}
@Component({
  selector: 'app-dayreport',
  templateUrl: './dayreport.component.html',
  styleUrls: ['./dayreport.component.css'],
  // providers: [provideNativeDateAdapter()],
  // imports: [MatDatepickerModule],
})
export class DayreportComponent implements OnInit {
  // model: NgbDateStruct = { year: 2022, month: 1, day: 1 };
  helper=new JwtHelperService();
  profile: any;
  token: any;
  selectedYear: number = new Date().getFullYear(); // Default value
  profilerole: any;
  role: any;
  getstafflist: any;
  datalist: any;
  originalDataList: any[] = [];
  from: any;
  invoiceData: any[] = [];
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
  filteredData: any[] = [];
  model: any;
  yearList: number[] = [];
  // selectedYear: number;
  selectedMonth: string = '';
  monthtotal: any;
  getdayreport: any;
  sno: number=0;
  constructor(private router:Router,private auth:AuthService,private data:DataService, private cdr: ChangeDetectorRef,
    config: NgbDatepickerConfig,private dialog:MatDialog) {
      const currentYear = new Date().getFullYear();
      for (let year = currentYear - 50; year <= currentYear + 50; year++) {
        this.yearList.push(year);
      }

      this.selectedYear = currentYear;
    }
  ngOnInit(): void {
    this.fetchYears();
    this.selectedMonth = this.getMonthName(new Date().getMonth() + 1);
    this.daywise()
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
 fetchYears() {
  this.data.getYears().subscribe((years: number[]) => {
    this.yearList = years;

    // Auto select latest year
    this.selectedYear = this.yearList[0];

    
  });
}
  onMonthChange(): void {
    this.daywise();
// this.updateChart(this.invoiceData);

  }
  yearchange(year: any) {
    this.selectedYear = year.target.value;
   
  }
  chartInstance: typeof Chart;





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
daywise(){
  return this.data.daywisereports1(this.selectedYear,this.selectedMonth).subscribe((result:any)=>{
    console.log('Response from API:', result);
  this.updateChart(result.data);
this.getdayreport=result.data;
this.monthtotal=result.total;


  })
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
          // 'Total': item.total,

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
          // 'Total': item.total,
        });
      });
    }
  });

  return modifiedData;
}

exportToExcel(): void {
  const modifiedData = this.transformDataForExport(this.filteredData);

  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(modifiedData);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  const totalSalesRow = [null, 'Grand Total:', this.monthtotal];
  const rowCount = ws['!ref'] ? XLSX.utils.decode_range(ws['!ref']).e.r + 1 : 0;
  XLSX.utils.sheet_add_json(ws, [totalSalesRow], { skipHeader: true, origin: `I2`, });
  // XLSX.utils.sheet_add_json(ws, [totalSalesRow], { skipHeader: true, origin: `G${rowCount + 2}`, });
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, 'Day Report.xlsx');
}



getMonthName(monthIndex: number): string {
  return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][monthIndex - 1];
}
getMonthIndex(month: string): number {
  return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].indexOf(month);
}

// public updateChart(data: any[]): void {
//   Chart.register(ChartDataLabels);
//   let totalAmount = 0;
//   const daysInMonth = this.getDaysInMonth(this.selectedYear, this.selectedMonth);
//   const xLabels = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());

//   this.filteredData = this.filterDataByMonth(data, this.selectedMonth);
// // console.log(this.filteredData);

//   for (let total of this.filteredData) {


//     totalAmount += parseFloat(total.total);
//     // console.log(totalAmount);

//   }

//   this.monthtotal = totalAmount.toFixed(2);
//   const ctx = (document.querySelector('.daychart') as HTMLCanvasElement).getContext('2d');

//   if (this.chartInstance) {
//     this.chartInstance.destroy();
//   }

//   if (ctx) {
//     const gradient = ctx.createLinearGradient(0, 0, 0, 400);
//     gradient.addColorStop(0, '#9E2091');
//     gradient.addColorStop(1, '#1F4783');

//     this.chartInstance = new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: xLabels,
//         datasets: [{
//           label: '# of Sales',
//           data: this.getSalesData(this.filteredData, daysInMonth),
//           borderWidth: 1,
//           backgroundColor: gradient,
//         }]
//       },
//       options: {
//         plugins: {
//           legend:{
//             display:false
//           },

//           datalabels: {
//             display: true,

//             color: 'black',
//             align: 'top',
//             anchor: 'top',
//             // offset: -5,
//             formatter: function (value: number, context: any) {
//               if (value > 0) {
//                 return Math.round(value).toString();
//               } else {
//                 return '';
//               }
//             },
//             font:{
//               size:10
//             }

//           }
//         },

//         layout: {
//           padding: {
//             top: 20
//           }
//         },
//         tooltip: {
//           enabled: true,
//           mode: 'index',
//           intersect: false
//         },
//         // breakpoints: {
//         //   768: {
//         //     plugins: {
//         //       datalabels: {
//         //           font: {
//         //               size: 3
//         //           }
//         //       }
//         //   },
//         //     scales: {
//         //       x: {
//         //         ticks: {
//         //           maxTicksLimit: 10,
//         //           maxRotation: 0,
//         //           autoSkip: true,
//         //           fontSize: 30
//         //         },
//         //       },
//         //       y: {
//         //         ticks: {
//         //           font: {
//         //             size: 1
//         //           }
//         //         }
//         //       }
//         //     }
//         //   }
//         // },

//         legend: {
//           display: false
//         },

//   // responsive: true,
//   // maintainAspectRatio: false,
//         scales: {
//           x: {
//             grid: {
//               display: false
//             },

//             ticks: {
//               maxTicksLimit: 40,
//               maxRotation: 6,
//               autoSkip: true,
//               fontSize: 1
//             }

//           },
//           y: {
//             beginAtZero: true,
//             ticks: {
//               fontSize: 1
//             }
//           },

//         }
//       }
//     });
//   } else {
//     console.error("Canvas 2D context is null.");
//   }
// }
public updateChart(data: any[]): void {
  Chart.register(ChartDataLabels);

  // Validate and default selectedYear and selectedMonth
  if (this.selectedYear == null) {
    console.error("Selected year is null. Using the current year.");
    this.selectedYear = new Date().getFullYear();
  }

  if (this.selectedMonth == null) {
    console.error("Selected month is null. Using the current month.");
    this.selectedMonth = (new Date().getMonth() + 1).toString(); // Convert number to string

  }

  const daysInMonth = this.getDaysInMonth(this.selectedYear, this.selectedMonth);
  const xLabels = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());

  // Filter data by month
  this.filteredData = this.filterDataByMonth(data, this.selectedMonth);

  // let totalAmount = 0;
  // for (let total of this.filteredData) {
  //   totalAmount += parseFloat(total.total);
  // }

  // this.monthtotal = totalAmount.toFixed(2);

  const ctx = (document.querySelector('.daychart') as HTMLCanvasElement).getContext('2d');

  if (this.chartInstance) {
    this.chartInstance.destroy();
  }

  if (ctx) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, '#9E2091');
    gradient.addColorStop(1, '#1F4783');

    this.chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: xLabels,
        datasets: [{
          label: '# of Sales',
          data: this.getSalesData(this.filteredData, daysInMonth),
          borderWidth: 1,
          backgroundColor: gradient,
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false
          },
          datalabels: {
            display: true,
            color: 'black',
            align: 'top',
            anchor: 'top',
            formatter: function (value: number, context: any) {
              if (value > 0) {
                return Math.round(value).toString();
              } else {
                return '';
              }
            },
            font: {
              size: 10
            }
          }
        },
        layout: {
          padding: {
            top: 20
          }
        },
        tooltip: {
          enabled: true,
          mode: 'index',
          intersect: false
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              maxTicksLimit: 40,
              maxRotation: 6,
              autoSkip: true
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              fontSize: 10
            }
          }
        }
      }
    });
  } else {
    console.error("Canvas 2D context is null.");
  }
}



filterDataByMonth(data: any[], selectedMonth: string): any[] {
  return data.filter((invoice) => {
    const invoiceMonth = new Date(invoice.date).getMonth();
    return this.getMonthName(invoiceMonth + 1) === selectedMonth;
  });
}

getSalesData(filteredData: any[], daysInMonth: number): number[] {
  const salesData = Array.from({ length: daysInMonth }, () => 0);

  filteredData.forEach((invoice) => {
    const day = new Date(invoice.date).getDate();
    salesData[day - 1] += parseFloat(invoice.total);
  });

  return salesData;
}
private getDaysInMonth(year: number, month: string): number {

  const monthIndex = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].indexOf(month);
  // console.log(monthIndex)

  return new Date(year, monthIndex + 1, 0).getDate();


}
}
