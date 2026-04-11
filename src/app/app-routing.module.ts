import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { ServeComponent } from './serve/serve.component';
import { AddserviceComponent } from './addservice/addservice.component';
import { UpdateserviceComponent } from './updateservice/updateservice.component';
import { AdminComponent } from './admin/admin.component';
import { AddcustomerComponent } from './addcustomer/addcustomer.component';
import { CustomerComponent } from './customer/customer.component';
import { StaffComponent } from './staff/staff.component';
import { InventoryComponent } from './inventory/inventory.component';

import { ProbillingComponent } from './probilling/probilling.component';
import { ServebillingComponent } from './servebilling/servebilling.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './auth.guard';
import { ProductreportComponent } from './productreport/productreport.component';
import { UpdateservebillComponent } from './updateservebill/updateservebill.component';
import { DashComponent } from './dash/dash.component';
import { UpdateprobillComponent } from './updateprobill/updateprobill.component';
import { SaloninventComponent } from './saloninvent/saloninvent.component';
import { ExpenseComponent } from './expense/expense.component';
import { SidetestComponent } from './sidetest/sidetest.component';
import { SidenavbarComponent } from './sidenavbar/sidenavbar.component';
import { ServiceComponent } from './service/service.component';
import { ProductComponent } from './product/product.component';
import { SaloninvadminComponent } from './saloninvadmin/saloninvadmin.component';

import { InvdetailsComponent } from './invdetails/invdetails.component';
import { StaffrepComponent } from './staffrep/staffrep.component';
import { DayreportComponent } from './dayreport/dayreport.component';
import { MonthreportComponent } from './monthreport/monthreport.component';
import { AppointmentComponent } from './appointment/appointment.component';

// const routes: Routes = [{path:"table",component:TableComponent},
// {path:"serve",component:ServeComponent},{path:"addservice",component:AddserviceComponent},
// {path:"upserve",component:UpdateserviceComponent},{path:"admin",component:AdminComponent},
// {path:"customer",component:CustomerComponent },{path:"staff",component:StaffComponent},
// {path:"invent",component:InventoryComponent},{path:"servreport",component:ServbillreportComponent},
// {path:"probill",component:ProbillingComponent},{path:"servebill",component:ServebillingComponent},
// {path:"login",component:LoginComponent},{path:"logout",component:LogoutComponent},
// {path:"prorep",component:ProductreportComponent},{path:"up",component:UpdateservebillComponent},
// {path:"dash",component:DashboardComponent},{path:"dashy",component:DashComponent },
// {path:"side",component:SidenavComponent},{path:"main",component:MainComponent},
// {path:"updateprorep",component:UpdateprobillComponent},{path:"dt",component:DatatableComponent},
// {path:"salon",component:SaloninventComponent},{path:"expense",component:ExpenseComponent}];

const routes: Routes = [{path:"product_admin",component:TableComponent,canActivate: [AuthGuard] },
{path:"service_admin",component:ServeComponent,canActivate: [AuthGuard] },{path:"addservice",component:AddserviceComponent,canActivate: [AuthGuard] },
{path:"upserve",component:UpdateserviceComponent,canActivate: [AuthGuard] },{path:"admin",component:AdminComponent,canActivate: [AuthGuard] },
{path:"customer",component:CustomerComponent,canActivate: [AuthGuard] , data: { expectedRoles: [0, 1] } },{path:"staff",component:StaffComponent,canActivate: [AuthGuard] },
{path:"invent",component:InventoryComponent,canActivate: [AuthGuard] },
{path:"product_bill",component:ProbillingComponent},{path:"service_bill",component:ServebillingComponent,canActivate: [AuthGuard] },
{path:"login",component:LoginComponent},{path:"sidet",component:SidetestComponent},
{path:"inv_summary",component:ProductreportComponent},{path:"update_servicebill",component:UpdateservebillComponent,canActivate: [AuthGuard] },
{path:"dashboard",component:DashComponent ,canActivate: [AuthGuard] },
{path:"update_productbill",component:UpdateprobillComponent,canActivate: [AuthGuard] },{path:"salon",component:SaloninventComponent,canActivate: [AuthGuard] },
{path:"expense",component:ExpenseComponent,canActivate: [AuthGuard] },
{path:"appointment",component:AppointmentComponent,canActivate: [AuthGuard] },
{ path: '', redirectTo: '/login', pathMatch: 'full' },{path:"sidenavbar",component:SidenavbarComponent},
{path:"service",component:ServiceComponent},{path:"product",component:ProductComponent ,canActivate: [AuthGuard]},
{path:"saloninvadmin",component:SaloninvadminComponent ,canActivate: [AuthGuard]},
{path:"inv_details",component:InvdetailsComponent ,canActivate: [AuthGuard]},{path:"staff_report",component:StaffrepComponent ,canActivate: [AuthGuard]},
{path:"day_report",component:DayreportComponent ,canActivate: [AuthGuard]},{path:"month_report",component:MonthreportComponent ,canActivate: [AuthGuard]}];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
