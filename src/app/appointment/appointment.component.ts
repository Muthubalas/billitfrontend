import { Component, OnInit,Input, ElementRef,ChangeDetectorRef} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../data.service';

import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../auth.service';
import { EditprofileComponent } from '../editprofile/editprofile.component';
import { AddappointmentComponent } from '../addappointment/addappointment.component';
import { UpdateappointmentComponent } from '../updateappointment/updateappointment.component';

interface Appointment {
  appointment_id: string;
  customer_name: string;
  gender: string;
  service:string;
  phone:number;
  date_time:string;
  location:string;
  staffname:string;
  status:string;

  // Add other properties if needed
}
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  getappointment: Appointment[] = [];
  getservice:any;
  profilerole: any;
  token: any;
  helper=new JwtHelperService();
  profile: any;
  userRole: any;


  constructor(private dialog:MatDialog,private elementRef:ElementRef,
    private data:DataService,private router:Router,private auth:AuthService, private cdr: ChangeDetectorRef) { }
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
        .body.style.backgroundColor = '#F4F7FE';
}

  ngOnInit(): void {
    this.token=localStorage.getItem('token')
    let decodetoken=this.helper.decodeToken(this.token)
this.userRole=decodetoken.role;
    if(decodetoken.role=="0"){
      this.profilerole="Admin"
    }
    else{
      this.profilerole="Manager"
    }
    this.getappointmentlist();
  
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
    saveappointment(){
    this.dialog.open(AddappointmentComponent,{
      width:'792px',
      height:'507px',

    })
   }
   servebill(){
    this.router.navigate(['service_bill'])
  }
  probill(){
    this.router.navigate(['product_bill'])
  }
   @Input() sideNavOpen: boolean = false;


   // sideNavOpen: boolean = false;

   toggleSideNav() {
     this.sideNavOpen = !this.sideNavOpen;
   }

  getappointmentlist(){
    return this.data.getappointment().subscribe((result:any)=>{
      this.getappointment=result.listappointments;
      console.log('Appointment list:', this.getappointment);

    })
   }

   searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  onFilterChange(): void {
    // Reset to the first page when the filter changes
    this.currentPage = 1;
  }

  get filteredPeople() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    
    const filtered = this.searchTerm.trim() 
      ? this.getappointment.filter((appointment: Appointment) => 
          appointment.customer_name.toLowerCase().includes(this.searchTerm.toLowerCase().trim()) ||
          appointment.gender.toLowerCase().includes(this.searchTerm.toLowerCase().trim()) ||
          appointment.service.toLowerCase().includes(this.searchTerm.toLowerCase().trim()) ||
          appointment.phone.toString().toLowerCase().includes(this.searchTerm.toLowerCase().trim()) ||
          appointment.location.toLowerCase().includes(this.searchTerm.toLowerCase().trim()) ||
          appointment.staffname.toLowerCase().includes(this.searchTerm.toLowerCase().trim()) ||
          appointment.status.toLowerCase().includes(this.searchTerm.toLowerCase().trim())
        )
      : this.getappointment;
  // console.log("List",this.getappointment);
    
     return filtered;
     
  }

  
  




    calculateIndex(index: number): number {
      return (this.currentPage - 1) * this.itemsPerPage + index + 1;
    }

    get totalPages(): number {
      return Math.ceil(
        (this.searchTerm
          ? this.getappointment.filter((appointment: Appointment) =>
            appointment.customer_name.toLowerCase().includes(this.searchTerm.toLowerCase())
          ).length
          : this.getappointment.length) / this.itemsPerPage
      );
    }

    totalPagesArray(): number[] {
      const visiblePages = 3; // Number of pages to display

      if (this.totalPages <= visiblePages) {
        return Array.from({ length: this.totalPages }, (_, index) => index + 1);
      }

      const startPage = Math.max(1, this.currentPage - Math.floor(visiblePages / 2));
      const endPage = Math.min(this.totalPages, startPage + visiblePages - 1);

      return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
    }

    showPrevious(): boolean {
      return this.currentPage > 1;
    }

    showNext(): boolean {
      return this.currentPage < this.totalPages;
    }

    onPageChange(page: number): void {
      this.currentPage = page;
    }

    onPrevious1(): void {
      if (this.showPrevious()) {
        this.currentPage = 1; // Reset to first page
      }
    }

    onPrevious(): void {
      if (this.showPrevious()) {
        this.currentPage--;
      }
    }

    onNext(): void {
      if (this.showNext()) {
        this.currentPage++;
      }
    }


  onLastPage(): void {
    if (this.showNext()) {
      this.currentPage = this.totalPages;
    }
  }

  updateappointment(appointment:any){


    this.dialog.open(UpdateappointmentComponent,{
      width:'792px',
      height:'480px',
      panelClass: 'custom-mat-dialog',
      data:appointment
    })
    .afterClosed().subscribe(value=>{
      if(value==="Update"){
        this.getappointmentlist();

      }
    })
  }
  isDropdownOpen1 = false;

  toggleDropdown1() {
    this.isDropdownOpen1 = !this.isDropdownOpen1;
  }
  logout(){
    this.router.navigate(['login'])
    this.data.removeToken()

  }
  deleteappointment(appointmentlist:any){
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


    const appointmentData = {
      appointment_id: appointmentlist.appointment_id,
      appointment_customer_name: appointmentlist.appointment_customer_name,
      appointment_gender: appointmentlist.appointment_gender,
      appointment_service:appointmentlist.appointment_service,
      appointment_phone:appointmentlist.appointment_phone,
      appointment_date_time:appointmentlist.appointment_date_time,
      appointment_location:appointmentlist.appointment_location,
      appointment_staffname:appointmentlist.appointment_staffname,
      appointment_status:appointmentlist.appointment_status
    };
  
    const idData = {
      _id:appointmentlist._id
    };




    const url = idData._id


    this.data.deleteappointment(url, appointmentData).subscribe(
      (result) => {

        Swal.fire({
          title: "Deleted",
          text: "Appointment has been deleted",
          icon: "success"
        })
        // alert("service deleted successfully")
        // this.router.navigate(['serve'])
        .then(()=>{
          window.location.reload();
        })

        },


      (error) => {
        console.error('Error updating appointment:', error);

      }
    );
  }
});
  }

isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
