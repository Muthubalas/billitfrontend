import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { ServeComponent } from './serve/serve.component';
import { AddserviceComponent } from './addservice/addservice.component';
import { AddproComponent } from './addpro/addpro.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { UpdateserviceComponent } from './updateservice/updateservice.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { NgToastModule } from 'ng-angular-popup';
import { UpdateproComponent } from './updatepro/updatepro.component';
import { AdminComponent } from './admin/admin.component';
import { AddadminComponent } from './addadmin/addadmin.component';
import { UpdateadminComponent } from './updateadmin/updateadmin.component';
import { CustomerComponent } from './customer/customer.component';
import { AddcustomerComponent } from './addcustomer/addcustomer.component';
import { UpdcustomerComponent } from './updcustomer/updcustomer.component';
import { StaffComponent } from './staff/staff.component';
import { AddstaffComponent } from './addstaff/addstaff.component';
import { InventoryComponent } from './inventory/inventory.component';
import { AddinventComponent } from './addinvent/addinvent.component';

import { ProbillingComponent } from './probilling/probilling.component';
import { ServebillingComponent } from './servebilling/servebilling.component';
import { UpdatestaffComponent } from './updatestaff/updatestaff.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

import {Routes, RouterModule } from '@angular/router';
import { ProductreportComponent } from './productreport/productreport.component';
import { UpdateservebillComponent } from './updateservebill/updateservebill.component';

import { DashComponent } from './dash/dash.component';
import { UpdatememComponent } from './updatemem/updatemem.component';

import { SidetestComponent } from './sidetest/sidetest.component';

import { UpdateprobillComponent } from './updateprobill/updateprobill.component';

import {DataTablesModule} from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SaloninventComponent } from './saloninvent/saloninvent.component';
import { AddexpenseComponent } from './addexpense/addexpense.component';
import { ExpenseComponent } from './expense/expense.component'
import {MatTableModule} from '@angular/material/table';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AladexpenseComponent } from './aladexpense/aladexpense.component';
import { UpdateExpenseComponent } from './update-expense/update-expense.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { AddsaloninventComponent } from './addsaloninvent/addsaloninvent.component';

import { UpdatesaloninventComponent } from './updatesaloninvent/updatesaloninvent.component';
import { UpdateprodinventComponent } from './updateprodinvent/updateprodinvent.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { AddcustomerserveComponent } from './addcustomerserve/addcustomerserve.component';
import { SidenavbarComponent } from './sidenavbar/sidenavbar.component';
import { ServiceComponent } from './service/service.component';
import { ProductComponent } from './product/product.component';
import { SaloninvadminComponent } from './saloninvadmin/saloninvadmin.component';

import { InvdetailsComponent } from './invdetails/invdetails.component';
import { StaffrepComponent } from './staffrep/staffrep.component';
import { DayreportComponent } from './dayreport/dayreport.component';
import { MonthreportComponent } from './monthreport/monthreport.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AppointmentComponent } from './appointment/appointment.component';
import { AddappointmentComponent } from './addappointment/addappointment.component';
import { UpdateappointmentComponent } from './updateappointment/updateappointment.component';
import { ChartreportComponent } from './chartreport/chartreport.component';

const routes: Routes = [
  // Define your routes here
];
@NgModule({
  declarations: [
    AppointmentComponent,
    AppComponent,
    TableComponent,
    ServeComponent,
    AddserviceComponent,
    AddproComponent,
    UpdateserviceComponent,
    UpdateproComponent,
    AdminComponent,
    AddadminComponent,
    UpdateadminComponent,
    CustomerComponent,
    AddcustomerComponent,
    UpdcustomerComponent,
    StaffComponent,
    AddstaffComponent,
    InventoryComponent,
    AddinventComponent,

    ProbillingComponent,
    ServebillingComponent,
    UpdatestaffComponent,
    LoginComponent,

    ProductreportComponent,

       UpdateservebillComponent,

       DashComponent,
       UpdatememComponent,

       SidetestComponent,

       UpdateprobillComponent,


       SaloninventComponent,
       AddexpenseComponent,
       ExpenseComponent,
       AladexpenseComponent,
       UpdateExpenseComponent,

       AddsaloninventComponent,

       UpdatesaloninventComponent,
       UpdateprodinventComponent,
       EditprofileComponent,
       AddcustomerserveComponent,
       SidenavbarComponent,
       ServiceComponent,
       ProductComponent,
       SaloninvadminComponent,

       InvdetailsComponent,
       StaffrepComponent,
       DayreportComponent,
       MonthreportComponent,
       AppointmentComponent,
       AddappointmentComponent,
       UpdateappointmentComponent,
ChartreportComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSnackBarModule,
    NgbModule,
    FormsModule, ReactiveFormsModule, BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    NgxExtendedPdfViewerModule,
    MatTableModule,

    // MatFormFieldModule,
    DataTablesModule,
    MatDatepickerModule,
    MatPaginatorModule,
    AutocompleteLibModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatInputModule,
    MatSelectModule,
    RouterModule.forRoot(routes)
  ],
  providers: [HttpClient,AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
