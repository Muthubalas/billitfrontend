import { Component, OnInit,Input, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { EditprofileComponent } from '../editprofile/editprofile.component';
import { DataService } from '../data.service';
import { AddserviceComponent } from '../addservice/addservice.component';
import { UpdateserviceComponent } from '../updateservice/updateservice.component';
import Swal from 'sweetalert2';
interface Service {
  service_id: string;
  service_name: string;
  service_price: number;
  service_category: string;
  service_gender:string;
}
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  profilerole: any;
  token: any;
  helper=new JwtHelperService();
  profile: any;
  userRole: any;
  searchTerm: string = '';
  getservice: any;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  constructor(private dialog:MatDialog,private elementRef:ElementRef,
    private data:DataService,private router:Router,private auth:AuthService) { }
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
    this.getservicelist()
    this.filteredPeople()
  }
  @Input() sideNavOpen: boolean = false;


  toggleSideNav() {
    this.sideNavOpen = !this.sideNavOpen;
  }
  isDropdownOpen1 = false;

  toggleDropdown1() {
    this.isDropdownOpen1 = !this.isDropdownOpen1;
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
  logout(){
    this.router.navigate(['login'])
    this.data.removeToken()

  }
  getservicelist(){
    return this.data.getservice().subscribe((result:any)=>{
      this.getservice=result.listserv;


    })
   }

   onFilterChange(): void {
    // Reset to the first page when the filter changes
    this.currentPage = 1;
  }

  get filteredPeople() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    const filtered = this.searchTerm.trim() // Trim leading and trailing whitespace from the search term
      ? this.getservice.filter((service: Service) =>
          service.service_name.toLowerCase().startsWith(this.searchTerm.toLowerCase().trim()) ||
          service.service_id.toLowerCase().startsWith(this.searchTerm.toLowerCase().trim()) ||
          service.service_gender.toLowerCase().startsWith(this.searchTerm.toLowerCase().trim()) ||
          service.service_price.toString().includes(this.searchTerm.toLowerCase().trim())
        )
      : this.getservice;

    // Pagination logic can be added here if needed

    return filtered;
  }

  calculateIndex(index: number): number {
    return (this.currentPage - 1) * this.itemsPerPage + index + 1;
  }
  get totalPages(): number {
    return Math.ceil(
      (this.searchTerm
        ? this.getservice.filter((service: Service) =>
          service.service_name.toLowerCase().includes(this.searchTerm.toLowerCase())
        ).length
        : this.getservice.length) / this.itemsPerPage
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
    saveserve(){
      this.dialog.open(AddserviceComponent,{
        width:'792px',
        height:'507px',

      })
     }
     updateserve(serve:any){


      this.dialog.open(UpdateserviceComponent,{
        width:'792px',
        height:'480px',
        panelClass: 'custom-mat-dialog',
        data:serve
      })
      .afterClosed().subscribe(value=>{
        if(value==="Update"){
          // this.getservicelist();

        }
      })
    }
    deleteservice(servelist:any){
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete"
      }).then((result) => {
        if (result.isConfirmed) {


      const serviceData = {
        service_id: servelist.service_id,
        service_name: servelist.service_name,
        service_price: servelist.service_price,
        service_category:servelist.service_category
      };

      const idData = {
        _id:servelist._id
      };



      const url =idData._id


      this.data.deleteservice(url, serviceData).subscribe(
        (result) => {

          Swal.fire({
            title: "Deleted!",
            text: "Service has been deleted.",
            icon: "success"
          })
          // alert("service deleted successfully")
          // this.router.navigate(['serve'])
          .then(()=>{
            window.location.reload();
          })

          },


        (error) => {
          console.error('Error updating service:', error);

        }
      );
    }
  });
    }
}
