import { Component, OnInit,Input, ElementRef } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataService } from '../data.service';
import { EditprofileComponent } from '../editprofile/editprofile.component';
import { AddproComponent } from '../addpro/addpro.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UpdateproComponent } from '../updatepro/updatepro.component';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

interface Product {
  Product_id: string;
  Product_name: string;
  Product_price: number;
  Product_category: string;
  Product_quantity:string;
  // Add other properties if needed
}
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  getpro: any;

  helper=new JwtHelperService();

  token: any;
  profilerole: any;
  profile: any;
  userRole: any;
  constructor(private data:DataService,private dialog:MatDialog,private router:Router,
    private auth:AuthService,private elementRef:ElementRef) { }
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
    this. getproductlist()
    this.filteredPeople1()
  }
  getproductlist(){
    return this.data.getproductlist().subscribe((result:any)=>{
      this.getpro=result.listserv;


    })
   }
   @Input() sideNavOpen: boolean = false;



   toggleSideNav() {
     this.sideNavOpen = !this.sideNavOpen;
   }
   searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;

  get filteredPeople1() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    const filtered = this.searchTerm.trim()
      ? this.getpro.filter((product: Product) =>
      product.Product_name.toLowerCase().startsWith(this.searchTerm.toLowerCase().trim()) ||
      product.Product_category.toLowerCase().startsWith(this.searchTerm.toLowerCase().trim()) ||
      product.Product_id.toLowerCase().startsWith(this.searchTerm.toLowerCase().trim()) ||
      product.Product_price.toString().startsWith(this.searchTerm.toLowerCase().trim()) ||
      product.Product_quantity.toString().startsWith(this.searchTerm.toLowerCase().trim())
        ): this.getpro
      //   .slice(startIndex, endIndex)
      // : this.getpro.slice(startIndex, endIndex);

    // console.log('Filtered Data:', filtered); // Log the filtered data here
    return filtered;
  }


  onFilterChange(): void {
    // Reset to the first page when the filter changes
    this.currentPage = 1;
  }
  get totalPages(): number {
    return Math.ceil(
      (this.searchTerm
        ? this.getpro.filter((product: Product) =>
        product.Product_name.toLowerCase().includes(this.searchTerm.toLowerCase())
        ).length
        : this.getpro.length) / this.itemsPerPage
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

  calculateIndex(index: number): number {
    return (this.currentPage - 1) * this.itemsPerPage + index + 1;
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
  addproduct(){
    this.dialog.open(AddproComponent,{
      width:'792px',
      height:'531px',

    })
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
  proupdate(serve:any){


    this.dialog.open(UpdateproComponent,{
      width:'792px',
      height:'531px',
      data:serve
    })
    // .afterClosed().subscribe(value=>{
    //   if(value==="Update"){
    //     this.getservicelist();

    //   }
    // })
  }
  deletepro(item:any){
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
      Product_id: item.Product_id,
      Product_name: item.Product_name,
      Product_price: item.Product_price,
      Product_category:item.Product_category
    };

    const idData = {
      _id:item._id
    };




    const url = idData._id


    this.data.deletepro(url, serviceData).subscribe(
      (result) => {

        Swal.fire({
          title: "Deleted",
          text: "Product has been deleted",
          icon: "success"
        })
        // alert("Product deleted successfully")
        // this.router.navigate(['table'])
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
