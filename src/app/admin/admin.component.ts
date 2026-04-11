import { Component, OnInit,Input } from '@angular/core';
import { DataService } from '../data.service';
import { AddadminComponent } from '../addadmin/addadmin.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateadminComponent } from '../updateadmin/updateadmin.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../auth.service';
import { EditprofileComponent } from '../editprofile/editprofile.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  getadmin: any;
  helper=new JwtHelperService();

  token: any;
  profilerole: any;
  profile: any;
  // endpoint="http://localhost:2002"
  constructor(private data:DataService,private dialog:MatDialog,private router:Router,private auth:AuthService) { }

  ngOnInit(): void {
    this.getadminlist()
    this.token=localStorage.getItem('token')
let decodetoken=this.helper.decodeToken(this.token)

if(decodetoken.role=="0"){
  this.profilerole="Admin"
}
else{
  this.profilerole="Manager"
}
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
  getadminlist(){
    return this.data.getadmin().subscribe((result:any)=>{
      this.getadmin=result.listadmin;
      // console.log(this.getadmin[i].role);

      this.getadmin.forEach((admin: any) => {
        if(admin.role==="0"){
          admin.role="Admin";

        }
        else if(admin.role==="1"){
          admin.role="Manager";

        }
      });
    })
   }
   addadmin(){
    this.dialog.open(AddadminComponent,{
      width: '792px',
height: '381px',
    })
  }
  updateadmin(admin:any){

    this.dialog.open(UpdateadminComponent,{
      width:'792px',
      height:'381px',
      data:admin
    })
    .afterClosed().subscribe(value=>{
      if(value==="Update"){
        this.getadminlist()

      }
    })
  }
  @Input() sideNavOpen: boolean = false;


  // sideNavOpen: boolean = false;

  toggleSideNav() {
    this.sideNavOpen = !this.sideNavOpen;
  }

  deleteadmin(admin: any) {
    Swal.fire({
      title: "Are you sure?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete"
    }).then((result) => {
      if (result.isConfirmed) {

        const serviceData = {
          name: admin.name,
          phone: admin.phone,
          email: admin.email,
          password: admin.password
        };

        const idData = {
          _id: admin._id
        };
        const url =idData._id

        this.data.deleteadmin(url, serviceData).subscribe(
          (result) => {

              window.location.reload();

          },
          (error) => {
            console.error('Error updating service:', error);
          }
        );
      }
    });
  }

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  servebill(){
    this.router.navigate(['service_bill'])
  }
  probill(){
    this.router.navigate(['product_bill'])
  }
}
