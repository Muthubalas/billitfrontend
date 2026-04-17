import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jsPDF } from 'jspdf';
import {  HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import html2canvas from 'html2canvas';
import { Observable, of,BehaviorSubject } from 'rxjs';


export class User{
  // data: any;
}
@Injectable({
  providedIn: 'root'
})
export class DataService {
  prod: string;
  private services: any[] = [];
  private isLoggedInVar: boolean = false;
  selectedInvoice: any;
  selectedInvoice1: any;
  // pageTitle: string;
  helper=new JwtHelperService();
  endpoint="http://localhost:3011"
  //  endpoint="https://blush-backend.billitnow.in/"
  // endpoint="https://reference-backend.billitnow.in/"
  // endpoint="https://marvel-selaiyur-backend.billitnow.in/"
//  endpoint="https://chillbreezeomr-backend.billitnow.in/"
  // endpoint="https://marvel-ag-backend.billitnow.in/"
  //  endpoint="https://marvelmanapakkam-backend.billitnow.in/"
  //  endpoint="https://marvelomr-backend.billitnow.in/"
    //  endpoint="https://billitnow-backend.rainbowmedia.co.in/"
    //  endpoint="https://dsaloon-backend.billitnow.in/"
  constructor(private http:HttpClient) {
    if (this.endpoint === "https://marvelmanapakkam-backend.billitnow.in/") {
      document.title = "Marvel";
    } else if (this.endpoint === "https://chillbreezeomr-backend.billitnow.in/") {
      document.title = "Memories";
    } else if (this.endpoint === "https://marvelomr-backend.billitnow.in/") {
      document.title = "Marvel";
    }else if (this.endpoint === "https://reference-backend.billitnow.in/") {
      document.title = "Golden";
    }else if (this.endpoint === "https://marvel-ag-backend.billitnow.in/") {
      document.title = "Marvel-Annanagar";
    }else if (this.endpoint === "https://billitnow-backend.rainbowmedia.co.in/") {
      document.title = "Rainbow Media";
    }else if (this.endpoint === "https://dsaloon-backend.billitnow.in/") {
      document.title = "D Saloon";
    } else if (this.endpoint === "https://marvel-selaiyur-backend.billitnow.in/") {
      document.title = "Marvel";
    }
    else if (this.endpoint === "https://velachery-backend.billitnow.in/") {
      document.title = "Marvel";
    }
     else if (this.endpoint === "https://blush-backend.billitnow.in/") {
      document.title = "Blush";
    }
    
    this.prod = '';
   }


  private cusphnoSource = new BehaviorSubject<string>('');
  cusphno$ = this.cusphnoSource.asObservable();
  private cusphno1Source = new BehaviorSubject<string>('');
  cusphno1$ = this.cusphno1Source.asObservable();
  sendCusphno(cusphno: string) {
    this.cusphnoSource.next(cusphno);
  }
  sendCusphno1(cusphno1: string) {
    this.cusphnoSource.next(cusphno1);
  }
  login(email: string, password: string): Observable<any> {

    //  this.isLoggedInVar = true;
    const body = { email, password };
    return this.http.post(`${this.endpoint}/login`, body);
  }

  logout(): Observable<any> {
    return this.http.get(`${this.endpoint}/logout`);
  }


  getToken(): string | null {

    return localStorage.getItem('token');
  }

  clearToken(): void {

    this.isLoggedInVar = false;
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {

    return !!this.getToken();
  }
  isLoggedIn(): boolean {

    const token = localStorage.getItem('token');
    return token!=null;
    // return !!token;
  }
  private token: string | null = null;



  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }


  removeToken() {
    // this.token = null;
    localStorage.removeItem('token');
  }

  getCurrentUser() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.helper.decodeToken(token);
      return decodedToken;
    }
    return null;
  }
  getUserRole(): number {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.helper.decodeToken(token);
      if (decodedToken && decodedToken.role) {
        // Assuming the role is stored as a number in the token
        return Number(decodedToken.role);
      }
    }
    return -1;
  }

  saveproduct(data:any):Observable<User>{
    return this.http.post(this.endpoint+"/api/save",data)
  }

  getinvoice():Observable<User>{
    return this.http.get(this.endpoint+"/api/addinvoice")
  }
  listinvoice(data:any):Observable<User>{
    return this.http.post(this.endpoint+"/api/listinvoice",data)
  }
  saveinvoice(data:any):Observable<User>{
    return this.http.post(this.endpoint+"/api/saveinvoice",data)
  }

  getpro(data:any):Observable<User>{
    return this.http.post(this.endpoint+"/api/get",data)
  }
  // login(data:any):Observable<User>{
  //   return this.http.post(this.endpoint+"/api/getuser",data)
  // }
  updated(data:any):Observable<User>{
    return this.http.put(this.endpoint+"/api/update",data)
  }

  deleteproduct(data:any):Observable<User>{
    return this.http.post(this.endpoint+"/api/delete",data)

  }
  getproduct():Observable<User>{
    return this.http.get(this.endpoint+"/api/getproduct")
  }
  getlist():Observable<User>{
    return this.http.get(this.endpoint+"/api/get")
  }

  getproid():Observable<User>{
    return this.http.get(this.endpoint+"/getproductID")
  }
  getcusid():Observable<User>{
    return this.http.get(this.endpoint+"/getcustomerID")
  }
  getcus():Observable<User>{
    return this.http.get(this.endpoint+"/customer-list")
  }
  getprodcat(id: any): Observable<any> {
    const url = `${this.endpoint}/categorysearch_prod/${id}`;

    return this.http.get(url);
  }
  // getprodcat(data:any):Observable<User>{
  //   return this.http.post(data,{})
  // }
  getadmin():Observable<User>{
    return this.http.get(this.endpoint+"/admin-list")
  }
  addservice(data:any):Observable<User>{
    return this.http.post(this.endpoint+"/service-store",data)
  }
  addexpanse(data:any):Observable<User>{
    return this.http.post(this.endpoint+"/expense-store",data)
  }
  getservice():Observable<User>{
    return this.http.get(this.endpoint+"/service-list")
  }
  getserviceid():Observable<User>{
    return this.http.get(this.endpoint+"/getserviceID")
  }
  // ------Appointment---------------
  savepappointment(data:any):Observable<User>{
    return this.http.post(this.endpoint+"/api/appointment-store",data)
  }
  addappointment(data:any):Observable<User>{
    return this.http.post(this.endpoint+"/appointment-store",data)
  }
  getappointmentid():Observable<User>{
    return this.http.get(this.endpoint+"/getappointmentID")
  }
  getappointment():Observable<User>{
    return this.http.get(this.endpoint+"/appointment-list")
  }
  updateappointment(id: any, data: any): Observable<any> {
    const url = `${this.endpoint}/update-appointment/${id}`;
    return this.http.put(url, data);
  }
  deleteappointment(id: any, data: any): Observable<any> {
    const url = `${this.endpoint}/delete-appointment/${id}`;
    return this.http.delete(url, data);
  }
  // ---------------------------------
  getexpenselist():Observable<User>{
    return this.http.get(this.endpoint+"/expense-list")
  }
  getempid():Observable<User>{
    return this.http.get(this.endpoint+"/getstaffID")
  }
  getservebillid():Observable<User>{
    return this.http.get(this.endpoint+"/getservbillID")
  }
  leastcountretail():Observable<User>{
    return this.http.get(this.endpoint+"/least_retail")
  }
  stockinretail():Observable<User>{
    return this.http.get(this.endpoint+"/stockin_retail")
  }
  stockoutretail():Observable<User>{
    return this.http.get(this.endpoint+"/stockout-retail")
  }
 totalproretail():Observable<User>{
    return this.http.get(this.endpoint+"/total-retailproduct")
  }
  leastcountsalon():Observable<User>{
    return this.http.get(this.endpoint+"/least_salon")
  }
  stockinsalon():Observable<User>{
    return this.http.get(this.endpoint+"/stockin_salon")
  }
  stockoutsalon():Observable<User>{
    return this.http.get(this.endpoint+"/stockout-salon")
  }
 totalprosalon():Observable<User>{
    return this.http.get(this.endpoint+"/total-salonproduct")
  }
  malestaff():Observable<User>{
    return this.http.get(this.endpoint+"/Malestaff")
  }
  femalestaff():Observable<User>{
    return this.http.get(this.endpoint+"/femalestaff")
  }

  saveproinvoice(data:any):Observable<User>{
    return this.http.post(this.endpoint+"/prodbill-store",data)
  }
  saveservinvoice(data:any):Observable<User>{
    return this.http.post(this.endpoint+"/servbill-store",data)
  }
  getprobillid():Observable<User>{
    return this.http.get(this.endpoint+"/getprodbillID")
  }
  addadmin(data:any):Observable<User>{
    return this.http.post(this.endpoint+"/admin-store",data)
  }
  addexpense(data:any,id:any):Observable<User>{
    return this.http.post(this.endpoint+`/salon-expense/${id}`,data)
  }
  print(params: HttpParams): Observable<User> {
    const url = this.endpoint + "/productpdf";
    console.log("Request URL:", url);
    console.log("Request Params:", params.toString());

    return this.http.get(url, { params });
  }

  filterpro(params: HttpParams):Observable<User>{
    return this.http.get(this.endpoint+"/prod-search",{params})
  }
  filterserve(params: HttpParams):Observable<User>{
    return this.http.get(this.endpoint+"/serv-search",{params})
  }
  getquantity(data:any):Observable<User>{
    return this.http.get(this.endpoint+`/productIDsearch/${data}`)
  }
  getquantityserve(data:any):Observable<User>{
    return this.http.get(this.endpoint+`/categorySearch/${data}`)
  }

  updateExpense(id: any, data: any): Observable<any> {
    const url = `${this.endpoint}/update-expense/${id}`;
    return this.http.put(url, data);
  }
  updatemem(id: any, data: any): Observable<any> {
    const url = `${this.endpoint}/update-customerPhone/${id}`;
    return this.http.put(url, data);
  }

updateservice(id: any, data: any): Observable<any> {
  const url = `${this.endpoint}/update-service/${id}`;
  return this.http.put(url, data);
}
addinv(id: any, data: any): Observable<any> {
  const url = `${this.endpoint}/add-quantity/${id}`;
  return this.http.post(url, data);
}
editinv(id: any, data: any): Observable<any> {
  const url = `${this.endpoint}/editQuantity/${id}`;
  return this.http.post(url, data);
}
deleteservice(id: any, data: any): Observable<any> {
  const url = `${this.endpoint}/delete-service/${id}`;
  return this.http.delete(url, data);
}
updatepro(id: any, data: any): Observable<any> {
  const url = `${this.endpoint}/update-product/${id}`;
  return this.http.put(url, data);
}
updateservicebill(id:any, data: any): Observable<any> {
  const url = `${this.endpoint}/update-servbill/${id}`;
  return this.http.put(url, data);
}
updateprobill(id:any,  data: any): Observable<any> {
  const url = `${this.endpoint}/update-prodbill/${id}`;
  return this.http.put(url, data);
}
deletepro(id: any, data: any): Observable<any> {
  const url = `${this.endpoint}/delete-product/${id}`;
  return this.http.delete(url, data);
}
deleteservicebill(id:any, data: any): Observable<any> {
  const url = `${this.endpoint}/delete-servbill/${id}`;
  return this.http.delete(url, data);
}
deleteprobill(id:any, data: any): Observable<any> {
  const url = `${this.endpoint}/delete-prodbill/${id}`;
  return this.http.delete(url, data);
}
deleteExpense(id:any, data: any): Observable<any> {
  const url = `${this.endpoint}/delete-expense/${id}`;
  return this.http.delete(url, data);
}
totalcutomer():Observable<User>{
  return this.http.get(this.endpoint+"/total-no-customer")
}
totalbill():Observable<User>{
  return this.http.get(this.endpoint+"/total-no-bill")
}
totalservice():Observable<User>{
  return this.http.get(this.endpoint+"/total-no-service")
}
totaldaynosale():Observable<User>{
  return this.http.get(this.endpoint+"/totalDay-no-sale")
}
monthnosale():Observable<User>{
  return this.http.get(this.endpoint+"/month-no-sale")
}
yearnosale():Observable<User>{
  return this.http.get(this.endpoint+"/total-no-sale")
}
daynomale():Observable<User>{
  return this.http.get(this.endpoint+"/Day-no-male")
}
monthnomale():Observable<User>{
  return this.http.get(this.endpoint+"/Month-no-male")
}
yearnomale():Observable<User>{
  return this.http.get(this.endpoint+"/Year-no-male")
}
daynofemale():Observable<User>{
  return this.http.get(this.endpoint+"/Day-no-female")
}
monthnofemale():Observable<User>{
  return this.http.get(this.endpoint+"/Month-no-female")
}
yearnofemale():Observable<User>{
  return this.http.get(this.endpoint+"/Year-no-female")
}
getprocata(data:String):Observable<any>{
  var a=`https://new-billit.marvelsalon.in/categorysearch_prod/${data}`;
  const requestBody = {};

  return this.http.get(a);

}
addstaff(id: FormData): Observable<any> {
  const url = `${this.endpoint}/staff-store`;
  return this.http.post(url, id);
}
updateadmin(id: any, data: any): Observable<any> {
  const url = `${this.endpoint}/update-admin/${id}`;
  return this.http.put(url, data);
}
findadmin(url: string): Observable<any> {
  return this.http.get(url);
}
findadminal(token: string): Observable<User> {
  return this.http.get<User>(`${this.endpoint}/find-admin/${token}`);
}
updatestaff(id: any, data: FormData): Observable<any> {
  const url = `${this.endpoint}/update-staff/${id}`;
  return this.http.put(url, data);
}
updatecustomer(id: any, data: any): Observable<any> {
  const url = `${this.endpoint}/update-customer/${id}`;
  return this.http.put(url, data);
}
deletecustomer(id: any, data: any): Observable<any> {
  const url = `${this.endpoint}/delete-customer/${id}`;
  return this.http.delete(url, data);
}
deleteadmin(id: any, data: any): Observable<any> {
  const url = `${this.endpoint}/delete-admin/${id}`;
  return this.http.delete(url, data);
}
deletestaff(id: any, data: any): Observable<any> {
  const url = `${this.endpoint}/delete-staff/${id}`;
  return this.http.delete(url, data);
}
addcustomer(data:any):Observable<User>{
  return this.http.post(this.endpoint+"/customer-store",data)
}
  getproductlist():Observable<User>{
    return this.http.get(this.endpoint+"/product-list")
  }
  getcusdetails(id:any):Observable<User>{
    const url = `${this.endpoint}/getdetails/${id}`;
    return this.http.get(url)
  }
  getproductinvlist():Observable<User>{
    return this.http.get(this.endpoint+"/prodbill-list")
  }
  getserviceinvlist():Observable<User>{
    return this.http.get(this.endpoint+"/servbill-list")
  }
  addproduct(data:any):Observable<User>{
    return this.http.post(this.endpoint+"/product-store",data)
  }
  GenerateInvoicePDF(invoiceno:any){
    return this.http.get('https://localhost:7118/Invoice/generatepdf?InvoiceNo='+invoiceno,{observe:'response',responseType:'blob'});

  }
  getreportsPage(pageno: number):Observable<User>{
    return this.http.get(`${this.endpoint}/total-report?page=${pageno}`)
  }
    getreports():Observable<User>{
    return this.http.get(`${this.endpoint}/total-report`)
  }
  daywisereports():Observable<User>{
    return this.http.get(this.endpoint+"/daywise-report")
  }
  monthwisereports(year: any): Observable<User> {
    // Append the 'year' parameter to the URL using HttpParams
    const params = new HttpParams().set('year', year);
    const url = this.endpoint + "/monthwise-report";

    // Include the params in the get request
    return this.http.get<User>(url, { params });
  }
  daywisereports1(year: any, month: any): Observable<User> {
    // Create HttpParams object with 'year' and 'month' parameters
    const params = new HttpParams()
      .set('year', year)
      .set('month', month);
  
    const url = this.endpoint + "/daywise-report";
  
    // Include the params in the GET request
    return this.http.get<User>(url, { params });
  }
  
  getstaff():Observable<User>{
    return this.http.get(this.endpoint+"/staff-list")
  }
  lastfive():Observable<User>{
    return this.http.get(this.endpoint+"/Lastfivedata")
  }
  private invDataSubject = new BehaviorSubject<any>(null);
  invData$ = this.invDataSubject.asObservable();

  updateInvData(data: any) {
    this.invDataSubject.next(data);
  }
  generatePDF(jsonData: any[]): void {
    const htmlTable = this.jsonToHtmlTable(jsonData, ['id', 'name']);

    const tempTable = document.createElement('table');
    tempTable.innerHTML = htmlTable;

    const clonedTable = tempTable.cloneNode(true) as HTMLTableElement;

    const exportButton = clonedTable.querySelector('button');
    if (exportButton) {
      exportButton.remove();
    }

    const images = clonedTable.querySelectorAll('img');
    images.forEach((img) => img.remove());

    document.body.appendChild(clonedTable);

    const doc = new jsPDF();

    html2canvas(clonedTable).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      document.body.removeChild(clonedTable);

      doc.addImage(imgData, 'PNG', 15, 15, imgWidth, imgHeight);

      doc.save('jsonToPdf.pdf');
    });
  }

  jsonToHtmlTable(jsonData: any[], fields: string[]): string {
    let htmlTable = '<table border="1">';
    htmlTable += '<tr>';
    fields.forEach((field) => {
      htmlTable += `<th>${field}</th>`;
    });
    htmlTable += '</tr>';
    jsonData.forEach((item: any) => {
      htmlTable += '<tr>';
      fields.forEach((field) => {
        htmlTable += `<td>${item[field]}</td>`;
      });
      htmlTable += '</tr>';
    });
    htmlTable += '</table>';
    return htmlTable;
  }

}
