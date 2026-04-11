import { Component, OnInit,Input} from '@angular/core';
import { AddstaffComponent } from '../addstaff/addstaff.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { UpdatestaffComponent } from '../updatestaff/updatestaff.component';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx'
import Swal from 'sweetalert2';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../auth.service';
import { EditprofileComponent } from '../editprofile/editprofile.component';
interface Service {
  name:string,
  initial:string
}
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  getstafflist: any;
  getservice: any;

  totalstaff: any;
  malestaffcount: any;
  femalestaff: any;
  femalestaffdetails: any;
  malestaffdetails: any;
  helper=new JwtHelperService();

  token: any;
  profilerole: any;
  profile: any;
  userRole: any;
  // endpoint="http://localhost:2002"
  constructor(private dialog:MatDialog,private data:DataService,private router:Router,private auth:AuthService) { }

  ngOnInit(): void {
    this.token=localStorage.getItem('token')
    let decodetoken=this.helper.decodeToken(this.token)
this.userRole=decodetoken.role
    if(decodetoken.role=="0"){
      this.profilerole="Admin"
    }
    else{
      this.profilerole="Manager"
    }
    this.getstaff()
this. malestaff()
this.female()
  }
  @Input() sideNavOpen: boolean = false;


  // sideNavOpen: boolean = false;

  toggleSideNav() {
    this.sideNavOpen = !this.sideNavOpen;
  }
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  addstaff(){
    this.dialog.open(AddstaffComponent,{
      width: '1176px',
height: '620px',
    })
    //  .afterClosed().subscribe({
    //  next:(val)=>{
    //   if(val){
    //     this.getfunction();
    //   }
    //  }
    // })
  }
  updatestaff(a:any){
    this.dialog.open(UpdatestaffComponent,{
      width: '1176px',
      height: '620px',
data:a
    })

  }


  getstaff(){
    return this.data.getstaff().subscribe((result:any)=>{
      this.getstafflist=result.liststaff;
      this.totalstaff=result.total;



    })
  }
  servebill(){
    this.router.navigate(['service_bill'])
  }
  probill(){
    this.router.navigate(['product_bill'])
  }
  exportToExcel3(getstafflist: any[], fileName: string): void {
    const filteredData = getstafflist.map((item, index) => ({
      'S.No': index + 1,
      'Employee ID': item.employee_id,
      'Staff Name': `${item.name} ${item.initial}`,
      'Date Of Joining': this.formatDate(item.date_of_joining),
      // 'Date': this.formatDate(item.createdAt),
      'Designation':item.designation,
      'Gender':item.gender,
      'Phone No': item.phone,
      'Address':item.address,
      'Email-ID': item.email,
      'Blood Group': item.blood_group,
      'Emergency Contact':item.emergency_contact,
      'profile picture':item.profile_pic,
     'ID Proof': item.ID_proof,
     'ID Proof No':item.ID_proof_no

    }));
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
  exportTotal(){
    this.exportToExcel3( this.getstafflist, 'Total staff data');
  }
  malestaff(){
    return this.data.malestaff().subscribe((result:any)=>{
      this.malestaffcount=result.total;
      this.malestaffdetails=result.staff;

    })
  }
  exportToExcel2(malestaffdetails: any[], fileName: string): void {
    const filteredData = malestaffdetails.map((item, index) => ({
      'S.No': index + 1,
      'Employee ID': item.employee_id,
      'Staff Name': `${item.name} ${item.initial}`,
      'Date Of Joining': this.formatDate(item.date_of_joining),
      // 'Date': this.formatDate(item.createdAt),
      'Designation':item.designation,
      'Gender':item.gender,
      'Phone No': item.phone,
      'Address':item.address,
      'Email-ID': item.email,
      'Blood Group': item.blood_group,
      'Emergency Contact':item.emergency_contact,
      'profile picture':item.profile_pic,
     'ID Proof': item.ID_proof,
     'ID Proof No':item.ID_proof_no
    }));
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
  exportmale(){
    this.exportToExcel2( this.malestaffdetails, 'Male staff data');
  }
  formatDate(date: string): string {
    const formattedDate = new Date(date);
    const day = formattedDate.getDate().toString().padStart(2, '0');
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
    const year = formattedDate.getFullYear();
    return `${day}-${month}-${year}`;
  }
  female(){
    return this.data.femalestaff().subscribe((result:any)=>{
      this.femalestaff=result.total;
      this.femalestaffdetails=result.staff;

    })
  }
  exportToExcel1(femalestaffdetails: any[], fileName: string): void {
    const filteredData = femalestaffdetails.map((item, index) => ({
      'S.No': index + 1,
      'Employee ID': item.employee_id,
      'Staff Name': `${item.name} ${item.initial}`,
      'Date Of Joining': this.formatDate(item.date_of_joining),
      // 'Date': this.formatDate(item.createdAt),
      'Designation':item.designation,
      'Gender':item.gender,
      'Phone No': item.phone,
      'Address':item.address,
      'Email-ID': item.email,
      'Blood Group': item.blood_group,
      'Emergency Contact':item.emergency_contact,
      'profile picture':item.profile_pic,
     'ID Proof': item.ID_proof,
     'ID Proof No':item.ID_proof_no
    }));
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
  exportfemale(){
    this.exportToExcel1( this.femalestaffdetails, 'Female staff data');
  }
  deletestaff(list:any){
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


    const staffData = {
      employee_id: list.employee_id,
      name: list.name,
      phone: list.phone,
      designation:list.designation,

    };

    const idData = {
      _id:list._id
    };




    const url = idData._id


    this.data.deletestaff(url, staffData).subscribe(
      (result) => {
        Swal.fire({
          title: "Deleted",
          text: "Staff has been deleted",
          icon: "success"
        })
        // alert("Staff data deleted successfully")
        // this.router.navigate(['staff'])
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
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;


  // get filteredPeople() {
  //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  //   const endIndex = startIndex + this.itemsPerPage;

  //   const filtered = this.searchTerm
  //     ? this.getstafflist.filter((staff: any) =>
  //         (staff.name + ' ' + staff.initial).toLowerCase().includes(this.searchTerm.toLowerCase()) ||
  //         staff.designation.toLowerCase().startsWith(this.searchTerm.toLowerCase()) ||
  //         staff.phone.startsWith(this.searchTerm) ||
  //         staff.employee_id.toLowerCase().startsWith(this.searchTerm)
  //       ).slice(startIndex, endIndex)
  //     : this.getstafflist.slice(startIndex, endIndex);

  //   return filtered;
  // }
  get filteredPeople() {


    const filtered = this.searchTerm.trim()
      ? this.getstafflist.filter((staff: any) =>


          (staff.name + ' ' + staff.initial).toLowerCase().includes(this.searchTerm.toLowerCase().trim()) ||
          staff.designation.toLowerCase().startsWith(this.searchTerm.toLowerCase().trim()) ||
          staff.phone.startsWith(this.searchTerm.trim()) ||
          staff.employee_id.toLowerCase().startsWith(this.searchTerm.trim())
        )
      : this.getstafflist;


    return filtered;
  }
  calculateIndex(index: number): number {
    return (this.currentPage - 1) * this.itemsPerPage + index + 1;
  }
  onFilterChange(): void {
    // Reset to the first page when the filter changes
    this.currentPage = 1;
  }


  get totalPages(): number {
    return Math.ceil(
      (this.searchTerm
        ? this.getstafflist.filter((service: Service) =>
          service.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        ).length
        : this.getstafflist.length) / this.itemsPerPage
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
}
