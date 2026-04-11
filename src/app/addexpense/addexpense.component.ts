import { Component, OnInit,Inject } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-addexpense',
  templateUrl: './addexpense.component.html',
  styleUrls: ['./addexpense.component.css']
})
export class AddexpenseComponent implements OnInit {
  getpro: any;
  select: any;

  selectedProduct: any;
  selectedProductCategory: any;
  selectedproname: any;
  catprod: any;
  getcat: any;
  item: any;
  selectedcategory: any;
  productid: any;
  prodquantity: any;
  expense: any;
  productname: any;
  productcat: any;
  baseid: any;
  constructor(private datas:DataService,private router:Router,private http:HttpClient,@Inject(MAT_DIALOG_DATA) public edit:any,
  private dialog:MatDialogRef<AddexpenseComponent>) { }

  ngOnInit(): void {
    this. totalproduct()
    // this.onProductSelected()
    this. getproductlist()
  }
  getproductlist(){
    return this.datas.getproductlist().subscribe((result:any)=>{
      // const uniqueProductNames = [...new Set(result.listserv.map((product: any) => product.Product_name))];
      // this.getpro = uniqueProductNames.map(productName => result.listserv.find((product: any) => product.Product_name === productName));
      // console.log(this.getpro);

    })
   }
   totalproduct(){
    return this.datas.totalprosalon().subscribe((result:any)=>{
      const uniqueProductNames = [...new Set(result.listproduct.map((product: any) => product.Product_name))];
      this.getpro = uniqueProductNames.map(productName =>result.listproduct.find((product: any) => product.Product_name === productName));
      // this.getpro=result.listproduct;
      // console.log(this.totalprodetail);

    })
   }

   selectcat(data:any){

this.baseid=data._id

    this.productid=data.Product_id;


    this.productname=data.Product_name;
this.productcat=data.Product_category;


   }
   quantity(num:any){
    this.prodquantity=num.target.value;

       }
   addinvent(){
    this.productid=this.productid?this.productid:"";
    this.productname= this.productname? this.productname:"";
    this.productcat=this.productcat?this.productcat:"";
    this.prodquantity=this.prodquantity?this.prodquantity:"";
    console.log(this.prodquantity);

    if(this.productid!="" && this.selectedproname != "" && this.selectedProductCategory!=""
      && this.prodquantity != "" ){
    var detail={
      id:this.productid,
      name: this.productname,
      category:this.productcat,
      quantity:this.prodquantity,
      type:'Salon'
    }
    var id={
      _id:this.baseid
    }
console.log(detail);

this.datas.addexpense(detail,id._id).subscribe((result:any)=>{
  this.expense=result;

})

this.dialog.close()
Swal.fire({
  title: 'Success',
  text: 'Expense added Successfully',
  icon: 'success',
  confirmButtonText: 'OK'
})
  //   alert("Customer added successfully")
  // this.router.navigate(['customer'])
  .then(()=>{
    window.location.reload();
  })

   }
   else{
    Swal.fire({
      title: 'Warning',
      text: 'Please fill mandatory fields',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
    // alert("please fill all the fields")
   }
  }
  cancelUpdate() {
    this.dialog.close();
  }

onProductSelected(data: any) {
  if (this.selectedProduct) {
    this.selectedproname=this.selectedProduct.Product_name;
    this.selectedProductCategory = this.selectedProduct.Product_category;
    const url =this.selectedproname;

    this.datas.getprodcat(url).subscribe(
      (result:any) => {
        this.catprod = result;
        this.getcat=this.catprod.details;
        const retailProducts = this.getcat.filter((product:any) => product.Product_type === "Salon");
        this.getcat= retailProducts;
        let productid: string[] = this.getcat.map((item: any) => item.Product_id);

        this.selectedcategory ="";

        this.selectcat(this.selectedcategory);




      })

  }
}



}
